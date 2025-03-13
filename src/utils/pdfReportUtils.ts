
import { FormSchema } from "@/schemas/intakeFormSchema";
import { ReportData } from "@/types/reportTypes";

/**
 * Converts form data to the format required for PDF report generation
 */
export function convertFormDataToReportData(formData: FormSchema): ReportData {
  // Extract personal details
  const personal = {
    fullName: formData.fullName || "Not Specified",
    dateOfBirth: formData.dateOfBirth || "Not Specified",
    gender: formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Not Specified",
    address: formData.address || "Not Specified",
    occupation: formData.occupation || "Not Specified",
    workType: getWorkTypeText(formData.workType),
  };

  // Extract accident details
  const accident = {
    accidentDate: formData.accidentDate || "Not Specified",
    accidentTime: getAccidentTimeText(formData.accidentTime),
    vehiclePosition: formData.vehiclePosition || "Not Specified",
    vehicleStatus: formData.vehicleStatus || "Not Specified",
    vehicleLocation: formData.vehicleLocation || "Not Specified",
    impactLocation: formData.impactLocation || "Not Specified",
    vehicleDamage: formData.vehicleDamage || "Not Specified",
    claimantPosition: formData.claimantPosition || "Not Specified",
    claimantVehicle: formData.claimantVehicle || "Not Specified",
    otherVehicle: formData.otherVehicle || "Not Specified",
    accidentSummary: formData.accidentSummary || "",
  };

  // Extract prefilled data
  const prefilled = {
    solicitorName: formData.solicitorName || "Not Specified",
    solicitorReference: formData.solicitorReference || "Not Specified",
    instructingPartyName: formData.instructingPartyName || "Not Specified",
    instructingPartyReference: formData.instructingPartyReference || "Not Specified",
    examinationLocation: formData.examinationLocation || "Not Specified",
    medcoReference: formData.medcoReference || "Not Specified",
    accompaniedBy: formData.accompaniedBy || "Unaccompanied",
    dateOfExamination: formData.dateOfExamination || new Date().toISOString().split('T')[0],
    dateOfReport: formData.dateOfReport || new Date().toISOString().split('T')[0],
    timeSpentWithClaimant: formData.timeSpentWithClaimant || "15",
    expertName: "Dr. Sam Smith", // Default expert name
    expertSpecialty: "General Practice, Consultant", // Default specialty
    expertTitle: "Consultant", // Default title
    gmcNumber: "1234567", // Default GMC number
  };

  // Combine all sections into the final report data structure
  return {
    prefilled,
    personal,
    accident,
    injuries: {
      neckPain: getNeckPainData(formData),
      shoulderPain: getShoulderPainData(formData),
      backPain: getBackPainData(formData),
      headache: getHeadacheData(formData)
    },
    travelAnxiety: getTravelAnxietyData(formData),
    other: {
      bruising: getBruisingData(formData),
      otherInjuries: getOtherInjuriesData(formData),
      treatment: getTreatmentData(formData),
      lifestyle: getLifestyleData(formData),
      medicalHistory: getMedicalHistoryData(formData)
    }
  };
}

// Helper functions to convert form values to readable text
function getWorkTypeText(workType: string): string {
  switch (workType) {
    case "1": return "Full Time";
    case "2": return "Part Time";
    case "3": return "N/A";
    default: return "Not Specified";
  }
}

function getAccidentTimeText(time: string): string {
  switch (time) {
    case "1": return "Morning";
    case "2": return "Afternoon";
    case "3": return "Evening";
    case "4": return "Night";
    default: return "Unspecified";
  }
}

// Helper functions to extract specific injury data
function getNeckPainData(formData: FormSchema) {
  return {
    hasInjury: formData.neckPain === "1",
    painStart: formData.neckPainStart || "Not Specified",
    initialSeverity: formData.neckPainInitialSeverity || "Not Specified",
    currentSeverity: formData.neckPainCurrentSeverity || "Not Specified",
    resolveDays: formData.neckPainResolveDays || "Not Specified",
    additionalInfo: formData.additionalInfo || "",
    hadPrior: formData.hadPriorNeckPain === "1"
  };
}

function getShoulderPainData(formData: FormSchema) {
  return {
    hasInjury: formData.shoulderPain === "1",
    side: formData.shoulderSide || "Not Specified",
    painStart: formData.shoulderPainStart || "Not Specified",
    initialSeverity: formData.shoulderPainInitialSeverity || "Not Specified",
    currentSeverity: formData.shoulderPainCurrentSeverity || "Not Specified",
    resolveDays: formData.shoulderPainResolveDays || "Not Specified"
  };
}

function getBackPainData(formData: FormSchema) {
  return {
    hasInjury: formData.backPain === "1",
    location: formData.backLocation || "Not Specified",
    painStart: formData.backPainStart || "Not Specified",
    initialSeverity: formData.backPainInitialSeverity || "Not Specified",
    currentSeverity: formData.backPainCurrentSeverity || "Not Specified",
    resolveDays: formData.backPainResolveDays || "Not Specified"
  };
}

function getHeadacheData(formData: FormSchema) {
  return {
    hasInjury: formData.headache === "1",
    start: formData.headacheStart || "Not Specified",
    initialSeverity: formData.headacheInitialSeverity || "Not Specified",
    currentSeverity: formData.headacheCurrentSeverity || "Not Specified",
    resolveDays: formData.headacheResolveDays || "Not Specified",
    pastHistory: formData.headachePastHistory || ""
  };
}

function getTravelAnxietyData(formData: FormSchema) {
  return {
    hasAnxiety: formData.travelAnxiety === "1",
    symptoms: formData.travelAnxietySymptoms || [],
    currentlyDriving: formData.currentlyDriving || "Not Specified",
    initialSeverity: formData.anxietyInitialSeverity || "Not Specified",
    currentSeverity: formData.anxietyCurrentSeverity || "Not Specified",
    resolveDays: formData.anxietyResolveDays || "Not Specified",
    pastHistory: formData.anxietyPastHistory || "",
    duration: formData.anxietyDuration || "",
    hasHistory: formData.hasAnxietyHistory || "no"
  };
}

function getBruisingData(formData: FormSchema) {
  return {
    hasBruising: false, // Default value, needs to be updated based on actual form schema
    location: "Not Specified",
    noticed: "Not Specified",
    initialSeverity: "Not Specified",
    currentSeverity: "Not Specified",
    resolveDays: "Not Specified"
  };
}

function getOtherInjuriesData(formData: FormSchema) {
  return {
    hasOtherInjury: false, // Default value, needs to be updated based on actual form schema
    name: "Not Specified",
    start: "Not Specified",
    initialSeverity: "Not Specified",
    currentSeverity: "Not Specified",
    resolveDays: "Not Specified"
  };
}

function getTreatmentData(formData: FormSchema) {
  return {
    hasTreatment: false, // Default value, needs to be updated based on actual form schema
    type: [],
    frequency: "Not Specified",
    duration: "Not Specified",
    ongoing: false
  };
}

function getLifestyleData(formData: FormSchema) {
  return {
    impactOnWork: false, // Default value, needs to be updated based on actual form schema
    timeOffWork: "Not Specified",
    workRestrictions: [],
    impactOnSleep: false,
    sleepIssues: [],
    impactOnDomestic: false,
    domesticIssues: [],
    impactOnSports: false,
    sportsActivities: "Not Specified",
    sportsDuration: "Not Specified",
    impactOnSocial: false,
    socialDetails: "Not Specified"
  };
}

function getMedicalHistoryData(formData: FormSchema) {
  return {
    exceptionalInjuries: formData.exceptionalInjuries === "1",
    exceptionalInjuriesDetails: formData.exceptionalInjuriesDetails || ""
  };
}

export type { ReportData } from "@/types/reportTypes";
