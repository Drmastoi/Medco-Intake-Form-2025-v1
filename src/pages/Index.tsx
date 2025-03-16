
import React, { useState } from "react";
import { IntakeFormContainer } from "@/components/intake-form/IntakeFormContainer";
import { Button } from "@/components/ui/button";
import { Eye, FileSignature } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PDFReport from "@/components/report/pdf/PDFReport";
import { useForm } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";
import { SamplePDFGenerator } from "@/components/SamplePDFGenerator";

export default function Index() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportType, setReportType] = useState<"claimant" | "expert">("expert");
  const { toast } = useToast();
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      // Add other default values if needed
    }
  });

  const handlePreviewReport = (type: "claimant" | "expert") => {
    setReportType(type);
    
    // Check if form is filled enough to generate a preview
    if (!form.getValues().fullName) {
      toast({
        title: "Incomplete form",
        description: "Please fill in at least the personal details section before previewing",
        variant: "destructive",
      });
      return;
    }
    
    setIsReportOpen(true);
  };

  const handleCloseReport = () => {
    setIsReportOpen(false);
  };

  // Create report data from form values for preview
  const reportData = convertFormDataToReportData(form.getValues());
  if (reportData?.meta) {
    reportData.meta.reportType = reportType;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Medical Legal Report Questionnaire</h1>
      
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <Button 
          variant="outline" 
          onClick={() => handlePreviewReport("expert")}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          Preview Expert Report
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => handlePreviewReport("claimant")}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          Preview Claimant Report
        </Button>
        
        <Button 
          onClick={() => {/* Handle final submission */}}
          className="flex items-center gap-2"
        >
          <FileSignature size={16} />
          Submit Report
        </Button>
      </div>
      
      <IntakeFormContainer form={form} />
      
      {reportData && (
        <PDFReport
          reportData={reportData}
          isOpen={isReportOpen}
          onClose={handleCloseReport}
          isPreview={true}
        />
      )}
      
      <div className="mt-8">
        <SamplePDFGenerator />
      </div>
    </div>
  );
}
