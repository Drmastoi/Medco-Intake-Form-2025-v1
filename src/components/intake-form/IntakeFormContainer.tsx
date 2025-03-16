
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { PrefilledDetailsSection } from "@/components/PrefilledDetailsSection";
import { IntakeFormNavigation } from "@/components/intake-form/IntakeFormNavigation";
import { IntakeFormHeader } from "@/components/intake-form/IntakeFormHeader";

// Import existing sections from project
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

export function IntakeFormContainer({ form: externalForm }: { form?: any }) {
  const [currentSection, setCurrentSection] = useState(0);
  const { toast } = useToast();

  // Use external form if provided, otherwise create a new one
  const form = externalForm || useForm<FormSchema>();

  const tabNames = [
    "Personal Details",
    "Accident Info",
    "Injuries",
    "Treatment & Impact"
  ];

  const handleTabChange = (value: string) => {
    setCurrentSection(parseInt(value));
  };

  const handleGenerateReport = () => {
    // Placeholder for report generation
    console.log("Generate report with data:", form.getValues());
    
    // This will be handled by the parent component now
    toast({
      title: "Form Submitted",
      description: "Your data has been submitted successfully.",
    });
  };

  function renderSection(section: number) {
    switch (section) {
      case 0:
        return <div className="space-y-6">
          <IntakeFormSection1 form={form} />
          <IntakeFormSection2 form={form} />
          <IntakeFormSection3 form={form} />
        </div>;
      case 1:
        return <div className="space-y-6">
          <IntakeFormSection4 form={form} />
          <IntakeFormSection5 form={form} />
          <IntakeFormSection6 form={form} />
        </div>;
      case 2: 
        return <div className="space-y-6">
          <IntakeFormSection7 form={form} />
          <IntakeFormSection8 form={form} />
          <IntakeFormSection9 form={form} />
        </div>;
      case 3:
        return <div className="space-y-6">
          <IntakeFormSection10 form={form} />
          <IntakeFormSection11 form={form} />
          <IntakeFormSection12 form={form} />
        </div>;
      default:
        return null;
    }
  }

  return (
    <div className="container max-w-4xl mx-auto md:px-0">
      <Form {...form}>
        <form className="space-y-6">
          <IntakeFormHeader 
            currentSection={currentSection}
            onTabChange={handleTabChange}
            tabNames={tabNames}
            onGenerateReport={handleGenerateReport}
          />
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="prefilled-details">
              <AccordionTrigger>Prefilled Details</AccordionTrigger>
              <AccordionContent>
                <PrefilledDetailsSection form={form} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="my-4" />
          
          {renderSection(currentSection)}

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
              <Button type="button" onClick={handleGenerateReport}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
