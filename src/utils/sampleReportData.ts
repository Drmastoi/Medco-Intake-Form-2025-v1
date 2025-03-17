
import { ReportData } from "@/types/reportTypes";

/**
 * Generates sample report data for testing PDF generation
 */
export function generateSampleReportData(): ReportData {
  return {
    prefilled: {
      solicitorName: "Johnson & Partners LLP",
      solicitorReference: "JP-2023-452",
      instructingPartyName: "Claims Direct",
      instructingPartyReference: "CD-8834-JD",
      examinationLocation: "123 Harley Street, London",
      medcoReference: "MED-2023-78945",
      dateOfExamination: "2023-10-15",
      dateOfReport: "2023-10-20",
      timeSpentWithClaimant: "30",
      accompaniedBy: "Spouse",
      expertName: "Dr. Awais Iqbal",
      expertSpecialty: "General Practice",
      expertTitle: "Consultant",
      gmcNumber: "6138189"
    },
    personal: {
      fullName: "James Smith",
      dateOfBirth: "1985-06-12",
      gender: "Male",
      address: "45 Oak Avenue, Manchester, M1 7BD",
      occupation: "Office Manager",
      workType: "Full Time",
      idType: "Driving License"
    },
    accident: {
      accidentDate: "2023-05-04",
      accidentTime: "Afternoon",
      vehiclePosition: "Stationary at traffic lights",
      vehicleStatus: "Stationary",
      vehicleLocation: "Main Road",
      impactLocation: "Rear",
      vehicleDamage: "Moderate Damage",
      claimantPosition: "Driver",
      claimantVehicle: "Car",
      otherVehicle: "Van",
      accidentSummary: "The claimant's vehicle was stationary at traffic lights when it was struck from behind by a van. The impact was of moderate force causing damage to the rear bumper and boot of the claimant's vehicle."
    },
    injuries: {
      neckPain: {
        hasInjury: true,
        painStart: "2023-05-04",
        initialSeverity: "Moderate",
        currentSeverity: "Mild",
        resolveDays: "",
        additionalInfo: "Pain radiates to the upper back occasionally",
        hadPrior: false
      },
      shoulderPain: {
        hasInjury: true,
        side: "right",
        painStart: "2023-05-04",
        initialSeverity: "Moderate",
        currentSeverity: "Resolved",
        resolveDays: "45"
      },
      backPain: {
        hasInjury: true,
        location: "Lower back",
        painStart: "2023-05-05",
        initialSeverity: "Severe",
        currentSeverity: "Moderate",
        resolveDays: ""
      },
      headache: {
        hasInjury: true,
        start: "2023-05-04",
        initialSeverity: "Mild",
        currentSeverity: "Resolved",
        resolveDays: "21",
        pastHistory: "Occasional tension headaches, approximately once per month"
      }
    },
    travelAnxiety: {
      hasAnxiety: true,
      initialSeverity: "Moderate",
      currentSeverity: "Mild",
      symptoms: [
        "Being a more cautious driver",
        "Looking in the mirror more frequently",
        "Avoiding the road where the accident happened",
        "Anxiety when traveling as a passenger"
      ],
      duration: "3 months",
      resolveDays: "",
      pastHistory: "No prior history of anxiety",
      hasHistory: "no",
      currentlyDriving: "yes"
    },
    other: {
      bruising: {
        hasBruising: true,
        location: "Chest (from seatbelt)",
        noticed: "Immediately after the accident",
        initialSeverity: "Moderate",
        currentSeverity: "Resolved",
        resolveDays: "14",
        hasVisibleScar: false
      },
      otherInjuries: {
        hasOtherInjury: true,
        name: "Jaw pain/TMJ dysfunction",
        start: "2023-05-04",
        initialSeverity: "Mild",
        currentSeverity: "Resolved",
        resolveDays: "30"
      },
      treatment: {
        hasTreatment: true,
        type: ["Pain medication", "Physiotherapy", "Heat/Ice"],
        frequency: "Physiotherapy once per week, pain medication as needed",
        duration: "6 weeks",
        ongoing: false,
        sceneOfAccidentTreatment: "0",
        wentToAE: "1",
        hospitalName: "Manchester Royal Infirmary",
        hospitalTreatment: ["X-rays", "Pain medication"],
        wentToWalkInGP: "1",
        daysBeforeGPVisit: "3",
        currentTreatment: "2",
        physiotherapySessions: "6"
      },
      lifestyle: {
        impactOnWork: true,
        timeOffWork: "14",
        workRestrictions: ["sitting for long periods", "lifting heavy objects"],
        workImpactDate: "2023-05-05",
        
        impactOnSleep: true,
        sleepIssues: ["difficulty falling asleep", "pain disturbs sleep"],
        sleepImpactDate: "2023-05-04",
        
        impactOnDomestic: true,
        domesticIssues: ["house cleaning", "grocery shopping", "gardening/yard work"],
        domesticImpactDate: "2023-05-05",
        
        impactOnSports: true,
        sportsActivities: "gym, cycling, tennis",
        sportsDuration: "8",
        sportsImpactDate: "2023-05-04",
        
        impactOnSocial: true,
        socialDetails: "Unable to attend social gatherings, family events, and dinner outings due to pain and discomfort",
        socialImpactDate: "2023-05-10"
      },
      medicalHistory: {
        exceptionalInjuries: false,
        exceptionalInjuriesDetails: ""
      }
    }
  };
}
