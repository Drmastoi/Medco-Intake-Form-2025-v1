
import React, { useState } from "react";
import { FormSchema, formSchema } from "@/schemas/intakeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IntakeFormContent } from "@/components/intake-form/IntakeFormContent";
import { IntakeFormHeader } from "@/components/intake-form/IntakeFormHeader";
import { useFormPrefill } from "@/hooks/useFormPrefill";
import { useReportGeneration } from "@/hooks/useReportGeneration";
import PDFReport from "@/components/report/pdf/PDFReport";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";

export function IntakeFormContainer() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 13; // Kept the same as we're only removing from PDF, not intake form

  const tabNames = [
    "Prefilled Details",
    "Personal Info",
    "Accident Details",
    "Neck Pain",
    "Shoulder Pain",
    "Back Pain",
    "Headache",
    "Travel Anxiety",
    "Bruising",
    "Other Injuries",
    "Treatment",
    "Impact on Lifestyle",
    "Past Medical History"
  ];
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Pre-filled fields
      solicitorName: "",
      solicitorReference: "",
      instructingPartyName: "",
      instructingPartyReference: "",
      examinationLocation: "",
      medcoReference: "",
      accompaniedBy: "",
      mobileNumber: "",
      emailId: "",
      dateOfExamination: new Date().toISOString().split('T')[0],
      dateOfReport: new Date().toISOString().split('T')[0],
      timeSpentWithClaimant: "15",
      
      // Personal information default values
      fullName: "",
      dateOfBirth: "",
      gender: "male", // Default gender value
      idType: "1", // Default to driving license
      address: "",
      occupation: "",
      workType: "1",
      livingWith: "1",
      childrenCount: "0",
      
      // Accident information default values
      accidentDate: "",
      accidentTime: "1", // Default to Morning
      vehiclePosition: "1", // Default to first option
      
      // Section 3 - Medical Information
      neckPain: "2", // Default to No (unchecked)
      neckPainStart: "1", // Default to Same day
      neckPainInitialSeverity: "1", // Default to Mild
      neckPainCurrentSeverity: "1", // Default to Mild
      neckPainResolveDays: "",
      additionalInfo: "",
      hadPriorNeckPain: "2", // Default to No
      accidentNeckPainPercentage: "",
      priorNeckPainPercentage: "",
      
      // Section 4 - Shoulder Pain Information
      shoulderPain: "2", // Changed to unchecked
      shoulderSide: "1",
      shoulderPainStart: "1",
      shoulderPainInitialSeverity: "1",
      shoulderPainCurrentSeverity: "1",
      shoulderPainResolveDays: "",

      // Section 5 - Back Pain Information
      backPain: "2", // Changed to unchecked
      backLocation: "1",
      backPainStart: "1",
      backPainInitialSeverity: "1",
      backPainCurrentSeverity: "1",
      backPainResolveDays: "",

      // Section 6 - Headache Information
      headache: "2", // Changed to unchecked
      headacheStart: "1",
      headacheInitialSeverity: "1",
      headacheCurrentSeverity: "1",
      headacheResolveDays: "",
      headachePastHistory: "",
      
      // Travel anxiety fields
      travelAnxiety: "2", // Changed to unchecked
      travelAnxietySymptoms: [],
      otherTravelAnxietySymptom: "",
      currentlyDriving: "1",
      anxietyInitialSeverity: "1",
      anxietyCurrentSeverity: "1",
      anxietyResolveDays: "",
      anxietyPastHistory: "",
      anxietyDuration: "",
      hasAnxietyHistory: "no",
      
      // Previous Medical History fields
      exceptionalInjuries: "2", // Default to No (unchecked)
      exceptionalInjuriesDetails: "",
    },
  });

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setCurrentSection(parseInt(value));
  };

  // Use custom hooks for form prefilling and report generation
  useFormPrefill(form);
  const { 
    showPdfReport, 
    setShowPdfReport, 
    showPdfPreview, 
    setShowPdfPreview, 
    isGenerating, 
    handleGenerateReport,
    handlePreviewReport 
  } = useReportGeneration(form, setCurrentSection);

  return (
    <div className="container mx-auto py-10 px-4">
      <IntakeFormHeader 
        currentSection={currentSection}
        onTabChange={handleTabChange}
        tabNames={tabNames}
        onGenerateReport={handleGenerateReport}
        onPreviewReport={handlePreviewReport}
      />
      
      <IntakeFormContent 
        form={form}
        currentSection={currentSection}
        totalSections={totalSections}
        setCurrentSection={setCurrentSection}
      />

      {/* PDF Report Dialog */}
      <PDFReport 
        reportData={convertFormDataToReportData(form.getValues())} 
        isOpen={showPdfReport} 
        onClose={() => setShowPdfReport(false)}
        isPreview={false}
      />

      {/* PDF Preview Dialog */}
      <PDFReport 
        reportData={convertFormDataToReportData(form.getValues())} 
        isOpen={showPdfPreview} 
        onClose={() => setShowPdfPreview(false)}
        isPreview={true}
      />
    </div>
  );
}
