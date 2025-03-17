
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { Form } from "@/components/ui/form";
import { IntakeFormSections } from "@/components/intake-form/IntakeFormSections";
import { IntakeFormNavButtons } from "@/components/intake-form/IntakeFormNavButtons";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
  const handleFormSubmit = async () => {
    try {
      // Validate the entire form
      const isValid = await form.trigger();
      
      if (isValid && onSubmit) {
        const values = form.getValues();
        await onSubmit(values);
        
        toast({
          title: "Form submitted successfully",
          description: "Thank you for completing the questionnaire!"
        });
      } else {
        // If validation fails, show the errors
        const formErrors = form.formState.errors;
        
        if (Object.keys(formErrors).length > 0) {
          // Get the section index of the first error
          // This is a simplified approach - you might need to map errors to sections
          let errorSection = 0;
          const errorField = Object.keys(formErrors)[0];
          
          // Very simple mapping - you might need a more comprehensive one
          if (errorField.includes('personal') || errorField.includes('fullName') || errorField.includes('dateOfBirth')) {
            errorSection = 1; // Personal section
          } else if (errorField.includes('accident')) {
            errorSection = 2; // Accident section
          }
          
          // Navigate to the section with the error
          setCurrentSection(errorSection);
          
          toast({
            title: "Please check the form",
            description: "There are validation errors that need to be fixed before submitting.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting the form. Please try again.",
        variant: "destructive"
      });
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
