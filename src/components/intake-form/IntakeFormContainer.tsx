
import React, { useState, useEffect } from "react";
import { FormSchema, formSchema } from "@/schemas/intakeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IntakeFormContent } from "@/components/intake-form/IntakeFormContent";
import { IntakeFormHeader } from "@/components/intake-form/IntakeFormHeader";
import { useFormPrefill } from "@/hooks/useFormPrefill";
import { useReportGeneration } from "@/hooks/useReportGeneration";
import { ReportSubmissionTab } from "@/components/report/ReportSubmissionTab";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createExtendedClient } from "@/types/supabase";

export function IntakeFormContainer() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showSubmissionTab, setShowSubmissionTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const { toast } = useToast();
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

  // Parse URL params on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const ref = queryParams.get('ref');
    
    if (ref) {
      setReferenceNumber(ref);
      loadFormDataByReference(ref);
    }
  }, []);

  // Load pre-filled form data from Supabase
  const loadFormDataByReference = async (reference: string) => {
    setIsLoading(true);
    try {
      // Use fetch API directly to get the submission by reference number
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_submissions?reference_number=eq.${reference}&select=id,status,claimant_email`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch submission');
      
      const submissions = await response.json();
      if (submissions.length === 0) throw new Error('Submission not found');
      
      const submission = submissions[0];
      
      // Then get the prefilled form data
      const formDataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_data?submission_id=eq.${submission.id}&version=eq.prefilled&select=form_data`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!formDataResponse.ok) throw new Error('Failed to fetch form data');
      
      const formDataResults = await formDataResponse.json();
      if (formDataResults.length === 0) throw new Error('Form data not found');
      
      const data = formDataResults[0];
      
      if (data?.form_data) {
        // Reset form with the loaded data
        form.reset(data.form_data);
        
        toast({
          title: "Form Loaded",
          description: `Questionnaire loaded with reference: ${reference}`,
        });
      }
    } catch (error) {
      console.error("Error loading form data:", error);
      toast({
        title: "Error",
        description: "Could not load the questionnaire. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading questionnaire data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {referenceNumber && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <h2 className="font-semibold text-blue-700">Reference Number: {referenceNumber}</h2>
          <p className="text-sm text-blue-600">Please keep this reference number for your records</p>
        </div>
      )}
      
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
        referenceNumber={referenceNumber}
      />
    </div>
  );
}
