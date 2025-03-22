
import { useState } from 'react';
import { FormSchema } from "@/schemas/intakeFormSchema";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { checkSupabaseConnection } from "@/utils/supabaseUtils";
import { prepareFormData } from "@/utils/formDataUtils";

export function useFormSubmitToSupabase() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitToSupabase = async (values: FormSchema): Promise<boolean> => {
    console.log("Form submission to Supabase started with values:", values);
    setIsSubmitting(true);
    
    try {
      // Check the Supabase connection
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        throw new Error("Unable to connect to the database after multiple attempts");
      }
      
      // Format data for submission
      const formSubmission = prepareFormData(values);
      console.log("Submitting data to Supabase:", formSubmission);

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
      return true;
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
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    submitToSupabase,
    isSubmitting
  };
}
