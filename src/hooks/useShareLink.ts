
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useShareLink() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const generateAndSendLink = async (
    formData: any,
    emailSubject: string,
    senderName: string
  ) => {
    if (!formData.emailId) {
      toast({
        title: "Missing Email",
        description: "Please enter the claimant's email address before sharing.",
        variant: "destructive",
      });
      return { success: false };
    }
    
    setIsSending(true);
    
    try {
      const preFillData = {
        solicitorName: formData.solicitorName || '',
        solicitorReference: formData.solicitorReference || '',
        instructingPartyName: formData.instructingPartyName || '',
        instructingPartyReference: formData.instructingPartyReference || '',
        examinationLocation: formData.examinationLocation || '',
        medcoReference: formData.medcoReference || '',
        dateOfExamination: formData.dateOfExamination || '',
        dateOfReport: formData.dateOfReport || '',
        emailId: formData.emailId || '',
        timeSpentWithClaimant: formData.timeSpentWithClaimant || '15',
        accompaniedBy: formData.accompaniedBy || '',
        mobileNumber: formData.mobileNumber || '',
      };
      
      const queryParams = new URLSearchParams();
      Object.entries(preFillData).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value.toString());
        }
      });
      
      const shareableLink = `${window.location.origin}?${queryParams.toString()}`;
      
      console.log("Shareable link generated:", shareableLink);
      console.log("Email will be sent to:", formData.emailId);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-claimant-link', {
        body: {
          recipientEmail: formData.emailId,
          recipientName: formData.fullName || "Valued Client",
          shareableLink: shareableLink,
          senderName: senderName || formData.solicitorName || "Medical Assessment Team",
          medcoReference: formData.medcoReference,
          mobileNumber: formData.mobileNumber || "Not provided"
        }
      });
      
      if (error) throw error;
      
      console.log('Email response:', data);

      // Save the link to the database for tracking
      try {
        await supabase
          .from('questionnaire_tracking')
          .insert({
            questionnaire_link: shareableLink,
            recipient_email: formData.emailId,
            recipient_name: formData.fullName || null,
            sent_date: new Date().toISOString(),
            completed: false
          });
      } catch (dbError) {
        console.error('Failed to save link to tracking database:', dbError);
        // Continue with success toast even if tracking fails
      }

      toast({
        title: "Link Shared",
        description: "The questionnaire link has been sent to the provided email address.",
      });
      
      return { success: true };
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Error",
        description: "Failed to send the email. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsSending(false);
    }
  };

  return {
    isSending,
    generateAndSendLink
  };
}
