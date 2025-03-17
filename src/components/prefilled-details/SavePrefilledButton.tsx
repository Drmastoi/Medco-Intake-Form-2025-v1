
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SavePrefilledButtonProps {
  form: any;
}

export function SavePrefilledButton({ form }: SavePrefilledButtonProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const savePrefilledDetails = async () => {
    const formData = form.getValues();
    
    if (!formData.solicitorName || !formData.emailId) {
      toast({
        title: "Missing Information",
        description: "Please enter at least the solicitor name and claimant's email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Create a JSON object with all the prefilled data
      const prefilledData = {
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
      
      // Save to local storage for backup
      localStorage.setItem('prefilledData', JSON.stringify(prefilledData));
      
      // If connected to Supabase, save to database
      try {
        const { error } = await supabase
          .from('prefilled_details')
          .upsert({
            email_id: formData.emailId,
            data: prefilledData,
          }, { onConflict: 'email_id' });
          
        if (error) throw error;
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue with toast success since we have local storage backup
      }
      
      toast({
        title: "Details Saved",
        description: "The prefilled details have been saved successfully.",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save the details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={savePrefilledDetails}
      variant="outline"
      className="flex items-center gap-2 mr-2"
      disabled={isSaving}
    >
      <Save className="w-4 h-4" />
      {isSaving ? "Saving..." : "Save Details"}
    </Button>
  );
}
