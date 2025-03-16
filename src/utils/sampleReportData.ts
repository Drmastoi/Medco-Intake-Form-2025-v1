
import { ReportData } from '@/types/reportTypes';

/**
 * Generates sample report data for preview and testing
 */
export function generateSampleReportData(): ReportData {
  return {
    prefilled: {
      solicitorName: "Jane Smith",
      solicitorReference: "REF12345",
      instructingPartyName: "Smith & Associates",
      instructingPartyReference: "INST-5678",
      examinationLocation: "123 Medical Center, London",
      medcoReference: "MED-9876-543",
      dateOfExamination: "2025-03-15",
      dateOfReport: "2025-03-16",
      timeSpentWithClaimant: "30",
      accompaniedBy: "Unaccompanied",
      expertName: "Dr. Sam Jones",
      expertSpecialty: "General Practice",
      expertTitle: "Consultant",
      gmcNumber: "1234567"
    },
    personal: {
      fullName: "John Doe",
      dateOfBirth: "1985-06-12",
      gender: "Male",
      address: "456 Sample Street, London, SW1A 1AA",
      occupation: "Software Developer",
      workType: "Full Time",
      idType: "Driving License"
    },
    accident: {
      accidentDate: "2025-01-20",
      accidentTime: "Morning",
      vehiclePosition: "Driver",
      vehicleStatus: "Stationary",
      vehicleLocation: "Main Road",
      impactLocation: "Rear",
      vehicleDamage: "Moderate Damage",
      claimantPosition: "Driver",
      claimantVehicle: "Car",
      otherVehicle: "Car",
      accidentSummary: "The claimant's vehicle was stationary at traffic lights when it was struck from behind by another vehicle."
    },
    injuries: {
      neckPain: {
        hasInjury: true,
        painStart: "Immediately after the accident",
        initialSeverity: "Moderate",
        currentSeverity: "Mild",
        resolveDays: "90",
        additionalInfo: "Pain radiates to shoulders occasionally",
        hadPrior: false
      },
      shoulderPain: {
        hasInjury: true,
        side: "left",
        painStart: "Day after the accident",
        initialSeverity: "Mild",
        currentSeverity: "Mild",
        resolveDays: "60"
      },
      backPain: {
        hasInjury: false,
        location: "Not Specified",
        painStart: "Not Specified",
        initialSeverity: "Not Specified",
        currentSeverity: "Not Specified"
      },
      headache: {
        hasInjury: true,
        start: "2 days after the accident",
        initialSeverity: "Moderate",
        currentSeverity: "Mild",
        resolveDays: "45",
        pastHistory: "Occasional tension headaches before the accident"
      }
    },
    travelAnxiety: {
      hasAnxiety: true,
      initialSeverity: "Moderate",
      currentSeverity: "Mild",
      symptoms: [
        "Being a more cautious driver",
        "Looking in the mirror more frequently",
        "Anxiety when traveling as a passenger"
      ],
      duration: "About 8 weeks",
      resolveDays: "60",
      pastHistory: "No history of anxiety before the accident",
      hasHistory: "no",
      currentlyDriving: "Yes, but more cautiously"
    },
    other: {
      bruising: {
        hasBruising: true,
        location: "Chest (from seatbelt)",
        noticed: "Immediately after accident",
        initialSeverity: "Moderate",
        currentSeverity: "Resolved",
        resolveDays: "14"
      },
      otherInjuries: {
        hasOtherInjury: false
      },
      treatment: {
        hasTreatment: true,
        type: ["over-the-counter", "physiotherapy"],
        frequency: "Twice weekly physiotherapy",
        duration: "6 weeks",
        ongoing: false
      },
      lifestyle: {
        impactOnWork: true,
        timeOffWork: "5",
        workRestrictions: ["typing/computer work", "sitting for long periods"],
        workImpactDate: "2025-01-21",
        
        impactOnSleep: true,
        sleepIssues: ["difficulty falling asleep", "pain disturbs sleep"],
        sleepImpactDate: "2025-01-20",
        
        impactOnDomestic: true,
        domesticIssues: ["house cleaning", "grocery shopping"],
        domesticImpactDate: "2025-01-20",
        
        impactOnSports: true,
        sportsActivities: "gym, swimming, cycling",
        sportsDuration: "8 weeks",
        sportsImpactDate: "2025-01-20",
        
        impactOnSocial: false,
        socialDetails: "",
        socialImpactDate: ""
      },
      medicalHistory: {
        exceptionalInjuries: false,
        exceptionalInjuriesDetails: ""
      }
    },
    meta: {
      reportType: "expert",
      referenceNumber: "SAMPLE-12345",
      submissionDate: new Date().toISOString().split('T')[0],
      status: "draft"
    }
  };
}
