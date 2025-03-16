
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PDFReport from './pdf/PDFReport';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { useReportEmailSubmission } from '@/hooks/useReportEmailSubmission';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { convertFormDataToReportData } from '@/utils/pdfReportUtils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { createExtendedClient } from '@/types/supabase';

interface ReportSubmissionTabProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormSchema;
  referenceNumber: string | null;
}

export const ReportSubmissionTab = ({ isOpen, onClose, formData, referenceNumber }: ReportSubmissionTabProps) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Convert form data to report data structure for claimant report (without prognosis)
  const claimantReportData = convertFormDataToReportData(formData);
  
  // Add metadata
  if (claimantReportData.meta) {
    claimantReportData.meta.reportType = "claimant";
    claimantReportData.meta.referenceNumber = referenceNumber || undefined;
  } else {
    claimantReportData.meta = {
      reportType: "claimant",
      referenceNumber: referenceNumber || undefined
    };
  }
  
  // Create expert report data (with prognosis)
  const expertReportData = JSON.parse(JSON.stringify(claimantReportData));
  if (expertReportData.meta) {
    expertReportData.meta.reportType = "expert";
  } else {
    expertReportData.meta = {
      reportType: "expert"
    };
  }
  
  const handleSubmitReport = async () => {
    if (!referenceNumber) {
      toast({
        title: "Missing Reference",
        description: "Cannot submit without a reference number.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Find the submission record using fetch API
      const submissionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_submissions?reference_number=eq.${referenceNumber}&select=id`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!submissionResponse.ok) {
        throw new Error('Failed to fetch submission');
      }
      
      const submissions = await submissionResponse.json();
      if (submissions.length === 0) {
        throw new Error('Submission not found');
      }
      
      const submissionId = submissions[0].id;
      
      // Store the completed form data
      const dataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_data`,
        {
          method: 'POST',
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            submission_id: submissionId,
            form_data: formData,
            version: 'completed'
          })
        }
      );
      
      if (!dataResponse.ok) {
        throw new Error('Failed to store completed form data');
      }
      
      // Update submission status
      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_submissions?id=eq.${submissionId}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'completed',
            completed_date: new Date().toISOString()
          })
        }
      );
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update submission status');
      }
      
      // Send both reports via edge function
      const { error: sendError } = await supabase.functions.invoke('send-completed-reports', {
        body: {
          reference_number: referenceNumber,
          claimant_report_data: claimantReportData,
          expert_report_data: expertReportData
        }
      });
      
      if (sendError) throw sendError;
      
      setIsSuccess(true);
      toast({
        title: "Report Submitted",
        description: "Your medical report has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setConfirmDialogOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Report Submission</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Report Submitted Successfully</h3>
            <p className="text-gray-600 mb-6">
              Your medical report has been submitted to the medical expert. Thank you for completing the questionnaire.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <div className="rounded-md border p-4">
              <h2 className="text-lg font-semibold mb-2">Preview Your Report</h2>
              <p className="text-sm text-gray-500 mb-4">
                Review your report before submission. This is exactly how the medical expert will see it.
              </p>
              <PDFReport 
                reportData={claimantReportData} 
                isOpen={true} 
                onClose={() => {}} 
                isPreview={true} 
              />
            </div>

            <div className="rounded-md border p-4">
              <h2 className="text-lg font-semibold mb-2">Submit Your Report</h2>
              <p className="text-sm text-gray-500 mb-4">
                Once submitted, your report will be sent to the medical expert for review.
                {referenceNumber && <span className="block mt-1">Reference Number: {referenceNumber}</span>}
              </p>
              
              <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Submit Report</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Submission</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to submit this report? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
                    <Button 
                      onClick={handleSubmitReport}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : "Confirm"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
