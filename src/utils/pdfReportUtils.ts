import { FormSchema } from "@/schemas/intakeFormSchema";
import { ReportData } from "@/types/reportTypes";

/**
 * Converts form data to the format required for PDF report generation
 */
export function convertFormDataToReportData(formData: FormSchema): ReportData {
  // Process form data for lifestyle impact - ensuring we capture both old and new UI fields
  const lifestyle = getLifestyleData(formData);
  
  console.log("convertFormDataToReportData - processed lifestyle data:", JSON.stringify(lifestyle, null, 2));

  // Combine all sections into the final report data structure
  return {
    prefilled: {
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
    },
    personal: {
      fullName: formData.fullName || "Not Specified",
      dateOfBirth: formData.dateOfBirth || "Not Specified",
      gender: formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Not Specified",
      address: formData.address || "Not Specified",
      occupation: formData.occupation || "Not Specified",
      workType: getWorkTypeText(formData.workType),
      idType: formData.idType,
    },
    accident: {
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
    },
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
      lifestyle: lifestyle,
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
  console.log("Processing lifestyle data from form:", 
    JSON.stringify({
      impactOnWork: formData.impactOnWork,
      effectOnDomesticLiving: formData.effectOnDomesticLiving,
      sleepDisturbance: formData.sleepDisturbance,
      effectOnSportLeisure: formData.effectOnSportLeisure,
      effectOnSocialLife: formData.effectOnSocialLife,
      workDifficulties: formData.workDifficulties
    }, null, 2));

  // Process work restrictions from the new UI
  let workRestrictions: string[] = [];
  if (formData.workDifficulties && Array.isArray(formData.workDifficulties)) {
    workRestrictions = formData.workDifficulties.map(id => {
      switch (id) {
        case "sitting": return "sitting for long periods";
        case "standing": return "standing for long periods";
        case "lifting": return "lifting heavy objects";
        case "bending": return "bending or twisting";
        case "typing": return "typing/computer work";
        case "concentration": return "concentration";
        case "driving": return "driving";
        default: return id;
      }
    });
    
    // Add "other" description if present
    if (formData.workDifficulties.includes("other") && formData.otherWorkDifficulties) {
      workRestrictions.push(formData.otherWorkDifficulties);
    }
  }
  
  // If we have regular workRestrictions array from the form, use those as fallback
  if (!workRestrictions.length && formData.workRestrictions && Array.isArray(formData.workRestrictions)) {
    workRestrictions = formData.workRestrictions;
  }
  
  // Process sleep issues from the new UI
  let sleepIssues: string[] = [];
  if (formData.sleepDisturbances && Array.isArray(formData.sleepDisturbances)) {
    sleepIssues = formData.sleepDisturbances.map(id => {
      switch (id) {
        case "fallingAsleep": return "difficulty falling asleep";
        case "stayingAsleep": return "difficulty staying asleep";
        case "earlyWaking": return "early morning waking";
        case "nightmares": return "nightmares";
        case "painDisturbs": return "pain disturbs sleep";
        case "restlessness": return "restlessness";
        default: return id;
      }
    });
    
    // Add "other" description if present
    if (formData.sleepDisturbances.includes("other") && formData.otherSleepDisturbances) {
      sleepIssues.push(formData.otherSleepDisturbances);
    }
  }
  
  // If we have regular sleepIssues array from the form, use those as fallback
  if (!sleepIssues.length && formData.sleepIssues && Array.isArray(formData.sleepIssues)) {
    sleepIssues = formData.sleepIssues;
  }
  
  // Process domestic issues from the new UI
  let domesticIssues: string[] = [];
  if (formData.domesticEffects && Array.isArray(formData.domesticEffects)) {
    domesticIssues = formData.domesticEffects.map(id => {
      switch (id) {
        case "cleaning": return "house cleaning";
        case "cooking": return "cooking meals";
        case "laundry": return "doing laundry";
        case "shopping": return "grocery shopping";
        case "childcare": return "childcare duties";
        case "gardening": return "gardening/yard work";
        case "petCare": return "pet care";
        default: return id;
      }
    });
    
    // Add "other" description if present
    if (formData.domesticEffects.includes("other") && formData.otherDomesticEffects) {
      domesticIssues.push(formData.otherDomesticEffects);
    }
  }
  
  // If we have regular domesticIssues array from the form, use those as fallback
  if (!domesticIssues.length && formData.domesticIssues && Array.isArray(formData.domesticIssues)) {
    domesticIssues = formData.domesticIssues;
  }
  
  // Process social life details from the new UI
  let socialLifeDetails = formData.socialDetails || "";
  if (formData.socialLifeEffects && Array.isArray(formData.socialLifeEffects)) {
    const socialLifeIssues = formData.socialLifeEffects.map(id => {
      switch (id) {
        case "meetingFriends": return "meeting friends";
        case "familyGatherings": return "family gatherings";
        case "dining": return "dining out";
        case "parties": return "attending parties";
        case "concerts": return "concerts/events";
        case "traveling": return "traveling";
        case "hobbies": return "group hobbies";
        default: return id;
      }
    });
    
    if (socialLifeIssues.length > 0) {
      socialLifeDetails = socialLifeIssues.join(", ");
      
      // Add "other" description if present
      if (formData.socialLifeEffects.includes("other") && formData.otherSocialLifeEffects) {
        socialLifeDetails += ", " + formData.otherSocialLifeEffects;
      }
    }
  }
  
  // Process sports activities from the new UI
  let sportsActivities = formData.sportsActivities || "";
  if (formData.sportLeisureEffects && Array.isArray(formData.sportLeisureEffects)) {
    const sportLeisureIssues = formData.sportLeisureEffects.map(id => {
      switch (id) {
        case "gym": return "going to the gym";
        case "running": return "running/jogging";
        case "swimming": return "swimming";
        case "cycling": return "cycling";
        case "teamSports": return "team sports";
        case "hiking": return "hiking";
        case "yoga": return "yoga/stretching";
        default: return id;
      }
    });
    
    if (sportLeisureIssues.length > 0) {
      sportsActivities = sportLeisureIssues.join(", ");
      
      // Add "other" description if present
      if (formData.sportLeisureEffects.includes("other") && formData.otherSportLeisureEffects) {
        sportsActivities += ", " + formData.otherSportLeisureEffects;
      }
    }
  }

  // Convert values to proper boolean format
  // Use new UI fields first with fallback to old UI fields
  const impactOnWork = formData.effectOnDomesticLiving === "1" || formData.impactOnWork === "1" || false;
  const impactOnSleep = formData.sleepDisturbance === "1" || formData.impactOnSleep === "1" || false;
  const impactOnDomestic = formData.effectOnDomesticLiving === "1" || formData.impactOnDomestic === "1" || false;
  const impactOnSports = formData.effectOnSportLeisure === "1" || formData.impactOnSports === "1" || false;
  const impactOnSocial = formData.effectOnSocialLife === "1" || formData.impactOnSocial === "1" || false;

  // Time off work from either field
  const timeOffWork = formData.daysOffWork || formData.timeOffWork || "Not Specified";

  const result = {
    impactOnWork,
    timeOffWork,
    workRestrictions,
    workImpactDate: formData.workImpactDate || "",
    
    impactOnSleep,
    sleepIssues,
    sleepImpactDate: formData.sleepImpactDate || "",
    
    impactOnDomestic,
    domesticIssues,
    domesticImpactDate: formData.domesticImpactDate || "",
    
    impactOnSports,
    sportsActivities,
    sportsDuration: formData.sportsDuration || "",
    sportsImpactDate: formData.sportsImpactDate || "",
    
    impactOnSocial,
    socialDetails: socialLifeDetails,
    socialImpactDate: formData.socialImpactDate || ""
  };
  
  console.log("Final lifestyle data result:", JSON.stringify(result, null, 2));
  
  return result;
}

function getMedicalHistoryData(formData: FormSchema) {
  return {
    exceptionalInjuries: formData.exceptionalInjuries === "1",
    exceptionalInjuriesDetails: formData.exceptionalInjuriesDetails || ""
  };
}

export type { ReportData } from "@/types/reportTypes";
