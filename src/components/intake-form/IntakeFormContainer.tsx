import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { personalDetailsSection } from './form-sections/PersonalDetailsSection';
import { accidentDetailsSection } from './form-sections/AccidentDetailsSection';
import { injuriesSection } from './form-sections/InjuriesSection';
import { otherDetailsSection } from './form-sections/OtherDetailsSection';
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ShareLinkButton } from "@/components/prefilled-details/ShareLinkButton";
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";

export function IntakeFormContainer() {
  const [currentSection, setCurrentSection] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      solicitorName: "",
      solicitorReference: "",
      instructingPartyName: "",
      instructingPartyReference: "",
      examinationLocation: "",
      medcoReference: "",
      dateOfExamination: "",
      dateOfReport: "",
      timeSpentWithClaimant: "15",
      accompaniedBy: "",
      fullName: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      occupation: "",
      workType: "",
      idType: "",
      mobileNumber: "",
      emailId: "",
      livingWith: "",
      childrenCount: "0",
      accidentDate: "",
      accidentTime: "",
      vehiclePosition: "",
      vehicleStatus: "",
      vehicleLocation: "",
      impactLocation: "",
      vehicleDamage: "",
      claimantPosition: "",
      claimantVehicle: "",
      otherVehicle: "",
      accidentSummary: "",
      neckPain: "0",
      neckPainStart: "",
      neckPainInitialSeverity: "",
      neckPainCurrentSeverity: "",
      neckPainResolveDays: "",
      additionalInfo: "",
      hadPriorNeckPain: "0",
      shoulderPain: "0",
      shoulderSide: "",
      shoulderPainStart: "",
      shoulderPainInitialSeverity: "",
      shoulderPainCurrentSeverity: "",
      shoulderPainResolveDays: "",
      backPain: "0",
      backLocation: "",
      backPainStart: "",
      backPainInitialSeverity: "",
      backPainCurrentSeverity: "",
      backPainResolveDays: "",
      headache: "0",
      headacheStart: "",
      headacheInitialSeverity: "",
      headacheCurrentSeverity: "",
      headacheResolveDays: "",
      headachePastHistory: "",
      travelAnxiety: "0",
      travelAnxietySymptoms: [],
      otherTravelAnxietySymptom: "",
      currentlyDriving: "",
      anxietyInitialSeverity: "",
      anxietyCurrentSeverity: "",
      anxietyResolveDays: "",
      anxietyPastHistory: "",
      anxietyDuration: "",
      hasBruising: "0",
      bruisingLocation: "",
      bruisingNoticed: "",
      bruisingInitialSeverity: "",
      bruisingCurrentSeverity: "",
      bruisingResolveDays: "",
      hasOtherInjury: "0",
      injuryName: "",
      injuryStart: "",
      injuryInitialSeverity: "",
      injuryCurrentSeverity: "",
      injuryResolveDays: "",
      hasTreatment: "0",
      treatmentType: [],
      treatmentFrequency: "",
      treatmentDuration: "",
      ongoingTreatment: "0",
      impactOnWork: "0",
      timeOffWork: "",
      workRestrictions: [],
      impactOnSleep: "0",
      sleepIssues: [],
      impactOnDomestic: "0",
      domesticIssues: [],
      impactOnSports: "0",
      sportsActivities: "",
      sportsDuration: "",
      impactOnSocial: "0",
      socialDetails: "",
      exceptionalInjuries: "0",
      exceptionalInjuriesDetails: "",
      dateOfExamination: new Date().toISOString().split('T')[0],
      dateOfReport: new Date().toISOString().split('T')[0],
      vehicleStatus: "",
      vehicleLocation: "",
      vehicleType: "",
      claimantPosition: "",
      otherVehicle: "",
      vehicleDamage: "",
      daysOffWork: "",
      sleepDisturbance: "0",
      effectOnDomesticLiving: "0",
      effectOnSportLeisure: "0",
      effectOnSocialLife: "0",
      workImpactDate: "",
      sleepImpactDate: "",
      domesticImpactDate: "",
      sportsImpactDate: "",
      socialImpactDate: "",
      domesticEffects: [],
      sleepDisturbances: [],
      sportLeisureEffects: [],
      socialLifeEffects: [],
      workDifficulties: [],
      otherWorkDifficulties: "",
      otherSleepDisturbances: "",
      otherDomesticEffects: "",
      otherSportLeisureEffects: "",
      otherSocialLifeEffects: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      prefillForm(ref);
    }
  }, [router]);

  // Replace the prefill form function that uses supabase.rest with fetch API
  const prefillForm = async (referenceNumber: string) => {
    setIsLoading(true);
    
    try {
      // Fetch submission data using fetch API
      const submissionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_submissions?reference_number=eq.${referenceNumber}&select=*`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!submissionResponse.ok) {
        throw new Error('Failed to fetch questionnaire submission');
      }
      
      const submissions = await submissionResponse.json();
      
      if (submissions.length === 0) {
        toast({
          title: "Reference not found",
          description: "Could not find a questionnaire with this reference number.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Get the submission ID
      const submissionId = submissions[0].id;
      
      // Now fetch the form data
      const formDataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_data?submission_id=eq.${submissionId}&version=eq.prefilled&select=*`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!formDataResponse.ok) {
        throw new Error('Failed to fetch form data');
      }
      
      const formDataRecords = await formDataResponse.json();
      
      if (formDataRecords.length > 0) {
        const prefilledData = formDataRecords[0].form_data;
        form.reset(prefilledData);
        setReferenceNumber(referenceNumber);
        setCurrentSection(0);
      }
    } catch (error) {
      console.error('Error prefilling form:', error);
      toast({
        title: "Error",
        description: "Failed to load prefilled data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  function renderSection(section: number) {
    switch (section) {
      case 0:
        return personalDetailsSection;
      case 1:
        return accidentDetailsSection;
      case 2:
        return injuriesSection;
      case 3:
        return otherDetailsSection;
      default:
        return null;
    }
  }

  const SectionComponent = renderSection(currentSection) as React.FC<{ form: UseFormReturn<FormSchema> }>;

  return (
    <div className="container max-w-4xl mx-auto md:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => console.log(data))} className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Prefilled Details</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="solicitorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Solicitor Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Solicitor Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="solicitorReference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Solicitor Reference</FormLabel>
                          <FormControl>
                            <Input placeholder="Solicitor Reference" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="instructingPartyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instructing Party Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Instructing Party Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="instructingPartyReference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instructing Party Reference</FormLabel>
                          <FormControl>
                            <Input placeholder="Instructing Party Reference" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="examinationLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Examination Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Examination Location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="medcoReference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medco Reference</FormLabel>
                          <FormControl>
                            <Input placeholder="Medco Reference" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="dateOfExamination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Examination</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="dateOfReport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Report</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="timeSpentWithClaimant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Spent With Claimant</FormLabel>
                          <FormControl>
                            <Input placeholder="Time Spent With Claimant" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="accompaniedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accompanied By</FormLabel>
                          <FormControl>
                            <Input placeholder="Accompanied By" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator className="my-4" />
                <ShareLinkButton form={form} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="my-4" />

          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[400px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : (
            <SectionComponent form={form} />
          )}

          <div className="flex justify-between">
            {currentSection > 0 && (
              <Button variant="secondary" onClick={() => setCurrentSection(currentSection - 1)}>
                Previous
              </Button>
            )}
            {currentSection < 3 ? (
              <Button type="button" onClick={() => setCurrentSection(currentSection + 1)}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

import { UseFormReturn } from "react-hook-form";
