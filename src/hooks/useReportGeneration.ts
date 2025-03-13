
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { useToast } from "@/components/ui/use-toast";

export function useReportGeneration(form: UseFormReturn<FormSchema>, setCurrentSection: (section: number) => void) {
  const [showPdfReport, setShowPdfReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = () => {
    try {
      setIsGenerating(true);
      // Check if we have the minimum required fields
      const values = form.getValues();
      if (!values.fullName) {
        toast({
          title: "Missing Information",
          description: "Please fill in at least the personal information section before generating a report.",
          variant: "destructive",
        });
        setCurrentSection(1); // Navigate to personal info section
        return;
      }

      console.log("PDF generation has been reset.");
      
      toast({
        title: "PDF Generation Reset",
        description: "PDF generation functionality has been removed. Please wait for new instructions.",
      });
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "The PDF generation functionality has been reset.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    showPdfReport,
    setShowPdfReport,
    isGenerating,
    handleGenerateReport
  };
}
