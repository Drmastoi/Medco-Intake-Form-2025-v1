
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { useToast } from "@/components/ui/use-toast";

export function useReportGeneration(form: UseFormReturn<FormSchema>, setCurrentSection: (section: number) => void) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // This hook now just provides validation checking and state management
  // The actual report generation happens in ReportSubmissionTab
  
  const handleGenerateReport = () => {
    // Set generating state for UI feedback
    setIsGenerating(true);
    
    try {
      // Validate form before showing the report submission dialog
      const isValid = form.trigger();
      
      if (!isValid) {
        toast({
          title: "Form validation failed",
          description: "Please complete all required fields before generating the report.",
          variant: "destructive"
        });
        setIsGenerating(false);
        return;
      }
      
      // If we got here, form is valid and we can proceed
      setIsGenerating(false);
      return true;
    } catch (error) {
      console.error("Error in report generation:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your report. Please try again.",
        variant: "destructive"
      });
      setIsGenerating(false);
      return false;
    }
  };
  
  return {
    isGenerating,
    isSubmitting,
    handleGenerateReport
  };
}
