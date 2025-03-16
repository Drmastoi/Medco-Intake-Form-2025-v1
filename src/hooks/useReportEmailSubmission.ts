
import { useState } from 'react';
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import { generatePdfAsBase64 } from '@/utils/pdfGenerationUtils';
import { ReportData } from '@/types/reportTypes';
import { supabase } from '@/integrations/supabase/client';

export const useReportEmailSubmission = (reportData: ReportData) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      
      // Regenerate PDF with latest data
      const { data: freshPdfBase64 } = await regeneratePdf();
      
      if (!freshPdfBase64) {
        throw new Error("Failed to generate PDF");
      }
      
      // Prepare email data
      const emailData = {
        pdf_base64: freshPdfBase64,
        recipient_email: recipientEmail,
        recipient_name: recipientName || "Client",
        client_name: reportData.personal?.fullName || "Unknown Client",
        date_of_accident: reportData.accident?.accidentDate || "Unknown Date"
      };
      
      // Call Supabase Edge Function
      const { error } = await supabase.functions.invoke('send-report', {
        body: emailData,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Report sent successfully", {
        description: `Report has been emailed to ${recipientEmail}`,
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error sending report:", error);
      toast.error("Failed to send report", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    isSuccess,
    submitReportViaEmail
  };
};
