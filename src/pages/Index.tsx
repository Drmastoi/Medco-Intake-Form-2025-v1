import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { IntakeFormSummary } from "@/components/IntakeFormSummary";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as Tabs from "@radix-ui/react-tabs";
import { Share } from "lucide-react";

const formSchema = z.object({
  // Pre-filled fields (sender details)
  solicitorName: z.string(),
  solicitorReference: z.string(),
  instructingPartyName: z.string(),
  instructingPartyReference: z.string(),
  examinationLocation: z.string(),
  
  // Existing fields
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
  const [currentSection, setCurrentSection] = useState(0); // Start with pre-filled section
  const { toast } = useToast();
  const totalSections = 13;

  const tabNames = [
    "Pre-filled Details",
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
      
      // Existing default values
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

  const handleTabChange = (value: string) => {
    setCurrentSection(parseInt(value));
  };

  const generateShareableLink = () => {
    // Create a URL with pre-filled data as query parameters
    const formData = form.getValues();
    const preFillData = {
      solicitorName: formData.solicitorName,
      solicitorReference: formData.solicitorReference,
      instructingPartyName: formData.instructingPartyName,
      instructingPartyReference: formData.instructingPartyReference,
      examinationLocation: formData.examinationLocation,
    };
    
    const queryParams = new URLSearchParams(preFillData).toString();
    const shareableLink = `${window.location.origin}?${queryParams}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: "Share this link with the claimant to fill out the questionnaire.",
      });
    });
  };

  // Add this at the beginning of the component to handle pre-filled data
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
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Medical Intake Form</h1>
        <Button
          onClick={generateShareableLink}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share className="w-4 h-4" />
          Share with Claimant
        </Button>
      </div>
      
      <Tabs.Root value={currentSection.toString()} onValueChange={handleTabChange} className="mb-6">
        <Tabs.List className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-14 h-auto gap-1 max-w-[90%] mx-auto">
          {tabNames.map((name, index) => (
            <Tabs.Trigger
              key={index}
              value={index.toString()}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 py-1 text-[10px] md:text-xs rounded-md whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentSection === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="solicitorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solicitor's Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="solicitorReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solicitor's Reference</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instructingPartyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructing Party Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instructingPartyReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructing Party Reference</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="examinationLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Examination Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          
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
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
            >
              Previous
            </Button>
            
            {currentSection < totalSections ? (
              <Button 
                type="button"
                onClick={() => setCurrentSection(prev => Math.min(totalSections, prev + 1))}
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
