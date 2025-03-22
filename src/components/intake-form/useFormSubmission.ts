
import { useState } from "react";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmitToSupabase } from "@/hooks/useFormSubmitToSupabase";

export function useFormSubmission() {
  const { toast } = useToast();
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<FormSchema | null>(null);
  const { submitToSupabase, isSubmitting } = useFormSubmitToSupabase();

  const handleSubmit = async (values: FormSchema) => {
    console.log("Form submission started with values:", values);
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log("Submission already in progress, ignoring duplicate request");
      return;
    }
    
    try {
      // Submit to Supabase
      const success = await submitToSupabase(values);
      
      if (success) {
        // Store submitted data for the completion dialog
        setSubmittedFormData(values);
        setShowCompletionDialog(true);

        toast({
          title: "Form submitted",
          description: "Your intake form has been submitted successfully.",
        });
      }
    } catch (error: any) {
      console.error('Error in form submission handler:', error);
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
