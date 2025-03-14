
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { Eye, FileSignature, Send } from "lucide-react";
import { SignatureField } from "@/components/SignatureField";
import { Label } from "@/components/ui/label";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";
import { RatingDialog } from "@/components/RatingDialog";
import PDFReport from "@/components/report/pdf/PDFReport";
import { useReportSubmission } from "@/hooks/useReportSubmission";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { pdf } from '@react-pdf/renderer';
import PDFDocumentContent from "./pdf/components/PDFDocumentContent";

interface ReportSubmissionTabProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormSchema;
}

export function ReportSubmissionTab({ 
  isOpen, 
  onClose,
  formData 
}: ReportSubmissionTabProps) {
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [signature, setSignature] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [submissionDate, setSubmissionDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showThankYou, setShowThankYou] = useState(false);
  const [rating, setRating] = useState(0);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { toast } = useToast();
  
  const reportData = convertFormDataToReportData(formData);
  
  // Use the report submission hook
  const { isSubmitting, handleSubmit } = useReportSubmission(() => {
    onClose();
    setShowThankYou(true);
  });

  const handlePreviewReport = () => {
    setIsPdfLoading(true);
    setShowPdfPreview(true);
  };
  
  const handleClosePreview = () => {
    setShowPdfPreview(false);
    setIsPdfLoading(false);
  };
  
  // Generate PDF and convert to base64
  const generatePdfAsBase64 = async () => {
    try {
      // Create PDF document
      const pdfDoc = <PDFDocumentContent reportData={reportData} />;
      const blob = await pdf(pdfDoc).toBlob();
      
      // Convert blob to base64
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          // Extract the base64 data part from the data URL
          const base64Data = base64String.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };
  
  const handleSubmitReport = async () => {
    if (!signature) {
      toast({
        title: "Signature Required",
        description: "Please sign the form before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    if (!hasAcceptedTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSendingEmail(true);
    
    try {
      // Generate PDF and convert to base64
      const pdfBase64 = await generatePdfAsBase64();
      
      // Send PDF via email using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: {
          to: "drawais@gmail.com", // Expert's email
          pdfBase64,
          patientName: formData.fullName || "Not specified",
          referenceNumber: formData.medcoReference || `REF-${Date.now()}`,
          isClaimantCopy: false,
          signature: signature,
          signatureDate: submissionDate
        },
      });
      
      if (error) throw error;
      
      // Also send a copy to the claimant if email is available
      if (formData.emailId) {
        await supabase.functions.invoke('send-report', {
          body: {
            to: formData.emailId,
            pdfBase64,
            patientName: formData.fullName || "Not specified",
            referenceNumber: formData.medcoReference || `REF-${Date.now()}`,
            isClaimantCopy: true,
            signature: signature,
            signatureDate: submissionDate
          },
        });
      }
      
      // Call handleSubmit to save to database
      const claimantPdfUrl = `data:application/pdf;base64,${pdfBase64}`;
      const fullPdfUrl = claimantPdfUrl; // Same PDF for this implementation
      
      handleSubmit(signature, formData, claimantPdfUrl, fullPdfUrl);
      
      toast({
        title: "Report Sent Successfully",
        description: "Your medical report has been sent to the expert and saved.",
      });
    } catch (error) {
      console.error("Email sending error:", error);
      toast({
        title: "Error",
        description: "Failed to send the report. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSendingEmail(false);
    }
  };
  
  const handleRatingSubmit = () => {
    console.log("User rating:", rating);
    setShowThankYou(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle>Report Submission</DialogTitle>
          <DialogDescription>
            Review and submit your medical report
          </DialogDescription>
          
          <div className="space-y-6 py-2">
            {/* Preview Report Option */}
            <div>
              <Button 
                onClick={handlePreviewReport}
                variant="outline"
                className="w-full"
                disabled={isPdfLoading}
              >
                <Eye className="mr-2 h-4 w-4" />
                {isPdfLoading ? "Loading Preview..." : "Preview Report"}
              </Button>
            </div>
            
            {/* Disclaimer Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Disclaimer</h3>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={hasAcceptedTerms}
                  onCheckedChange={(checked) => setHasAcceptedTerms(checked === true)}
                  className="mt-1"
                />
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-gray-600"
                >
                  I agree that I have mentioned all injuries and effects for the purpose of this report. 
                  I understand that this report will be submitted to a medical expert for review.
                </Label>
              </div>
            </div>
            
            {/* Signature Field */}
            <SignatureField value={signature} onChange={setSignature} />
            
            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="submissionDate">Date</Label>
              <input
                type="date"
                id="submissionDate"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            {/* Submit Button */}
            <Button 
              onClick={handleSubmitReport}
              disabled={!hasAcceptedTerms || isSubmitting || isSendingEmail}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSendingEmail ? "Sending Report..." : "Submit Report to Medical Expert"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* PDF Preview Dialog - Only render when needed */}
      {showPdfPreview && (
        <PDFReport 
          reportData={reportData}
          isOpen={showPdfPreview}
          onClose={handleClosePreview}
          isPreview={true}
        />
      )}
      
      {/* Thank you and Rating Dialog */}
      <RatingDialog
        open={showThankYou}
        onOpenChange={setShowThankYou}
        rating={rating}
        setRating={setRating}
        onSubmit={handleRatingSubmit}
      />
    </>
  );
}
