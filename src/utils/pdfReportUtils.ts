
import { FormSchema } from "@/schemas/intakeFormSchema";
import { ReportData } from "@/types/reportTypes";
import { 
  convertPrefilledData,
  convertPersonalData,
  convertAccidentData,
  convertInjuriesData,
  convertTravelAnxietyData,
  convertOtherData
} from "./reportConverters";

/**
 * Converts form data to the format required for PDF report generation
 */
export function convertFormDataToReportData(formData: FormSchema): ReportData {
  return {
    prefilled: convertPrefilledData(formData),
    personal: convertPersonalData(formData),
    accident: convertAccidentData(formData),
    injuries: convertInjuriesData(formData),
    travelAnxiety: convertTravelAnxietyData(formData),
    other: convertOtherData(formData)
  };
}

// Re-export ReportData type for use in components
export type { ReportData } from "@/types/reportTypes";
