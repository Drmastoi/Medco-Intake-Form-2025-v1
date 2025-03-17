
import { useState } from "react";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useFormSubmission() {
  const { toast } = useToast();
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<FormSchema | null>(null);

  const handleSubmit = async (values: FormSchema) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit the form",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('form_submissions')
        .insert([
          {
            user_id: userData.user.id,
            solicitor_name: values.solicitorName,
            solicitor_reference: values.solicitorReference,
            instructing_party_name: values.instructingPartyName,
            instructing_party_reference: values.instructingPartyReference,
            examination_location: values.examinationLocation,
            medco_reference: values.medcoReference,
            accompanied_by: values.accompaniedBy,
            mobile_number: values.mobileNumber,
            email_id: values.emailId,
            full_name: values.fullName,
            date_of_birth: values.dateOfBirth,
            id_type: values.idType,
            address: values.address,
            occupation: values.occupation,
            work_type: values.workType,
            living_with: values.livingWith,
            children_count: parseInt(values.childrenCount),
            accident_date: values.accidentDate,
            accident_time: values.accidentTime,
            vehicle_position: values.vehiclePosition,
            neck_pain: values.neckPain,
            additional_info: values.additionalInfo,
            shoulder_pain: values.shoulderPain,
            shoulder_side: values.shoulderSide,
            shoulder_pain_start: values.shoulderPainStart,
            shoulder_pain_initial_severity: values.shoulderPainInitialSeverity,
            shoulder_pain_current_severity: values.shoulderPainCurrentSeverity,
            shoulder_pain_resolve_days: values.shoulderPainResolveDays ? parseInt(values.shoulderPainResolveDays) : null,
            back_pain: values.backPain,
            back_location: values.backLocation,
            back_pain_start: values.backPainStart,
            back_pain_initial_severity: values.backPainInitialSeverity,
            back_pain_current_severity: values.backPainCurrentSeverity,
            back_pain_resolve_days: values.backPainResolveDays ? parseInt(values.backPainResolveDays) : null,
            headache: values.headache,
            headache_start: values.headacheStart,
            headache_initial_severity: values.headacheInitialSeverity,
            headache_current_severity: values.headacheCurrentSeverity,
            headache_resolve_days: values.headacheResolveDays ? parseInt(values.headacheResolveDays) : null,
            headache_past_history: values.headachePastHistory,
            travel_anxiety: values.travelAnxiety,
            travel_anxiety_symptoms: values.travelAnxietySymptoms,
            other_travel_anxiety_symptom: values.otherTravelAnxietySymptom,
            currently_driving: values.currentlyDriving,
            anxiety_initial_severity: values.anxietyInitialSeverity,
            anxiety_current_severity: values.anxietyCurrentSeverity,
            anxiety_resolve_days: values.anxietyResolveDays ? parseInt(values.anxietyResolveDays) : null,
            anxiety_past_history: values.anxietyPastHistory,
            anxiety_duration: values.anxietyDuration
          }
        ]);

      if (error) throw error;

      // Store submitted data for the completion dialog
      setSubmittedFormData(values);
      setShowCompletionDialog(true);

      toast({
        title: "Form submitted",
        description: "Your intake form has been submitted successfully.",
      });
      
      console.log(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { 
    handleSubmit,
    showCompletionDialog,
    setShowCompletionDialog,
    submittedFormData
  };
}
