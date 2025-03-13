
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { useToast } from "@/components/ui/use-toast";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";

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

      console.log("Generating report with form data:", values);
      
      // Convert form data to report data format
      const reportData = convertFormDataToReportData(values);
      console.log("Converted report data:", reportData);
      
      // Show the PDF report
      setShowPdfReport(true);
      
      toast({
        title: "Report Generated",
        description: "Your medical report has been generated successfully.",
      });
      
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error Generating Report",
        description: "There was a problem generating your report. Please try again.",
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
