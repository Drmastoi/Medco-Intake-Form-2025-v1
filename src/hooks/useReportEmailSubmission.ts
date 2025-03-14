
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { generatePdfAsBase64 } from "@/utils/pdfGenerationUtils";

export function useReportEmailSubmission() {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { toast } = useToast();

  const sendReportEmail = async (
    signature: string,
    formData: FormSchema,
    submissionDate: string,
    handleSubmitToDb: (signature: string, formData: FormSchema, claimantPdfUrl: string, fullPdfUrl: string) => void,
    pdfBase64?: string
  ) => {
    if (!signature) {
      toast({
        title: "Signature Required",
        description: "Please sign the form before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSendingEmail(true);
    
    try {
      // Generate PDF and convert to base64 if not provided
      const pdfData = pdfBase64 || await generatePdfAsBase64(formData);
      
      // Send PDF via email using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: {
          to: "drawais@gmail.com", // Expert's email
          pdfBase64: pdfData,
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
            pdfBase64: pdfData,
            patientName: formData.fullName || "Not specified",
            referenceNumber: formData.medcoReference || `REF-${Date.now()}`,
            isClaimantCopy: true,
            signature: signature,
            signatureDate: submissionDate
          },
        });
      }
      
      // Call handleSubmit to save to database
      const claimantPdfUrl = `data:application/pdf;base64,${pdfData}`;
      const fullPdfUrl = claimantPdfUrl; // Same PDF for this implementation
      
      handleSubmitToDb(signature, formData, claimantPdfUrl, fullPdfUrl);
      
      toast({
        title: "Report Sent Successfully",
        description: "Your medical report has been sent to the expert and saved.",
      });

      return true;
    } catch (error) {
      console.error("Email sending error:", error);
      toast({
        title: "Error",
        description: "Failed to send the report. Please try again later.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  return { isSendingEmail, sendReportEmail };
}
