
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas/intakeFormSchema";

/**
 * Hook to handle prefilling form data from URL parameters
 */
export function useFormPrefill(form: UseFormReturn<FormSchema>) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.toString()) {
      console.log("Found URL parameters for prefilling:", params.toString());
      
      const preFillData: Record<string, any> = {};
      
      params.forEach((value, key) => {
        if (value) {
          preFillData[key] = value;
          console.log(`Setting parameter ${key} to ${value}`);
        }
      });
      
      if (preFillData.dateOfExamination) {
        try {
          const date = new Date(preFillData.dateOfExamination);
          preFillData.dateOfExamination = date.toISOString().split('T')[0];
        } catch (e) {
          console.error("Error parsing dateOfExamination:", e);
        }
      }
      
      if (preFillData.dateOfReport) {
        try {
          const date = new Date(preFillData.dateOfReport);
          preFillData.dateOfReport = date.toISOString().split('T')[0];
        } catch (e) {
          console.error("Error parsing dateOfReport:", e);
        }
      }
      
      if (Object.keys(preFillData).length > 0) {
        const currentValues = form.getValues();
        const mergedValues = {...currentValues, ...preFillData};
        form.reset(mergedValues);
        
        console.log("Form reset with prefilled data:", mergedValues);
      }
    }
  }, [form]);
}
