
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
  const handleFormSubmit = async () => {
    // Validate the entire form
    const isValid = await form.trigger();
    
    if (isValid && onSubmit) {
      const values = form.getValues();
      await onSubmit(values);
    } else {
      // If validation fails, focus on the first error
      const firstError = Object.keys(form.formState.errors)[0];
      if (firstError) {
        form.setFocus(firstError as any);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
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
          onSubmit={handleFormSubmit}
        />
      </form>
    </Form>
  );
}
