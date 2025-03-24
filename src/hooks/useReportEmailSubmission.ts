
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
      
      if (freshPdfBase64.length > 10000000) {
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
      
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: emailData,
      });
      
      console.log("Response from edge function:", data);
      
      if (error) {
        console.error("Edge function error:", error);
        setLastError(error.message || "Error calling send-report function");
        toast.error("Failed to send report", {
          description: `Error from server: ${error.message}`,
        });
        return false;
      }
      
      if (data?.error) {
        console.error("Application error from edge function:", data.error);
        setLastError(data.error.message || "Error in email sending process");
        toast.error("Failed to send report", {
          description: `Server reported: ${data.error.message || data.message || "Unknown error"}`,
        });
        return false;
      }
      
      console.log("Email sent successfully:", data);
      
      toast.success("Report sent successfully", {
        description: `Report has been emailed to ${recipientEmail}`,
      });
      
      setIsSuccess(true);
      return true;
    } catch (error: any) {
      console.error("Exception in submitReportViaEmail:", error);
      setLastError(error.message || "Unknown error");
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
    submitReportViaEmail
  };
};
