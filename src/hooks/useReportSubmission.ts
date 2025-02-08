
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useReportSubmission = (onSubmit: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(async (
    signature: string,
    formData: any,
    pdfUrl: string,
    fullReportUrl: string
  ) => {
    if (!signature.trim()) {
      toast({
        title: "Signature Required",
        description: "Please enter your name as a signature to confirm the report.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert PDFs to blobs
      const [pdfResponse, fullPdfResponse] = await Promise.all([
        fetch(pdfUrl),
        fetch(fullReportUrl)
      ]);
      const [pdfBlob, fullPdfBlob] = await Promise.all([
        pdfResponse.blob(),
        fullPdfResponse.blob()
      ]);

      // Convert blobs to base64
      const [pdfBase64, fullPdfBase64] = await Promise.all([
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
          reader.readAsDataURL(pdfBlob);
        }),
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
          reader.readAsDataURL(fullPdfBlob);
        })
      ]);

      // Generate reference number
      const referenceNumber = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create report record without checking for authentication
      const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .insert({
          original_filename: `MEDCO_Report_${formData.fullName || 'Anonymous'}_${referenceNumber}.pdf`,
          storage_path: `anonymous/${referenceNumber}`,
          status: 'pending_review',
          signature_status: 'signed',
          claimant_email: formData.email
        })
        .select()
        .single();

      if (reportError) {
        console.error('Report creation error:', reportError);
        throw new Error('Failed to create report');
      }

      // Add signature record without checking for authentication
      const { error: signatureError } = await supabase
        .from('claimant_signatures')
        .insert({
          report_id: reportData.id,
          claimant_name: signature,
          confirmed: true
        });

      if (signatureError) {
        console.error('Signature creation error:', signatureError);
        throw new Error('Failed to save signature');
      }

      // Send emails with PDFs
      const { error: emailError } = await supabase.functions.invoke('send-report', {
        body: {
          to: formData.email,
          pdfBase64: pdfBase64,
          patientName: formData.fullName || 'Anonymous',
          referenceNumber,
          isClaimantCopy: true
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        throw new Error('Failed to send email to claimant');
      }

      // Send full report to doctor
      const { error: doctorEmailError } = await supabase.functions.invoke('send-report', {
        body: {
          to: 'drawais@gmail.com',
          pdfBase64: fullPdfBase64,
          patientName: formData.fullName || 'Anonymous',
          referenceNumber,
          isClaimantCopy: false
        }
      });

      if (doctorEmailError) {
        console.error('Doctor email error:', doctorEmailError);
        throw new Error('Failed to send email to doctor');
      }

      toast({
        title: "Report Submitted Successfully",
        description: "Your report has been submitted and sent to the specified email addresses.",
      });

      onSubmit();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [toast, onSubmit]);

  return {
    isSubmitting,
    handleSubmit,
  };
};
