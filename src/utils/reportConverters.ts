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
 * Returns a readable label for travel anxiety symptom IDs
 */
export function getTravelAnxietySymptomLabel(id: string): string {
  const labels: { [key: string]: string } = {
    "cautious-driver": "Being a more cautious driver",
    "frequent-mirror-checking": "Looking in the mirror more frequently",
    "avoid-accident-road": "Avoiding the road where the accident happened",
    "avoid-passenger": "Avoiding being a passenger in a car",
    "avoid-driving": "Avoiding driving a car",
    "panic-attacks": "Getting panic attacks when in a car",
    "passenger-anxiety": "Anxiety when traveling as a passenger",
    "busy-road-anxiety": "Anxiety on busy roads or highways",
    "prevented-driving": "Being prevented from driving for leisure or work",
    "other": "Other symptoms"
  };
  
  return labels[id] || id;
}

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
    accompaniedBy: formData.accompaniedBy || "Unaccompanied",
    expertName: "Dr. Sam Smith", // Default value
    expertSpecialty: "General Practice", // Default value
    expertTitle: "Consultant", // Default value
    gmcNumber: "GMC - 1234567", // Default value
  };
}

/**
 * Converts form data to personal information section
 */
export function convertPersonalData(formData: FormSchema): PersonalData {
  return {
    fullName: formData.fullName || "Not specified",
    dateOfBirth: formData.dateOfBirth || "Not specified",
    gender: formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Not specified",
    address: formData.address || "Not specified",
    occupation: formData.occupation || "Not specified",
    workType: formData.workType || "Not specified",
    idType: formData.idType || "Not specified",
  };
}

/**
 * Converts form data to accident information section
 */
export function convertAccidentData(formData: FormSchema): AccidentData {
  // Helper functions to convert enum values to readable text
  const getVehicleStatusText = (status: string | undefined) => {
    if (!status) return "Not specified";
    const statusMap: Record<string, string> = {
      "1": "Moving",
      "2": "Stationary",
      "3": "Parked",
      "4": "Other"
    };
    return statusMap[status] || "Not specified";
  };

  const getVehicleLocationText = (location: string | undefined) => {
    if (!location) return "Not specified";
    const locationMap: Record<string, string> = {
      "1": "Main Road",
      "2": "Minor Road",
      "3": "Roundabout",
      "4": "Parked",
      "5": "Other"
    };
    return locationMap[location] || "Not specified";
  };

  const getImpactLocationText = (location: string | undefined) => {
    if (!location) return "Not specified";
    const locationMap: Record<string, string> = {
      "1": "Rear",
      "2": "Front",
      "3": "Passenger Side",
      "4": "Driver Side"
    };
    return locationMap[location] || "Not specified";
  };

  const getVehicleDamageText = (damage: string | undefined) => {
    if (!damage) return "Not specified";
    const damageMap: Record<string, string> = {
      "1": "Mild Damage",
      "2": "Moderate Damage",
      "3": "Written Off"
    };
    return damageMap[damage] || "Not specified";
  };

  const getClaimantPositionText = (position: string | undefined) => {
    if (!position) return "Not specified";
    const positionMap: Record<string, string> = {
      "1": "Driver",
      "2": "Front Passenger",
      "3": "Back Passenger",
      "4": "Other"
    };
    return positionMap[position] || "Not specified";
  };

  const getVehicleTypeText = (type: string | undefined) => {
    if (!type) return "Not specified";
    const typeMap: Record<string, string> = {
      "1": "Car",
      "2": "Van",
      "3": "Bus",
      "4": "Other"
    };
    return typeMap[type] || "Not specified";
  };

  return {
    accidentDate: formData.accidentDate || "Not specified",
    accidentTime: getTimeOfDayText(formData.accidentTime),
    vehiclePosition: formData.vehiclePosition || "Not specified",
    vehicleStatus: getVehicleStatusText(formData.vehicleStatus),
    vehicleLocation: getVehicleLocationText(formData.vehicleLocation),
    impactLocation: getImpactLocationText(formData.impactLocation),
    vehicleDamage: getVehicleDamageText(formData.vehicleDamage),
    claimantPosition: getClaimantPositionText(formData.claimantPosition),
    claimantVehicle: getVehicleTypeText(formData.claimantVehicle),
    otherVehicle: getVehicleTypeText(formData.otherVehicle),
    accidentSummary: formData.accidentSummary || "No detailed description provided.",
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
      resolveDays: formData.neckPainResolveDays || undefined,
      additionalInfo: formData.additionalInfo || undefined,
      hadPrior: formData.hadPriorNeckPain === "1",
    },
    shoulderPain: {
      hasInjury: formData.shoulderPain === "1",
      side: formData.shoulderSide === "1" ? "right" : formData.shoulderSide === "2" ? "left" : "both",
      painStart: formData.shoulderPainStart || "Not specified",
      initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
      currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
      resolveDays: formData.shoulderPainResolveDays || undefined,
    },
    backPain: {
      hasInjury: formData.backPain === "1",
      location: formData.backLocation || "Not specified",
      painStart: formData.backPainStart || "Not specified",
      initialSeverity: getSeverityText(formData.backPainInitialSeverity),
      currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
      resolveDays: formData.backPainResolveDays || undefined,
    },
    headache: {
      hasInjury: formData.headache === "1",
      start: formData.headacheStart || "Not specified",
      initialSeverity: getSeverityText(formData.headacheInitialSeverity),
      currentSeverity: getSeverityText(formData.headacheCurrentSeverity),
      resolveDays: formData.headacheResolveDays || undefined,
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
    symptoms: formData.travelAnxietySymptoms?.map(symptom => getTravelAnxietySymptomLabel(symptom)) || [],
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
