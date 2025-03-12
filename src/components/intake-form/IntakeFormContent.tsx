
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
}

export function IntakeFormContent({ 
  form, 
  currentSection, 
  totalSections, 
  setCurrentSection 
}: IntakeFormContentProps) {
  return (
    <Form {...form}>
      <form className="space-y-8">
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
  );
}
