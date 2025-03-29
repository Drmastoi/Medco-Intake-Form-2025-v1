
import { useState } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { generatePdfAsBase64, formatFileName } from '@/utils/pdfGenerator';
import { ReportData } from '@/types/reportTypes';

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
      toast.loading("Generating PDF and sending email...");
      
      // Generate PDF as base64
      const pdfBase64 = await generatePdfAsBase64(reportData);
      
      // Format filename
      const fileName = formatFileName(reportData);
      
      console.log(`Sending email to ${recipientEmail}`);
      
      // Call Supabase Edge Function with simple payload
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: {
          pdfBase64,
          recipientEmail,
          recipientName: "Dr. Awais",
          subject: `Medical Report: ${reportData.personal?.fullName || 'Patient'}`,
          fileName
        }
      });
      
      // Dismiss loading toast
      toast.dismiss();
      
      if (error) {
        console.error("Edge function error:", error);
        setError(error.message);
        toast.error("Failed to send email", {
          description: error.message
        });
        return false;
      }
      
      if (data?.error) {
        console.error("Email sending error:", data.error);
        setError(data.error);
        
        toast.error("Failed to send email", {
          description: data.error
        });
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
