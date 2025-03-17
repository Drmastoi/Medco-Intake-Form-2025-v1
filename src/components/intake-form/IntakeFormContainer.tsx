
import React, { useState } from "react";
import { FormSchema, formSchema } from "@/schemas/intakeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IntakeFormContent } from "@/components/intake-form/IntakeFormContent";
import { IntakeFormHeader } from "@/components/intake-form/IntakeFormHeader";
import { useFormPrefill } from "@/hooks/useFormPrefill";
import { useReportGeneration } from "@/hooks/useReportGeneration";
import { ReportSubmissionTab } from "@/components/report/ReportSubmissionTab";
import { useFormSubmission } from "@/components/intake-form/useFormSubmission";
import { CompletionDialog } from "@/components/report/components/CompletionDialog";

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
      
      // Accident information default values - all unchecked
      accidentDate: "",
      accidentTime: undefined, // Set to undefined instead of empty string
      vehiclePosition: "", // Empty string
      vehicleStatus: undefined, // Set to undefined instead of empty string
      vehicleLocation: undefined, // Set to undefined instead of empty string
      impactLocation: undefined, // Set to undefined instead of empty string
      vehicleDamage: undefined, // Set to undefined instead of empty string
      claimantPosition: undefined, // Set to undefined instead of empty string
      claimantVehicle: undefined, // Set to undefined instead of empty string
      otherVehicle: undefined, // Set to undefined instead of empty string
      accidentSummary: "",
      
      // Section 3 - Medical Information
      neckPain: "2", // Default to No (unchecked)
      neckPainStart: undefined, // Set to undefined instead of empty string
      neckPainInitialSeverity: undefined, // Set to undefined instead of empty string
      neckPainCurrentSeverity: undefined, // Set to undefined instead of empty string
      neckPainResolveDays: "",
      additionalInfo: "",
      hadPriorNeckPain: "2", // Default to No
      accidentNeckPainPercentage: "",
      priorNeckPainPercentage: "",
      
      // Section 4 - Shoulder Pain Information
      shoulderPain: "2", // Default to No (unchecked)
      shoulderSide: undefined, // Set to undefined instead of empty string
      shoulderPainStart: undefined, // Set to undefined instead of empty string
      shoulderPainInitialSeverity: undefined, // Set to undefined instead of empty string
      shoulderPainCurrentSeverity: undefined, // Set to undefined instead of empty string
      shoulderPainResolveDays: "",

      // Section 5 - Back Pain Information
      backPain: "2", // Default to No (unchecked)
      backLocation: undefined, // Set to undefined instead of empty string
      backPainStart: undefined, // Set to undefined instead of empty string
      backPainInitialSeverity: undefined, // Set to undefined instead of empty string
      backPainCurrentSeverity: undefined, // Set to undefined instead of empty string
      backPainResolveDays: "",

      // Section 6 - Headache Information
      headache: "2", // Default to No (unchecked)
      headacheStart: undefined, // Set to undefined instead of empty string
      headacheInitialSeverity: undefined, // Set to undefined instead of empty string
      headacheCurrentSeverity: undefined, // Set to undefined instead of empty string
      headacheResolveDays: "",
      headachePastHistory: "",
      
      // Travel anxiety fields
      travelAnxiety: "2", // Default to No (unchecked)
      travelAnxietySymptoms: [],
      otherTravelAnxietySymptom: "",
      currentlyDriving: undefined, // Set to undefined instead of empty string
      anxietyInitialSeverity: undefined, // Set to undefined instead of empty string
      anxietyCurrentSeverity: undefined, // Set to undefined instead of empty string
      anxietyResolveDays: "",
      anxietyPastHistory: "",
      anxietyDuration: "",
      hasAnxietyHistory: undefined, // Set to undefined instead of empty string
      
      // Previous Medical History fields
      exceptionalInjuries: "2", // Default to No (unchecked)
      exceptionalInjuriesDetails: "",
    },
  });

  // Use custom hooks for form prefilling and report generation
  useFormPrefill(form);
  const { isGenerating } = useReportGeneration(form, setCurrentSection);
  const { 
    handleSubmit, 
    showCompletionDialog, 
    setShowCompletionDialog,
    submittedFormData
  } = useFormSubmission();

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setCurrentSection(parseInt(value));
  };

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
        onSubmit={handleSubmit}
      />

      {/* Report Submission Tab */}
      <ReportSubmissionTab 
        isOpen={showSubmissionTab} 
        onClose={() => setShowSubmissionTab(false)}
        formData={form.getValues()}
      />

      {/* Completion Dialog */}
      {submittedFormData && (
        <CompletionDialog
          isOpen={showCompletionDialog}
          onClose={() => setShowCompletionDialog(false)}
          claimantName={submittedFormData.fullName || "Claimant"}
          claimantEmail={submittedFormData.emailId}
        />
      )}
    </div>
  );
}
