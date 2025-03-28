
import { useState } from 'react';
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import { generatePdfAsBase64 } from '@/utils/pdfGenerationUtils';
import { ReportData } from '@/types/reportTypes';
import { supabase } from '@/integrations/supabase/client';

export const useReportEmailSubmission = (reportData: ReportData) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<any>(null);

  // Generate PDF as base64 when needed
  const { data: pdfBase64, refetch: regeneratePdf } = useQuery({
    queryKey: ['pdfBase64', reportData],
    queryFn: async () => {
      try {
        // Deep clone the reportData to avoid any reference issues
        const reportDataClone = JSON.parse(JSON.stringify(reportData));
        
        console.log("Generating PDF with lifestyle data:", 
          JSON.stringify(reportDataClone.other?.lifestyle, null, 2));
        
        return await generatePdfAsBase64(reportDataClone);
      } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
      }
    },
    enabled: false, // Don't run on mount
  });

  const submitReportViaEmail = async (recipientEmail: string, recipientName: string) => {
    try {
      setIsSubmitting(true);
      setLastError(null);
      setErrorCode(null);
      setLastResponse(null);
      
      // Clear any previous success state
      setIsSuccess(false);
      
      console.log(`Initiating email send to ${recipientEmail} (${recipientName})`);
      
      // Regenerate PDF with latest data
      const { data: freshPdfBase64, error: pdfError } = await regeneratePdf();
      
      if (pdfError || !freshPdfBase64) {
        const errorMsg = "Failed to generate PDF";
        console.error(errorMsg, pdfError);
        setLastError(errorMsg);
        setErrorCode("PDF_GENERATION_FAILED");
        toast.error(errorMsg, {
          description: pdfError instanceof Error ? pdfError.message : "Unknown error",
        });
        return false;
      }
      
      console.log(`PDF generated successfully, size: ${freshPdfBase64.length} characters`);
      
      if (freshPdfBase64.length > 4000000) { // Reduced to 4MB to be safer
        const errorMsg = "PDF is too large to send via email";
        console.warn(errorMsg, { size: freshPdfBase64.length });
        setLastError(errorMsg);
        setErrorCode("PDF_TOO_LARGE");
        toast.error(errorMsg, {
          description: "Please try reducing the size of the report",
        });
        return false;
      }
      
      // Prepare email data - ensure all fields are properly defined
      const emailData = {
        pdf_base64: freshPdfBase64,
        recipient_email: recipientEmail || "",
        recipient_name: recipientName || "Client",
        client_name: reportData.personal?.fullName || "Unknown Client",
        date_of_accident: reportData.accident?.accidentDate || "Unknown Date"
      };
      
      console.log("Calling send-report edge function with data:", {
        recipient: emailData.recipient_email,
        name: emailData.recipient_name,
        dataSize: freshPdfBase64.length
      });
      
      try {
        // Call Supabase Edge Function with timeout
        const functionResponse = await supabase.functions.invoke('send-report', {
          body: emailData,
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        console.log("Raw response from edge function:", functionResponse);
        setLastResponse(functionResponse);
        
        const { data, error } = functionResponse;
        
        if (error) {
          console.error("Edge function returned error:", error);
          setLastError(error.message || "Error calling send-report function");
          setErrorCode("EDGE_FUNCTION_ERROR");
          toast.error("Failed to send report", {
            description: `Error from server: ${error.message || "Unknown error"}`,
          });
          return false;
        }
        
        if (data?.error) {
          console.error("Application error from edge function:", data.error);
          let errorMessage = data.message || (typeof data.error === 'object' 
            ? JSON.stringify(data.error) 
            : String(data.error));
            
          setLastError(errorMessage || "Error in email sending process");
          setErrorCode(data.code || "EMAIL_SEND_ERROR");
          
          // Special handling for domain verification errors
          if (data.code === "DOMAIN_NOT_VERIFIED" || 
              (typeof data.error === 'string' && data.error.includes("domain"))) {
            toast.error("Email domain verification error", {
              description: "Using the default Resend domain (onboarding@resend.dev).",
            });
          } else if (data.code === "INVALID_API_KEY" || 
                    (typeof data.error === 'string' && data.error.includes("API key"))) {
            toast.error("API key error", {
              description: "The Resend API key may be invalid or expired",
            });
          } else {
            toast.error("Failed to send report", {
              description: `Server reported: ${errorMessage || "Unknown error"}`,
            });
          }
          return false;
        }
        
        console.log("Email sent successfully:", data);
        
        toast.success("Report sent successfully", {
          description: `Report has been sent to ${recipientEmail}. Please check inbox (and spam folder).`,
        });
        
        setIsSuccess(true);
        return true;
      } catch (invokeError: any) {
        console.error("Exception invoking edge function:", invokeError);
        setLastError(invokeError.message || "Failed to communicate with server");
        setErrorCode("INVOKE_ERROR");
        setLastResponse({ 
          invokeError: invokeError.toString(), 
          stack: invokeError.stack,
          request: {
            to: recipientEmail,
            attachmentSize: freshPdfBase64.length
          }
        });
        toast.error("Failed to send report", {
          description: `Connection error: ${invokeError.message}. Please try again later.`,
        });
        return false;
      }
    } catch (error: any) {
      console.error("Unhandled exception in submitReportViaEmail:", error);
      setLastError(error.message || "Unknown error");
      setErrorCode("UNHANDLED_ERROR");
      setLastResponse({ error: error.toString(), stack: error.stack });
      toast.error("Failed to send report", {
        description: error.message || "Please try again or contact support",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    isSuccess,
    lastError,
    errorCode,
    lastResponse,
    submitReportViaEmail
  };
};
