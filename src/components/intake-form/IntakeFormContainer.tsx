
import React, { useState } from "react";
import { FormSchema, formSchema } from "@/schemas/intakeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IntakeFormContent } from "@/components/intake-form/IntakeFormContent";
import { IntakeFormHeader } from "@/components/intake-form/IntakeFormHeader";
import { useFormPrefill } from "@/hooks/useFormPrefill";
import { useReportGeneration } from "@/hooks/useReportGeneration";
import { ReportSubmissionTab } from "@/components/report/ReportSubmissionTab";

export function IntakeFormContainer() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showSubmissionTab, setShowSubmissionTab] = useState(false);
  const totalSections = 13;

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
      
      // Personal information default values - now all unchecked
      fullName: "",
      dateOfBirth: "",
      gender: "", // Empty string instead of "male"
      idType: "", // Empty string instead of default "1"
      address: "",
      occupation: "",
      workType: "", // Empty string instead of default "1"
      livingWith: "", // Empty string instead of default "1"
      childrenCount: "",
      
      // Accident information default values
      accidentDate: "",
      accidentTime: "", // Empty string instead of default "1"
      vehiclePosition: "", // Empty string instead of default "1"
      
      // Section 3 - Medical Information
      neckPain: "2", // Default to No (unchecked)
      neckPainStart: "", // Empty string instead of default "1"
      neckPainInitialSeverity: "", // Empty string instead of default "1"
      neckPainCurrentSeverity: "", // Empty string instead of default "1"
      neckPainResolveDays: "",
      additionalInfo: "",
      hadPriorNeckPain: "2", // Default to No
      accidentNeckPainPercentage: "",
      priorNeckPainPercentage: "",
      
      // Section 4 - Shoulder Pain Information
      shoulderPain: "2", // Default to No (unchecked)
      shoulderSide: "", // Empty string instead of default "1"
      shoulderPainStart: "", // Empty string instead of default "1"
      shoulderPainInitialSeverity: "", // Empty string instead of default "1"
      shoulderPainCurrentSeverity: "", // Empty string instead of default "1"
      shoulderPainResolveDays: "",

      // Section 5 - Back Pain Information
      backPain: "2", // Default to No (unchecked)
      backLocation: "", // Empty string instead of default "1"
      backPainStart: "", // Empty string instead of default "1"
      backPainInitialSeverity: "", // Empty string instead of default "1"
      backPainCurrentSeverity: "", // Empty string instead of default "1"
      backPainResolveDays: "",

      // Section 6 - Headache Information
      headache: "2", // Default to No (unchecked)
      headacheStart: "", // Empty string instead of default "1"
      headacheInitialSeverity: "", // Empty string instead of default "1"
      headacheCurrentSeverity: "", // Empty string instead of default "1"
      headacheResolveDays: "",
      headachePastHistory: "",
      
      // Travel anxiety fields
      travelAnxiety: "2", // Default to No (unchecked)
      travelAnxietySymptoms: [],
      otherTravelAnxietySymptom: "",
      currentlyDriving: "", // Empty string instead of default "1"
      anxietyInitialSeverity: "", // Empty string instead of default "1"
      anxietyCurrentSeverity: "", // Empty string instead of default "1"
      anxietyResolveDays: "",
      anxietyPastHistory: "",
      anxietyDuration: "",
      hasAnxietyHistory: "",
      
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
  const { isGenerating } = useReportGeneration(form, setCurrentSection);

  // Handler for opening submission tab
  const handleOpenSubmissionTab = () => {
    // Basic validation check
    const values = form.getValues();
    if (!values.fullName) {
      form.setError("fullName", {
        type: "manual",
        message: "Please fill in your full name before submitting",
      });
      setCurrentSection(1); // Navigate to personal info section
      return;
    }
    
    setShowSubmissionTab(true);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <IntakeFormHeader 
        currentSection={currentSection}
        onTabChange={handleTabChange}
        tabNames={tabNames}
        onGenerateReport={handleOpenSubmissionTab}
      />
      
      <IntakeFormContent 
        form={form}
        currentSection={currentSection}
        totalSections={totalSections}
        setCurrentSection={setCurrentSection}
      />

      {/* Report Submission Tab */}
      <ReportSubmissionTab 
        isOpen={showSubmissionTab} 
        onClose={() => setShowSubmissionTab(false)}
        formData={form.getValues()}
      />
    </div>
  );
}
