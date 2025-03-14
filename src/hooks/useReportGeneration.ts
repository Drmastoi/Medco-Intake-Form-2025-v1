
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { useToast } from "@/components/ui/use-toast";

export function useReportGeneration(form: UseFormReturn<FormSchema>, setCurrentSection: (section: number) => void) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // This hook now just provides validation checking and state management
  // The actual report generation happens in ReportSubmissionTab
  
  return {
    isGenerating
  };
}
