
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useReportSubmission(onComplete: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (
    signature: string,
    formData: any,
    claimantUrl: string,
    fullUrl: string
  ) => {
    if (!signature.trim()) {
      toast({
        title: "Signature Required",
        description: "Please sign the form to confirm submission.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Current date and time for signature timestamp
      const signatureDate = new Date().toISOString();

      // Generate a reference number if not already available
      const referenceNumber = formData.medcoReference || `MED-${Date.now().toString().slice(-6)}`;
      
      // Fetch PDFs as blobs and convert to base64
      const claimantResponse = await fetch(claimantUrl);
      const claimantBlob = await claimantResponse.blob();
      const claimantBase64 = await blobToBase64(claimantBlob);
      
      const fullResponse = await fetch(fullUrl);
      const fullBlob = await fullResponse.blob();
      const fullBase64 = await blobToBase64(fullBlob);
      
      // Email the claimant copy to the patient
      if (formData.emailId) {
        const claimantEmailResult = await supabase.functions.invoke("send-report", {
          body: {
            to: formData.emailId,
            pdfBase64: claimantBase64,
            patientName: formData.fullName,
            referenceNumber: referenceNumber,
            isClaimantCopy: true,
            signature: signature,
            signatureDate: signatureDate
          },
        });
        
        if (claimantEmailResult.error) throw new Error(claimantEmailResult.error.message);
      }
      
      // Email the full medical report to medical expert (using the instructor's email if available)
      const expertEmail = formData.instructingPartyEmail || "medical@example.com";
      const expertEmailResult = await supabase.functions.invoke("send-report", {
        body: {
          to: expertEmail,
          pdfBase64: fullBase64,
          patientName: formData.fullName,
          referenceNumber: referenceNumber,
          isClaimantCopy: false,
          signature: signature,
          signatureDate: signatureDate
        },
      });
      
      if (expertEmailResult.error) throw new Error(expertEmailResult.error.message);
      
      toast({
        title: "Report Submitted Successfully!",
        description: "Your report has been sent. A copy has been emailed to you.",
      });
      
      // Trigger completion callback
      onComplete();
      
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit };
}

// Helper function to convert blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // Remove the data URL prefix to get only the base64 content
      resolve(base64data.substring(base64data.indexOf(",") + 1));
    };
    reader.onerror = reject;
  });
};
