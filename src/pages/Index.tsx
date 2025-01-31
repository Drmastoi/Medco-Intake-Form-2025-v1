import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { IntakeFormSection1 } from "@/components/IntakeFormSection1";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Section 1 - Personal Information
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string(),
  idType: z.enum(["1", "2", "3"]),
  email: z.string().email(),
  address: z.string(),
  occupation: z.string(),
  workType: z.enum(["1", "2"]),
  livingWith: z.enum(["1", "2", "3", "4", "5"]),
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
  const [currentSection, setCurrentSection] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      idType: "1",
      email: "",
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Form submitted",
      description: "Your intake form has been submitted successfully.",
    });
    console.log(values);
  }

  const totalSections = 12;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Medical Intake Form</h1>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Section {currentSection} of {totalSections}
        </p>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentSection / totalSections) * 100}%` }}
          />
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentSection === 1 && <IntakeFormSection1 form={form} />}
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
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
              disabled={currentSection === 1}
            >
              Previous
            </Button>
            
            {currentSection < totalSections + 1 ? (
              <Button 
                type="button"
                onClick={() => setCurrentSection(prev => Math.min(totalSections + 1, prev + 1))}
              >
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