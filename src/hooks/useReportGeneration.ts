
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";
import { useToast } from "@/components/ui/use-toast";

export function useReportGeneration(form: UseFormReturn<FormSchema>, setCurrentSection: (section: number) => void) {
  const [showPdfReport, setShowPdfReport] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = () => {
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

    // Show the PDF report
    setShowPdfReport(true);
  };

  return {
    showPdfReport,
    setShowPdfReport,
    handleGenerateReport
  };
}
