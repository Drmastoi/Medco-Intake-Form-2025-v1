
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
        toast.error(errorMsg, {
          description: pdfError instanceof Error ? pdfError.message : "Unknown error",
        });
        return false;
      }
      
      console.log(`PDF generated successfully, size: ${freshPdfBase64.length} characters`);
      
      if (freshPdfBase64.length > 5000000) { // Reduced from 10MB to 5MB to be safer
        const errorMsg = "PDF is too large to send via email";
        console.warn(errorMsg, { size: freshPdfBase64.length });
        setLastError(errorMsg);
        toast.error(errorMsg, {
          description: "Please try reducing the size of the report",
        });
        return false;
      }
      
      // Prepare email data
      const emailData = {
        pdf_base64: freshPdfBase64,
        recipient_email: recipientEmail,
        recipient_name: recipientName || "Client",
        client_name: reportData.personal?.fullName || "Unknown Client",
        date_of_accident: reportData.accident?.accidentDate || "Unknown Date"
      };
      
      console.log("Calling send-report edge function");
      
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
          toast.error("Failed to send report", {
            description: `Error from server: ${error.message || "Unknown error"}`,
          });
          return false;
        }
        
        if (data?.error) {
          console.error("Application error from edge function:", data.error);
          let errorMessage = typeof data.error === 'object' 
            ? JSON.stringify(data.error) 
            : String(data.error);
          setLastError(errorMessage || "Error in email sending process");
          toast.error("Failed to send report", {
            description: `Server reported: ${errorMessage || data.message || "Unknown error"}`,
          });
          return false;
        }
        
        console.log("Email sent successfully:", data);
        
        toast.success("Report sent successfully", {
          description: `Report has been sent to ${recipientEmail}. Please check your inbox (and spam folder).`,
        });
        
        setIsSuccess(true);
        return true;
      } catch (invokeError: any) {
        console.error("Exception invoking edge function:", invokeError);
        setLastError(invokeError.message || "Failed to communicate with server");
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
    lastResponse,
    submitReportViaEmail
  };
};
