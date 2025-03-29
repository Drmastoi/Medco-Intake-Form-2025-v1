
import { useState } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { generatePdfAsBase64 } from '@/utils/pdfGenerationUtils';
import { ReportData } from '@/types/reportTypes';
import { formatFileName } from '@/utils/pdfGenerator';

export function useEmailSender() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendEmail = async (reportData: ReportData, recipientEmail: string = "drawais@gmail.com") => {
    if (!reportData) {
      toast.error("Missing report data");
      return false;
    }
    
    setIsSending(true);
    setIsSuccess(false);
    setError(null);
    
    try {
      // Show loading toast
      const toastId = toast.loading("Generating PDF and sending email...");
      
      // Generate PDF as base64
      let pdfBase64;
      try {
        pdfBase64 = await generatePdfAsBase64(reportData);
        console.log("PDF generated successfully, size:", pdfBase64.length);
      } catch (pdfError) {
        console.error("PDF generation error:", pdfError);
        toast.dismiss(toastId);
        toast.error("Failed to generate PDF", {
          description: pdfError instanceof Error ? pdfError.message : String(pdfError)
        });
        setError(pdfError instanceof Error ? pdfError.message : String(pdfError));
        return false;
      }
      
      // Format filename
      const fileName = formatFileName(reportData);
      
      console.log(`Sending email to ${recipientEmail}`);
      
      // Call Supabase Edge Function with detailed payload
      const { data, error: invokeError } = await supabase.functions.invoke('send-report', {
        body: {
          pdfBase64,
          recipientEmail,
          recipientName: "Dr. Awais",
          subject: `Medical Report: ${reportData.personal?.fullName || 'Patient'}`,
          fileName
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Dismiss loading toast
      toast.dismiss(toastId);
      
      if (invokeError) {
        console.error("Edge function error:", invokeError);
        setError(invokeError.message);
        toast.error("Failed to send email", {
          description: invokeError.message
        });
        return false;
      }
      
      if (data?.error) {
        console.error("Email sending error:", data.error);
        setError(data.error);
        
        if (data.code === "MISSING_API_KEY") {
          toast.error("API key not configured", {
            description: "Please configure the RESEND_API_KEY in Supabase"
          });
        } else if (data.code && data.code.includes("400")) {
          toast.error("Email validation error", {
            description: "There may be an issue with the recipient email or attachment"
          });
        } else {
          toast.error("Failed to send email", {
            description: data.error
          });
        }
        return false;
      }
      
      console.log("Email sent successfully");
      setIsSuccess(true);
      
      toast.success("Email sent successfully", {
        description: `Email has been sent to ${recipientEmail}`
      });
      
      return true;
    } catch (error: any) {
      console.error("Unhandled error sending email:", error);
      setError(error.message || "Unknown error");
      
      toast.error("Failed to send email", {
        description: error.message || "An unexpected error occurred"
      });
      
      return false;
    } finally {
      setIsSending(false);
    }
  };
  
  return {
    sendEmail,
    isSending,
    isSuccess,
    error
  };
}
