
import React, { useState, useEffect } from "react";
import { FormSchema, formSchema } from "@/schemas/intakeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IntakeFormNavigation } from "@/components/intake-form/IntakeFormNavigation";
import { IntakeFormSections } from "@/components/intake-form/IntakeFormSections";
import { useFormSubmission } from "@/components/intake-form/useFormSubmission";
import { IntakeFormGuidance } from "@/components/intake-form/IntakeFormGuidance";
import { IntakeFormNavButtons } from "@/components/intake-form/IntakeFormNavButtons";

export function IntakeFormContainer() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 14;

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
    "Past Medical History",
    "Summary Report"
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

  const { handleSubmit } = useFormSubmission();

  const handleTabChange = (value: string) => {
    setCurrentSection(parseInt(value));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.toString()) {
      console.log("Found URL parameters for prefilling:", params.toString());
      
      const preFillData: Record<string, any> = {};
      
      params.forEach((value, key) => {
        if (value) {
          preFillData[key] = value;
          console.log(`Setting parameter ${key} to ${value}`);
        }
      });
      
      if (preFillData.dateOfExamination) {
        try {
          const date = new Date(preFillData.dateOfExamination);
          preFillData.dateOfExamination = date.toISOString().split('T')[0];
        } catch (e) {
          console.error("Error parsing dateOfExamination:", e);
        }
      }
      
      if (preFillData.dateOfReport) {
        try {
          const date = new Date(preFillData.dateOfReport);
          preFillData.dateOfReport = date.toISOString().split('T')[0];
        } catch (e) {
          console.error("Error parsing dateOfReport:", e);
        }
      }
      
      if (Object.keys(preFillData).length > 0) {
        const currentValues = form.getValues();
        const mergedValues = {...currentValues, ...preFillData};
        form.reset(mergedValues);
        
        console.log("Form reset with prefilled data:", mergedValues);
      }
    }
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">Personal Injury Assessment Questionnaire</h1>

      <IntakeFormGuidance currentSection={currentSection} />
      
      <IntakeFormNavigation 
        currentSection={currentSection}
        onTabChange={handleTabChange}
        tabNames={tabNames}
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <IntakeFormSections 
              currentSection={currentSection} 
              form={form} 
            />
          </div>
          
          <IntakeFormNavButtons 
            currentSection={currentSection}
            totalSections={totalSections}
            setCurrentSection={setCurrentSection}
          />
        </form>
      </Form>
    </div>
  );
}
