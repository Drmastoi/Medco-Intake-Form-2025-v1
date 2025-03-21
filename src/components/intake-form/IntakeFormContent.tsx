
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { Form } from "@/components/ui/form";
import { IntakeFormSections } from "@/components/intake-form/IntakeFormSections";
import { IntakeFormNavButtons } from "@/components/intake-form/IntakeFormNavButtons";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface IntakeFormContentProps {
  form: UseFormReturn<FormSchema>;
  currentSection: number;
  totalSections: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: (values: FormSchema) => Promise<void>;
  isSubmitting?: boolean;
}

export function IntakeFormContent({ 
  form, 
  currentSection, 
  totalSections, 
  setCurrentSection,
  onSubmit,
  isSubmitting = false
}: IntakeFormContentProps) {
  const { toast } = useToast();
  const [validationError, setValidationError] = React.useState<string | null>(null);
  
  const handleFormSubmit = async () => {
    try {
      setValidationError(null);
      
      // Validate the entire form
      const isValid = await form.trigger();
      
      if (isValid && onSubmit) {
        const values = form.getValues();
        
        // Ensure essential data is present
        if (!values.fullName) {
          setValidationError("Please fill in your full name before submitting");
          setCurrentSection(1); // Navigate to personal info section
          return;
        }
        
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
          let errorSection = 0;
          const errorField = Object.keys(formErrors)[0];
          console.log("Validation error on field:", errorField, formErrors[errorField]);
          
          // Map errors to sections
          if (errorField.includes('solicitor') || errorField.includes('instructing') || 
              errorField.includes('examination') || errorField.includes('medco') || 
              errorField.includes('accompanied') || errorField.includes('mobile') || 
              errorField.includes('email')) {
            errorSection = 0; // Prefilled section
          } else if (errorField.includes('full') || errorField.includes('dateOfBirth') || 
                    errorField.includes('gender') || errorField.includes('address') || 
                    errorField.includes('occupation') || errorField.includes('living')) {
            errorSection = 1; // Personal section
          } else if (errorField.includes('accident')) {
            errorSection = 2; // Accident section
          } else if (errorField.includes('neck')) {
            errorSection = 3; // Neck pain section
          } else if (errorField.includes('shoulder')) {
            errorSection = 4; // Shoulder section
          } else if (errorField.includes('back')) {
            errorSection = 5; // Back section
          } else if (errorField.includes('headache')) {
            errorSection = 6; // Headache section
          } else if (errorField.includes('anxiety') || errorField.includes('travel')) {
            errorSection = 7; // Travel anxiety section
          }
          
          // Navigate to the section with the error
          setCurrentSection(errorSection);
          
          const errorMsg = formErrors[errorField]?.message?.toString() || 
            "There are validation errors that need to be fixed before submitting.";
          
          setValidationError(errorMsg);
          
          toast({
            title: "Please check the form",
            description: errorMsg,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setValidationError("There was a problem submitting the form. Please try again.");
      
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
        {validationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}
        
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
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
