
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
    idType: formData.idType,
  };

  // Extract accident details
  const accident = {
    accidentDate: formData.accidentDate || "Not Specified",
    accidentTime: getAccidentTimeText(formData.accidentTime),
    vehiclePosition: formData.vehiclePosition || "Not Specified",
    vehicleStatus: getVehicleStatusText(formData.vehicleStatus),
    vehicleLocation: getVehicleLocationText(formData.vehicleLocation),
    impactLocation: getImpactLocationText(formData.impactLocation),
    vehicleDamage: getVehicleDamageText(formData.vehicleDamage),
    claimantPosition: getClaimantPositionText(formData.claimantPosition),
    claimantVehicle: getVehicleTypeText(formData.claimantVehicle),
    otherVehicle: getVehicleTypeText(formData.otherVehicle),
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
function getWorkTypeText(workType: string | undefined): string {
  switch (workType) {
    case "1": return "Full Time";
    case "2": return "Part Time";
    case "3": return "N/A";
    default: return "Not Specified";
  }
}

function getAccidentTimeText(time: string | undefined): string {
  switch (time) {
    case "1": return "Morning";
    case "2": return "Afternoon";
    case "3": return "Evening";
    case "4": return "Night";
    default: return "Unspecified";
  }
}

function getVehicleStatusText(status: string | undefined): string {
  switch (status) {
    case "1": return "Moving";
    case "2": return "Stationary";
    case "3": return "Parked";
    default: return "Not Specified";
  }
}

function getVehicleLocationText(location: string | undefined): string {
  switch (location) {
    case "1": return "Main Road";
    case "2": return "Minor Road";
    case "3": return "Roundabout";
    case "4": return "Parked";
    case "5": return "Other";
    default: return "Not Specified";
  }
}

function getImpactLocationText(location: string | undefined): string {
  switch (location) {
    case "1": return "Rear";
    case "2": return "Front";
    case "3": return "Passenger Side";
    case "4": return "Driver Side";
    default: return "Not Specified";
  }
}

function getVehicleDamageText(damage: string | undefined): string {
  switch (damage) {
    case "1": return "Minor Damage";
    case "2": return "Moderate Damage";
    case "3": return "Written Off";
    default: return "Not Specified";
  }
}

function getClaimantPositionText(position: string | undefined): string {
  switch (position) {
    case "1": return "Driver";
    case "2": return "Front Passenger";
    case "3": return "Back Passenger";
    case "4": return "Other";
    default: return "Not Specified";
  }
}

function getVehicleTypeText(type: string | undefined): string {
  switch (type) {
    case "1": return "Car";
    case "2": return "Van";
    case "3": return "Bus";
    case "4": return "Other";
    default: return "Not Specified";
  }
}

// Helper functions to extract specific injury data
function getNeckPainData(formData: FormSchema) {
  return {
    hasInjury: formData.neckPain === "1",
    painStart: formData.neckPainStart || "Not Specified",
    initialSeverity: getSeverityText(formData.neckPainInitialSeverity),
    currentSeverity: getSeverityText(formData.neckPainCurrentSeverity),
    resolveDays: formData.neckPainResolveDays || "Not Specified",
    additionalInfo: formData.additionalInfo || "",
    hadPrior: formData.hadPriorNeckPain === "1"
  };
}

function getShoulderPainData(formData: FormSchema) {
  const sideText = formData.shoulderSide === "1" ? "left" : 
                  formData.shoulderSide === "2" ? "right" : "both";
  
  return {
    hasInjury: formData.shoulderPain === "1",
    side: sideText,
    painStart: formData.shoulderPainStart || "Not Specified",
    initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
    currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
    resolveDays: formData.shoulderPainResolveDays || "Not Specified"
  };
}

function getBackPainData(formData: FormSchema) {
  return {
    hasInjury: formData.backPain === "1",
    location: formData.backLocation || "Not Specified",
    painStart: formData.backPainStart || "Not Specified",
    initialSeverity: getSeverityText(formData.backPainInitialSeverity),
    currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
    resolveDays: formData.backPainResolveDays || "Not Specified"
  };
}

function getHeadacheData(formData: FormSchema) {
  return {
    hasInjury: formData.headache === "1",
    start: formData.headacheStart || "Not Specified",
    initialSeverity: getSeverityText(formData.headacheInitialSeverity),
    currentSeverity: getSeverityText(formData.headacheCurrentSeverity),
    resolveDays: formData.headacheResolveDays || "Not Specified",
    pastHistory: formData.headachePastHistory || ""
  };
}

function getSeverityText(severity: string | undefined): string {
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not Specified";
  }
}

function getTravelAnxietyData(formData: FormSchema) {
  // Convert symptom IDs to readable text
  const symptoms = (formData.travelAnxietySymptoms || []).map(symptom => {
    switch(symptom) {
      case "cautious-driver": return "Being a more cautious driver";
      case "frequent-mirror-checking": return "Looking in the mirror more frequently";
      case "avoid-accident-road": return "Avoiding the road where the accident happened";
      case "avoid-passenger": return "Avoiding being a passenger";
      case "avoid-driving": return "Avoiding driving";
      case "panic-attacks": return "Panic attacks when in a car";
      case "passenger-anxiety": return "Anxiety when traveling as a passenger";
      case "busy-road-anxiety": return "Anxiety on busy roads or highways";
      case "prevented-driving": return "Being prevented from driving for leisure or work";
      default: return symptom;
    }
  });

  return {
    hasAnxiety: formData.travelAnxiety === "1",
    symptoms: symptoms,
    currentlyDriving: formData.currentlyDriving || "Not Specified",
    initialSeverity: getSeverityText(formData.anxietyInitialSeverity),
    currentSeverity: getSeverityText(formData.anxietyCurrentSeverity),
    resolveDays: formData.anxietyResolveDays || "Not Specified",
    pastHistory: formData.anxietyPastHistory || "",
    duration: formData.anxietyDuration || "",
    hasHistory: formData.hasAnxietyHistory || "no"
  };
}

function getBruisingData(formData: FormSchema) {
  return {
    hasBruising: formData.hasBruising === "1",
    location: formData.bruisingLocation || "Not Specified",
    noticed: formData.bruisingNoticed || "Not Specified",
    initialSeverity: getSeverityText(formData.bruisingInitialSeverity),
    currentSeverity: getSeverityText(formData.bruisingCurrentSeverity),
    resolveDays: formData.bruisingResolveDays || "Not Specified"
  };
}

function getOtherInjuriesData(formData: FormSchema) {
  return {
    hasOtherInjury: formData.hasOtherInjury === "1",
    name: formData.injuryName || "Not Specified",
    start: formData.injuryStart || "Not Specified",
    initialSeverity: getSeverityText(formData.injuryInitialSeverity),
    currentSeverity: getSeverityText(formData.injuryCurrentSeverity),
    resolveDays: formData.injuryResolveDays || "Not Specified"
  };
}

function getTreatmentData(formData: FormSchema) {
  const treatmentTypes = [];
  if (formData.treatmentType) {
    if (typeof formData.treatmentType === 'string') {
      treatmentTypes.push(formData.treatmentType);
    } else if (Array.isArray(formData.treatmentType)) {
      treatmentTypes.push(...formData.treatmentType);
    }
  }

  return {
    hasTreatment: formData.hasTreatment === "1",
    type: treatmentTypes,
    frequency: formData.treatmentFrequency || "Not Specified",
    duration: formData.treatmentDuration || "Not Specified",
    ongoing: formData.ongoingTreatment === "1",
    // Add treatment questionnaire fields
    sceneOfAccidentTreatment: formData.sceneOfAccidentTreatment,
    sceneOfAccidentTreatmentTypes: formData.sceneOfAccidentTreatmentTypes,
    wentToAE: formData.wentToAE,
    hospitalName: formData.hospitalName,
    hospitalTreatment: formData.hospitalTreatment,
    wentToWalkInGP: formData.wentToWalkInGP,
    daysBeforeGPVisit: formData.daysBeforeGPVisit,
    currentTreatment: formData.currentTreatment,
    physiotherapySessions: formData.physiotherapySessions
  };
}

function getLifestyleData(formData: FormSchema) {
  // Process work restrictions array from string or array
  let workRestrictions: string[] = [];
  if (formData.workRestrictions) {
    if (typeof formData.workRestrictions === 'string') {
      workRestrictions.push(formData.workRestrictions);
    } else if (Array.isArray(formData.workRestrictions)) {
      workRestrictions = formData.workRestrictions;
    }
  }
  
  // Process sleep issues array from string or array
  let sleepIssues: string[] = [];
  if (formData.sleepIssues) {
    if (typeof formData.sleepIssues === 'string') {
      sleepIssues.push(formData.sleepIssues);
    } else if (Array.isArray(formData.sleepIssues)) {
      sleepIssues = formData.sleepIssues;
    }
  }
  
  // Process domestic issues array from string or array
  let domesticIssues: string[] = [];
  if (formData.domesticIssues) {
    if (typeof formData.domesticIssues === 'string') {
      domesticIssues.push(formData.domesticIssues);
    } else if (Array.isArray(formData.domesticIssues)) {
      domesticIssues = formData.domesticIssues;
    }
  }

  return {
    impactOnWork: formData.impactOnWork === "1",
    timeOffWork: formData.timeOffWork || "",
    workRestrictions: workRestrictions,
    workImpactDate: formData.workImpactDate || "",
    
    impactOnSleep: formData.impactOnSleep === "1",
    sleepIssues: sleepIssues,
    sleepImpactDate: formData.sleepImpactDate || "",
    
    impactOnDomestic: formData.impactOnDomestic === "1",
    domesticIssues: domesticIssues,
    domesticImpactDate: formData.domesticImpactDate || "",
    
    impactOnSports: formData.impactOnSports === "1",
    sportsActivities: formData.sportsActivities || "",
    sportsDuration: formData.sportsDuration || "",
    sportsImpactDate: formData.sportsImpactDate || "",
    
    impactOnSocial: formData.impactOnSocial === "1",
    socialDetails: formData.socialDetails || "",
    socialImpactDate: formData.socialImpactDate || ""
  };
}

function getMedicalHistoryData(formData: FormSchema) {
  return {
    exceptionalInjuries: formData.exceptionalInjuries === "1",
    exceptionalInjuriesDetails: formData.exceptionalInjuriesDetails || ""
  };
}

export type { ReportData } from "@/types/reportTypes";
