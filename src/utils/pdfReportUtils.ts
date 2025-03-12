
import { FormSchema } from "@/schemas/intakeFormSchema";

export interface ReportData {
  prefilled: {
    solicitorName: string;
    solicitorReference: string;
    instructingPartyName: string;
    instructingPartyReference: string;
    examinationLocation: string;
    medcoReference: string;
    dateOfExamination: string;
    dateOfReport: string;
    timeSpentWithClaimant: string;
  };
  personal: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    occupation: string;
    workType: string;
  };
  accident: {
    accidentDate: string;
    accidentTime: string;
    vehiclePosition: string;
    vehicleStatus?: string;
    vehicleLocation?: string;
    impactLocation?: string;
    vehicleDamage?: string;
    claimantPosition?: string;
    claimantVehicle?: string;
    otherVehicle?: string;
  };
  injuries: {
    neckPain: {
      hasInjury: boolean;
      painStart: string;
      initialSeverity: string;
      currentSeverity: string;
      resolveDays: string;
      additionalInfo: string;
      hadPrior: boolean;
    };
    shoulderPain: {
      hasInjury: boolean;
      side: string;
      painStart: string;
      initialSeverity: string;
      currentSeverity: string;
      resolveDays: string;
    };
    backPain: {
      hasInjury: boolean;
      location: string;
      painStart: string;
      initialSeverity: string;
      currentSeverity: string;
      resolveDays: string;
    };
    headache: {
      hasInjury: boolean;
      start: string;
      initialSeverity: string;
      currentSeverity: string;
      resolveDays: string;
      pastHistory: string;
    };
  };
  travelAnxiety: {
    hasAnxiety: boolean;
    symptoms: string[];
    currentlyDriving: string;
    initialSeverity: string;
    currentSeverity: string;
    resolveDays: string;
    pastHistory: string;
    duration: string;
    hasHistory: string;
  };
  other: {
    bruising: {
      hasBruising: boolean;
      location?: string;
      noticed?: string;
      initialSeverity?: string;
      currentSeverity?: string;
      resolveDays?: string;
      hasVisibleScar?: boolean;
    };
    otherInjuries: {
      hasOtherInjury: boolean;
      name?: string;
      start?: string;
      initialSeverity?: string;
      currentSeverity?: string;
      resolveDays?: string;
    };
    treatment: {
      hasTreatment: boolean;
      type?: string[];
      frequency?: string;
      duration?: string;
      ongoing?: boolean;
    };
    lifestyle: {
      impactOnWork: boolean;
      timeOffWork?: string;
      workRestrictions?: string[];
      impactOnSleep: boolean;
      sleepIssues?: string[];
      impactOnDomestic: boolean;
      domesticIssues?: string[];
      impactOnSports: boolean;
      sportsActivities?: string;
      sportsDuration?: string;
      impactOnSocial: boolean;
      socialDetails?: string;
    };
    medicalHistory: {
      exceptionalInjuries: boolean;
      exceptionalInjuriesDetails: string;
    };
  };
}

export function convertFormDataToReportData(formData: FormSchema): ReportData {
  const getSeverityText = (severity: string): string => {
    switch(severity) {
      case "1": return "Mild";
      case "2": return "Moderate";
      case "3": return "Severe";
      default: return "Unknown";
    }
  };

  const getTimeOfDayText = (time: string): string => {
    switch(time) {
      case "1": return "Morning";
      case "2": return "Afternoon";
      case "3": return "Evening";
      case "4": return "Night";
      default: return "Unknown";
    }
  };

  const getYesNo = (value: string): boolean => {
    return value === "1";
  };

  return {
    prefilled: {
      solicitorName: formData.solicitorName || "Not specified",
      solicitorReference: formData.solicitorReference || "Not specified",
      instructingPartyName: formData.instructingPartyName || "Not specified",
      instructingPartyReference: formData.instructingPartyReference || "Not specified",
      examinationLocation: formData.examinationLocation || "Not specified",
      medcoReference: formData.medcoReference || "Not specified",
      dateOfExamination: formData.dateOfExamination || "Not specified",
      dateOfReport: formData.dateOfReport || "Not specified",
      timeSpentWithClaimant: formData.timeSpentWithClaimant || "Not specified",
    },
    personal: {
      fullName: formData.fullName || "Not specified",
      dateOfBirth: formData.dateOfBirth || "Not specified",
      gender: formData.gender === "male" ? "Male" : "Female",
      address: formData.address || "Not specified",
      occupation: formData.occupation || "Not specified",
      workType: formData.workType || "Not specified",
    },
    accident: {
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
    },
    injuries: {
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
    },
    travelAnxiety: {
      hasAnxiety: formData.travelAnxiety === "1",
      symptoms: formData.travelAnxietySymptoms || [],
      currentlyDriving: formData.currentlyDriving || "Not specified",
      initialSeverity: getSeverityText(formData.anxietyInitialSeverity),
      currentSeverity: getSeverityText(formData.anxietyCurrentSeverity),
      resolveDays: formData.anxietyResolveDays || "Not specified",
      pastHistory: formData.anxietyPastHistory || "None",
      duration: formData.anxietyDuration || "Not specified",
      hasHistory: formData.hasAnxietyHistory || "No",
    },
    other: {
      bruising: {
        hasBruising: formData.hasBruising === "1",
        location: formData.bruisingLocation,
        noticed: formData.bruisingNoticed,
        initialSeverity: getSeverityText(formData.bruisingInitialSeverity),
        currentSeverity: getSeverityText(formData.bruisingCurrentSeverity),
        resolveDays: formData.bruisingResolveDays,
        hasVisibleScar: formData.hasVisibleScar === "1"
      },
      otherInjuries: {
        hasOtherInjury: formData.hasOtherInjury === "1",
        name: formData.injuryName,
        start: formData.injuryStart,
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
    },
  };
}
