import { FormSchema } from "@/schemas/intakeFormSchema";
import { 
  PrefilledData, 
  PersonalData, 
  AccidentData, 
  InjuriesData,
  TravelAnxietyData,
  OtherData
} from "@/types/reportTypes";
import { getSeverityText, getTimeOfDayText, getYesNo } from "./formatUtils";

/**
 * Converts form data to prefilled section
 */
export function convertPrefilledData(formData: FormSchema): PrefilledData {
  return {
    solicitorName: formData.solicitorName || "Not specified",
    solicitorReference: formData.solicitorReference || "Not specified",
    instructingPartyName: formData.instructingPartyName || "Not specified",
    instructingPartyReference: formData.instructingPartyReference || "Not specified",
    examinationLocation: formData.examinationLocation || "Not specified",
    medcoReference: formData.medcoReference || "Not specified",
    dateOfExamination: formData.dateOfExamination || "Not specified",
    dateOfReport: formData.dateOfReport || "Not specified",
    timeSpentWithClaimant: formData.timeSpentWithClaimant || "Not specified",
  };
}

/**
 * Converts form data to personal information section
 */
export function convertPersonalData(formData: FormSchema): PersonalData {
  return {
    fullName: formData.fullName || "Not specified",
    dateOfBirth: formData.dateOfBirth || "Not specified",
    gender: formData.gender === "male" ? "Male" : "Female",
    address: formData.address || "Not specified",
    occupation: formData.occupation || "Not specified",
    workType: formData.workType || "Not specified",
  };
}

/**
 * Converts form data to accident information section
 */
export function convertAccidentData(formData: FormSchema): AccidentData {
  return {
    accidentDate: formData.accidentDate || "Not specified",
    accidentTime: getTimeOfDayText(formData.accidentTime),
    vehiclePosition: formData.vehiclePosition || "Not specified",
    vehicleStatus: formData.vehicleStatus,
    vehicleLocation: formData.vehicleLocation,
    impactLocation: formData.impactLocation,
    vehicleDamage: formData.vehicleDamage,
    claimantPosition: formData.claimantPosition,
    claimantVehicle: formData.claimantVehicle,
    otherVehicle: formData.otherVehicle,
  };
}

/**
 * Converts form data to injuries section
 */
export function convertInjuriesData(formData: FormSchema): InjuriesData {
  return {
    neckPain: {
      hasInjury: formData.neckPain === "1",
      painStart: formData.neckPainStart || "Not specified",
      initialSeverity: getSeverityText(formData.neckPainInitialSeverity),
      currentSeverity: getSeverityText(formData.neckPainCurrentSeverity),
      resolveDays: formData.neckPainResolveDays || "Not specified",
      additionalInfo: formData.additionalInfo || "None",
      hadPrior: formData.hadPriorNeckPain === "1",
    },
    shoulderPain: {
      hasInjury: formData.shoulderPain === "1",
      side: formData.shoulderSide === "1" ? "Right" : formData.shoulderSide === "2" ? "Left" : "Both",
      painStart: formData.shoulderPainStart || "Not specified",
      initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
      currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
      resolveDays: formData.shoulderPainResolveDays || "Not specified",
    },
    backPain: {
      hasInjury: formData.backPain === "1",
      location: formData.backLocation || "Not specified",
      painStart: formData.backPainStart || "Not specified",
      initialSeverity: getSeverityText(formData.backPainInitialSeverity),
      currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
      resolveDays: formData.backPainResolveDays || "Not specified",
    },
    headache: {
      hasInjury: formData.headache === "1",
      start: formData.headacheStart || "Not specified",
      initialSeverity: getSeverityText(formData.headacheInitialSeverity),
      currentSeverity: getSeverityText(formData.headacheCurrentSeverity),
      resolveDays: formData.headacheResolveDays || "Not specified",
      pastHistory: formData.headachePastHistory || "None",
    },
  };
}

/**
 * Converts form data to travel anxiety section
 */
export function convertTravelAnxietyData(formData: FormSchema): TravelAnxietyData {
  return {
    hasAnxiety: formData.travelAnxiety === "1",
    symptoms: formData.travelAnxietySymptoms || [],
    currentlyDriving: formData.currentlyDriving || "Not specified",
    initialSeverity: getSeverityText(formData.anxietyInitialSeverity),
    currentSeverity: getSeverityText(formData.anxietyCurrentSeverity),
    resolveDays: formData.anxietyResolveDays || "Not specified",
    pastHistory: formData.anxietyPastHistory || "None",
    duration: formData.anxietyDuration || "Not specified",
    hasHistory: formData.hasAnxietyHistory || "No",
  };
}

/**
 * Converts form data to other information sections (bruising, other injuries, treatment, lifestyle, medical history)
 */
export function convertOtherData(formData: FormSchema): OtherData {
  return {
    bruising: {
      hasBruising: formData.hasBruising === "1",
      location: formData.bruisingLocation,
      initialSeverity: getSeverityText(formData.bruisingInitialSeverity),
      currentSeverity: getSeverityText(formData.bruisingCurrentSeverity),
      resolveDays: formData.bruisingResolveDays,
    },
    otherInjuries: {
      hasOtherInjury: formData.hasOtherInjury === "1",
      name: formData.injuryName,
      initialSeverity: getSeverityText(formData.injuryInitialSeverity),
      currentSeverity: getSeverityText(formData.injuryCurrentSeverity),
      resolveDays: formData.injuryResolveDays
    },
    treatment: {
      hasTreatment: formData.hasTreatment === "1",
      type: formData.treatmentType,
      frequency: formData.treatmentFrequency,
      duration: formData.treatmentDuration,
      ongoing: formData.ongoingTreatment === "1"
    },
    lifestyle: {
      impactOnWork: formData.impactOnWork === "1",
      timeOffWork: formData.timeOffWork,
      workRestrictions: formData.workRestrictions,
      impactOnSleep: formData.impactOnSleep === "1",
      sleepIssues: formData.sleepIssues,
      impactOnDomestic: formData.impactOnDomestic === "1",
      domesticIssues: formData.domesticIssues,
      impactOnSports: formData.impactOnSports === "1",
      sportsActivities: formData.sportsActivities,
      sportsDuration: formData.sportsDuration,
      impactOnSocial: formData.impactOnSocial === "1",
      socialDetails: formData.socialDetails
    },
    medicalHistory: {
      exceptionalInjuries: formData.exceptionalInjuries === "1",
      exceptionalInjuriesDetails: formData.exceptionalInjuriesDetails || "None",
    },
  };
}
