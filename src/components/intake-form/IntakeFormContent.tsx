
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { Form } from "@/components/ui/form";
import { IntakeFormSections } from "@/components/intake-form/IntakeFormSections";
import { IntakeFormNavButtons } from "@/components/intake-form/IntakeFormNavButtons";

interface IntakeFormContentProps {
  form: UseFormReturn<FormSchema>;
  currentSection: number;
  totalSections: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: (values: FormSchema) => Promise<void>;
}

export function IntakeFormContent({ 
  form, 
  currentSection, 
  totalSections, 
  setCurrentSection,
  onSubmit
}: IntakeFormContentProps) {
  const handleSubmit = onSubmit 
    ? form.handleSubmit(onSubmit)
    : () => console.log("No submit handler provided");

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit}>
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
          onSubmit={currentSection === totalSections - 1 ? handleSubmit : undefined}
        />
      </form>
    </Form>
  );
}
