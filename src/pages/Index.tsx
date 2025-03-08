
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PreFilledDetails } from "@/components/PreFilledDetails";
import { IntakeFormSection2 } from "@/components/IntakeFormSection2";
import { IntakeFormSection3 } from "@/components/IntakeFormSection3";
import { IntakeFormSection4 } from "@/components/IntakeFormSection4";
import { IntakeFormSection5 } from "@/components/IntakeFormSection5";
import { IntakeFormSection6 } from "@/components/IntakeFormSection6";
import { IntakeFormSection7 } from "@/components/IntakeFormSection7";
import { IntakeFormSection8 } from "@/components/IntakeFormSection8";
import { IntakeFormSection9 } from "@/components/IntakeFormSection9";
import { IntakeFormSection10 } from "@/components/IntakeFormSection10";
import { IntakeFormSection11 } from "@/components/IntakeFormSection11";
import { IntakeFormSection12 } from "@/components/IntakeFormSection12";
import { IntakeFormSummary } from "@/components/IntakeFormSummary";
import { IntakeFormNavigation } from "@/components/intake-form/IntakeFormNavigation";
import { formSchema, type FormSchema } from "@/schemas/intakeFormSchema";
import { useFormSubmission } from "@/components/intake-form/useFormSubmission";
import { PrefilledDetailsSection } from "@/components/PrefilledDetailsSection";

export default function Index() {
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
      
      // Existing default values
      fullName: "",
      dateOfBirth: "",
      idType: "1",
      address: "",
      occupation: "",
      workType: "1",
      livingWith: "1",
      childrenCount: "0",
      accidentDate: "",
      accidentTime: "1",
      vehiclePosition: "1",
      neckPain: "1",
      additionalInfo: "",
      shoulderPain: "1",
      shoulderSide: "1",
      shoulderPainStart: "1",
      shoulderPainInitialSeverity: "1",
      shoulderPainCurrentSeverity: "1",
      shoulderPainResolveDays: "",
      backPain: "1",
      backLocation: "1",
      backPainStart: "1",
      backPainInitialSeverity: "1",
      backPainCurrentSeverity: "1",
      backPainResolveDays: "",
      headache: "1",
      headacheStart: "1",
      headacheInitialSeverity: "1",
      headacheCurrentSeverity: "1",
      headacheResolveDays: "",
      headachePastHistory: "",
      
      // New travel anxiety fields
      travelAnxiety: "1",
      travelAnxietySymptoms: [],
      otherTravelAnxietySymptom: "",
      currentlyDriving: "1",
      moreCautious: "1",
      checkingMirrors: "1",
      preventedDriving: "1",
      anxietyInitialSeverity: "1",
      anxietyCurrentSeverity: "1",
      anxietyResolveDays: "",
      anxietyPastHistory: "",
      anxietyDuration: "",
    },
  });

  const { handleSubmit } = useFormSubmission();

  // Add the missing handleTabChange function
  const handleTabChange = (value: string) => {
    setCurrentSection(parseInt(value));
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preFillData = {
      solicitorName: params.get('solicitorName') || '',
      solicitorReference: params.get('solicitorReference') || '',
      instructingPartyName: params.get('instructingPartyName') || '',
      instructingPartyReference: params.get('instructingPartyReference') || '',
      examinationLocation: params.get('examinationLocation') || '',
      dateOfExamination: params.get('dateOfExamination') || new Date().toISOString().split('T')[0],
      dateOfReport: params.get('dateOfReport') || new Date().toISOString().split('T')[0],
      medcoReference: params.get('medcoReference') || '',
      emailId: params.get('emailId') || '',
    };
    
    if (Object.values(preFillData).some(value => value)) {
      form.reset(preFillData);
    }
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">Personal Injury Assessment Questionnaire</h1>

      {currentSection === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
          <h2 className="text-base font-semibold text-blue-900 mb-2">Expert Workflow Guide</h2>
          <p className="text-blue-800">
            Fill in the prefilled details section and share with the claimant. The claimant will complete the rest of the form and then generate a summary report.
          </p>
        </div>
      )}
      
      {currentSection === 1 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
          <h2 className="text-base font-semibold text-blue-900 mb-2">Claimant Guide</h2>
          <p className="text-blue-800">
            Complete all sections to report your injuries and circumstances. Click summary to generate report and send it to medical expert and download a copy for your records.
          </p>
        </div>
      )}
      
      <IntakeFormNavigation 
        currentSection={currentSection}
        onTabChange={handleTabChange}
        tabNames={tabNames}
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            {currentSection === 0 && <PrefilledDetailsSection form={form} />}
            {currentSection === 1 && <PreFilledDetails form={form} />}
            {currentSection === 2 && <IntakeFormSection2 form={form} />}
            {currentSection === 3 && <IntakeFormSection3 form={form} />}
            {currentSection === 4 && <IntakeFormSection4 form={form} />}
            {currentSection === 5 && <IntakeFormSection5 form={form} />}
            {currentSection === 6 && <IntakeFormSection6 form={form} />}
            {currentSection === 7 && <IntakeFormSection7 form={form} />}
            {currentSection === 8 && <IntakeFormSection8 form={form} />}
            {currentSection === 9 && <IntakeFormSection9 form={form} />}
            {currentSection === 10 && <IntakeFormSection10 form={form} />}
            {currentSection === 11 && <IntakeFormSection11 form={form} />}
            {currentSection === 12 && <IntakeFormSection12 form={form} />}
            {currentSection === 13 && <IntakeFormSummary form={form} />}
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
            >
              Previous
            </Button>
            
            {currentSection < totalSections - 1 && (
              <Button 
                type="button"
                onClick={() => setCurrentSection(prev => Math.min(totalSections - 1, prev + 1))}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
