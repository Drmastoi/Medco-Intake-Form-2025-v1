
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as Tabs from "@radix-ui/react-tabs";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  // Pre-filled fields (sender details)
  solicitorName: z.string(),
  solicitorReference: z.string(),
  instructingPartyName: z.string(),
  instructingPartyReference: z.string(),
  examinationLocation: z.string(),
  medcoReference: z.string(),
  accompaniedBy: z.string(),
  mobileNumber: z.string(),
  emailId: z.string().email(),
  
  // Existing fields
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string(),
  idType: z.enum(["1", "2", "3"]),
  address: z.string(),
  occupation: z.string(),
  workType: z.enum(["1", "2"]),
  livingWith: z.enum(["1", "2", "3", "4", "5", "6"]),
  childrenCount: z.string(),
  
  // Section 2 - Accident Information
  accidentDate: z.string(),
  accidentTime: z.enum(["1", "2", "3", "4"]),
  vehiclePosition: z.enum(["1", "2", "3"]),
  
  // Section 3 - Medical Information
  neckPain: z.enum(["1", "2"]),
  additionalInfo: z.string().optional(),
  
  // Section 4 - Shoulder Pain Information
  shoulderPain: z.enum(["1", "2"]),
  shoulderSide: z.enum(["1", "2", "3"]),
  shoulderPainStart: z.enum(["1", "2", "3"]),
  shoulderPainInitialSeverity: z.enum(["1", "2", "3"]),
  shoulderPainCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  shoulderPainResolveDays: z.string().optional(),

  // Section 5 - Back Pain Information
  backPain: z.enum(["1", "2"]),
  backLocation: z.enum(["1", "2", "3", "4"]),
  backPainStart: z.enum(["1", "2", "3"]),
  backPainInitialSeverity: z.enum(["1", "2", "3"]),
  backPainCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  backPainResolveDays: z.string().optional(),

  // Section 6 - Headache Information
  headache: z.enum(["1", "2"]),
  headacheStart: z.enum(["1", "2", "3"]),
  headacheInitialSeverity: z.enum(["1", "2", "3"]),
  headacheCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  headacheResolveDays: z.string().optional(),
  headachePastHistory: z.string().optional(),
});

export default function Index() {
  const [currentSection, setCurrentSection] = useState(0);
  const { toast } = useToast();
  const totalSections = 13;

  const tabNames = [
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
    "Summary"
  ];
  
  const form = useForm<z.infer<typeof formSchema>>({
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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit the form",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('form_submissions')
        .insert([
          {
            user_id: userData.user.id,
            solicitor_name: values.solicitorName,
            solicitor_reference: values.solicitorReference,
            instructing_party_name: values.instructingPartyName,
            instructing_party_reference: values.instructingPartyReference,
            examination_location: values.examinationLocation,
            medco_reference: values.medcoReference,
            accompanied_by: values.accompaniedBy,
            mobile_number: values.mobileNumber,
            email_id: values.emailId,
            full_name: values.fullName,
            date_of_birth: values.dateOfBirth,
            id_type: values.idType,
            address: values.address,
            occupation: values.occupation,
            work_type: values.workType,
            living_with: values.livingWith,
            children_count: parseInt(values.childrenCount),
            accident_date: values.accidentDate,
            accident_time: values.accidentTime,
            vehicle_position: values.vehiclePosition,
            neck_pain: values.neckPain,
            additional_info: values.additionalInfo,
            shoulder_pain: values.shoulderPain,
            shoulder_side: values.shoulderSide,
            shoulder_pain_start: values.shoulderPainStart,
            shoulder_pain_initial_severity: values.shoulderPainInitialSeverity,
            shoulder_pain_current_severity: values.shoulderPainCurrentSeverity,
            shoulder_pain_resolve_days: values.shoulderPainResolveDays ? parseInt(values.shoulderPainResolveDays) : null,
            back_pain: values.backPain,
            back_location: values.backLocation,
            back_pain_start: values.backPainStart,
            back_pain_initial_severity: values.backPainInitialSeverity,
            back_pain_current_severity: values.backPainCurrentSeverity,
            back_pain_resolve_days: values.backPainResolveDays ? parseInt(values.backPainResolveDays) : null,
            headache: values.headache,
            headache_start: values.headacheStart,
            headache_initial_severity: values.headacheInitialSeverity,
            headache_current_severity: values.headacheCurrentSeverity,
            headache_resolve_days: values.headacheResolveDays ? parseInt(values.headacheResolveDays) : null,
            headache_past_history: values.headachePastHistory
          }
        ]);

      if (error) throw error;

      toast({
        title: "Form submitted",
        description: "Your intake form has been submitted successfully.",
      });
      
      console.log(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    }
  }

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
          <h2 className="text-base font-semibold text-blue-900 mb-2">Quick Guide</h2>
          <ul className="space-y-1 text-blue-800">
            <li>• Complete all sections to help us understand your injury circumstances</li>
            <li>• Navigate using the tabs above</li>
            <li>• Progress saves automatically - return anytime using your shared link</li>
            <li>• Skip uncertain questions for discussion during examination</li>
            <li>• Use Previous/Next buttons to move between sections</li>
          </ul>
        </div>
      )}
      
      <div className="overflow-x-auto scrollbar-none -mx-4 px-4 mb-6">
        <Tabs.Root value={currentSection.toString()} onValueChange={handleTabChange}>
          <Tabs.List className="inline-flex min-w-full space-x-1 border-b border-gray-200 pb-1 no-scrollbar">
            {tabNames.map((name, index) => (
              <Tabs.Trigger
                key={index}
                value={index.toString()}
                className={cn(
                  "px-3 py-2 text-sm whitespace-nowrap rounded-t-lg transition-colors",
                  "hover:bg-gray-100",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                )}
              >
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            {currentSection === 0 && <PreFilledDetails form={form} />}
            {currentSection === 1 && <IntakeFormSection2 form={form} />}
            {currentSection === 2 && <IntakeFormSection3 form={form} />}
            {currentSection === 3 && <IntakeFormSection4 form={form} />}
            {currentSection === 4 && <IntakeFormSection5 form={form} />}
            {currentSection === 5 && <IntakeFormSection6 form={form} />}
            {currentSection === 6 && <IntakeFormSection7 form={form} />}
            {currentSection === 7 && <IntakeFormSection8 form={form} />}
            {currentSection === 8 && <IntakeFormSection9 form={form} />}
            {currentSection === 9 && <IntakeFormSection10 form={form} />}
            {currentSection === 10 && <IntakeFormSection11 form={form} />}
            {currentSection === 11 && <IntakeFormSection12 form={form} />}
            {currentSection === 12 && <IntakeFormSummary form={form} />}
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
