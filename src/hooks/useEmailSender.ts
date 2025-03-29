
import { useState } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

interface EmailSendingOptions {
  pdfBase64: string;
  recipientEmail: string;
  recipientName?: string;
  subject?: string;
  fileName?: string;
}

export function useEmailSender() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendEmail = async (options: EmailSendingOptions) => {
    if (!options.pdfBase64) {
      toast.error("Missing PDF data");
      return false;
    }
    
    if (!options.recipientEmail) {
      toast.error("Missing recipient email");
      return false;
    }
    
    setIsSending(true);
    setIsSuccess(false);
    setError(null);
    
    try {
      // Show loading toast
      toast.loading("Sending email...");
      
      console.log(`Sending email to ${options.recipientEmail}`);
      
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: JSON.stringify({
          pdfBase64: options.pdfBase64,
          recipientEmail: options.recipientEmail,
          recipientName: options.recipientName || "Recipient",
          subject: options.subject || "Medical Report",
          fileName: options.fileName || "medical_report.pdf"
        }),
        headers: {
          'Content-Type': 'application/json'
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
        
        // Handle domain verification error gracefully
        if (data.code === "DOMAIN_NOT_VERIFIED") {
          toast.success("Email sent from default Resend address", {
            description: "Using onboarding@resend.dev as sender"
          });
          setIsSuccess(true);
          return true;
        }
        
        toast.error("Failed to send email", {
          description: data.error
        });
        return false;
      }
      
      console.log("Email sent successfully");
      setIsSuccess(true);
      
      toast.success("Email sent successfully", {
        description: `Email has been sent to ${options.recipientEmail}`
      });
      
      return true;
    } catch (error: any) {
      console.error("Unhandled error sending email:", error);
      setError(error.message || "Unknown error");
      
      toast.error("Failed to send email", {
        description: "An unexpected error occurred"
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
