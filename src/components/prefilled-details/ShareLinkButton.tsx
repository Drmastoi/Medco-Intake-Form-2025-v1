
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

interface ShareLinkButtonProps {
  form: any;
}

export function ShareLinkButton({ form }: ShareLinkButtonProps) {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const generateAndShareLink = async () => {
    const formData = form.getValues();
    
    if (!formData.emailId) {
      toast({
        title: "Missing Email",
        description: "Please enter the claimant's email address before sharing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Generate a unique reference number
    const referenceNumber = `MR-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    try {
      // Save the pre-filled data to Supabase using fetch API
      const prefilledData = {
        solicitorName: formData.solicitorName || '',
        solicitorReference: formData.solicitorReference || '',
        instructingPartyName: formData.instructingPartyName || '',
        instructingPartyReference: formData.instructingPartyReference || '',
        examinationLocation: formData.examinationLocation || '',
        medcoReference: formData.medcoReference || '',
        dateOfExamination: formData.dateOfExamination || '',
        dateOfReport: formData.dateOfReport || '',
        timeSpentWithClaimant: formData.timeSpentWithClaimant || '15',
        accompaniedBy: formData.accompaniedBy || '',
        expertName: "Dr. Sam Smith", // Default expert name
        expertSpecialty: "General Practice", // Default specialty
        expertTitle: "Consultant", // Default title
        gmcNumber: "1234567", // Default GMC number
      };
      
      // First, create a submission record using fetch
      const submissionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_submissions`,
        {
          method: 'POST',
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            reference_number: referenceNumber,
            expert_email: 'drawais@gmail.com', // Hardcoded expert email
            claimant_email: formData.emailId,
            claimant_name: formData.fullName || 'Claimant',
            status: 'sent_to_claimant'
          })
        }
      );
      
      if (!submissionResponse.ok) {
        throw new Error('Failed to create submission record');
      }
      
      const submissionData = await submissionResponse.json();
      const submissionId = submissionData[0]?.id;
      
      if (!submissionId) {
        throw new Error('Failed to get submission ID');
      }
      
      // Then, store the form data
      const dataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_data`,
        {
          method: 'POST',
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            submission_id: submissionId,
            form_data: form.getValues(),
            version: 'prefilled'
          })
        }
      );
      
      if (!dataResponse.ok) {
        throw new Error('Failed to store form data');
      }
      
      // Create a query string with minimal data for the URL
      const queryParams = new URLSearchParams();
      queryParams.append('ref', referenceNumber);
      
      const shareableLink = `${window.location.origin}?${queryParams.toString()}`;
      
      // Send the email via edge function
      const { error: emailError } = await supabase.functions.invoke('send-claimant-invitation', {
        body: {
          to_email: formData.emailId,
          to_name: formData.fullName || "Valued Client",
          reference_number: referenceNumber,
          link: shareableLink,
        },
      });
      
      if (emailError) throw emailError;

      toast({
        title: "Invitation Sent",
        description: `Questionnaire invitation sent to ${formData.emailId} with reference number ${referenceNumber}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send the invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button
      onClick={generateAndShareLink}
      variant="outline"
      className="flex items-center gap-2"
      disabled={isSending}
    >
      <Share className="w-4 h-4" />
      {isSending ? "Sending..." : "Share with Claimant"}
    </Button>
  );
}
