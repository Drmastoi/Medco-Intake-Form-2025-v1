
import { useState } from "react";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useFormSubmission() {
  const { toast } = useToast();
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<FormSchema | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormSchema) => {
    console.log("Form submission started with values:", values);
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log("Submission already in progress, ignoring duplicate request");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a properly formatted object for Supabase insertion
      // Only include fields that exist in the database table
      const formSubmission = {
        // Store identifiable information to track submissions without requiring login
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
        children_count: values.childrenCount ? parseInt(values.childrenCount) : null,
        
        // Accident information
        accident_date: values.accidentDate,
        accident_time: values.accidentTime,
        vehicle_position: values.vehiclePosition,
        
        // Injuries information
        neck_pain: values.neckPain,
        additional_info: values.additionalInfo,
        
        // Shoulder pain
        shoulder_pain: values.shoulderPain,
        shoulder_side: values.shoulderSide,
        shoulder_pain_start: values.shoulderPainStart,
        shoulder_pain_initial_severity: values.shoulderPainInitialSeverity,
        shoulder_pain_current_severity: values.shoulderPainCurrentSeverity,
        shoulder_pain_resolve_days: values.shoulderPainResolveDays ? parseInt(values.shoulderPainResolveDays) : null,
        
        // Back pain
        back_pain: values.backPain,
        back_location: values.backLocation,
        back_pain_start: values.backPainStart,
        back_pain_initial_severity: values.backPainInitialSeverity,
        back_pain_current_severity: values.backPainCurrentSeverity,
        back_pain_resolve_days: values.backPainResolveDays ? parseInt(values.backPainResolveDays) : null,
        
        // Headache
        headache: values.headache,
        headache_start: values.headacheStart,
        headache_initial_severity: values.headacheInitialSeverity,
        headache_current_severity: values.headacheCurrentSeverity,
        headache_resolve_days: values.headacheResolveDays ? parseInt(values.headacheResolveDays) : null,
        headache_past_history: values.headachePastHistory,
        
        // Adding missing fields for travel anxiety, treatment, and medical history
        // We'll store these as JSON in the comments field since they aren't in the schema
        travel_anxiety_data: JSON.stringify({
          travel_anxiety: values.travelAnxiety,
          travel_anxiety_symptoms: values.travelAnxietySymptoms || [],
          other_travel_anxiety_symptom: values.otherTravelAnxietySymptom,
          currently_driving: values.currentlyDriving,
          anxiety_initial_severity: values.anxietyInitialSeverity,
          anxiety_current_severity: values.anxietyCurrentSeverity,
          anxiety_resolve_days: values.anxietyResolveDays,
          anxiety_past_history: values.anxietyPastHistory,
          anxiety_duration: values.anxietyDuration
        }),
      };

      console.log("Submitting data to Supabase:", formSubmission);

      // Check Supabase connection before submission
      const connectionStatus = await supabase.from('form_submissions').select('id').limit(1);
      console.log("Connection status:", connectionStatus);
      
      if (connectionStatus.error) {
        throw new Error(`Supabase connection error: ${connectionStatus.error.message}`);
      }

      // Directly store the form data in Supabase
      const { data, error } = await supabase
        .from('form_submissions')
        .insert([formSubmission])
        .select();

      if (error) {
        console.error("Supabase insertion error:", error);
        throw error;
      }

      console.log("Form submitted successfully, response data:", data);

      // Store submitted data for the completion dialog
      setSubmittedFormData(values);
      setShowCompletionDialog(true);

      toast({
        title: "Form submitted",
        description: "Your intake form has been submitted successfully.",
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Provide more detailed error message
      let errorMessage = "Failed to submit the form. Please try again.";
      if (error.message) {
        errorMessage += ` Error: ${error.message}`;
      }
      if (error.code) {
        errorMessage += ` (Code: ${error.code})`;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    handleSubmit,
    showCompletionDialog,
    setShowCompletionDialog,
    submittedFormData,
    isSubmitting
  };
}
