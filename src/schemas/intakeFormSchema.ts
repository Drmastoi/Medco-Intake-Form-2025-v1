
import { z } from "zod";

export const formSchema = z.object({
  // Section 1 - Prefilled Details
  solicitorName: z.string().optional(),
  solicitorReference: z.string().optional(),
  instructingPartyName: z.string().optional(),
  instructingPartyReference: z.string().optional(),
  examinationLocation: z.string().optional(),
  medcoReference: z.string().optional(),
  accompaniedBy: z.string().optional(),
  mobileNumber: z.string().optional(),
  emailId: z.string().optional(),
  dateOfExamination: z.string().optional(),
  dateOfReport: z.string().optional(),
  timeSpentWithClaimant: z.string().optional(),

  // Section 2 - Personal Information
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female"]).default("male"),
  idType: z.enum(["1", "2", "3"]).default("1"),
  address: z.string().optional(),
  occupation: z.string().optional(),
  workType: z.enum(["1", "2", "3", "4"]).default("1"),
  livingWith: z.enum(["1", "2", "3"]).default("1"),
  childrenCount: z.string().optional(),

  // Section 3 - Accident Information
  accidentDate: z.string().optional(),
  accidentTime: z.enum(["1", "2", "3", "4"]).default("1"),
  vehiclePosition: z.string().optional(),
  vehicleStatus: z.enum(["1", "2", "3", "4"]).optional(),
  vehicleLocation: z.enum(["1", "2", "3", "4", "5"]).optional(),
  impactLocation: z.enum(["1", "2", "3", "4"]).optional(),
  vehicleDamage: z.enum(["1", "2", "3"]).optional(),
  claimantPosition: z.enum(["1", "2", "3", "4"]).optional(),
  claimantVehicle: z.enum(["1", "2", "3", "4"]).optional(),
  otherVehicle: z.enum(["1", "2", "3", "4"]).optional(),
  accidentSummary: z.string().optional(),

  // Section 4 - Neck Pain
  neckPain: z.enum(["1", "2"]).default("2"),
  neckPainStart: z.enum(["1", "2", "3"]).optional(),
  neckPainInitialSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  neckPainCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  neckPainResolveDays: z.string().optional(),
  additionalInfo: z.string().optional(),
  hadPriorNeckPain: z.enum(["1", "2"]).optional(),
  accidentNeckPainPercentage: z.string().optional(),
  priorNeckPainPercentage: z.string().optional(),

  // Section 5 - Shoulder Pain
  shoulderPain: z.enum(["1", "2"]).default("2"),
  shoulderSide: z.enum(["1", "2", "3"]).optional(),
  shoulderPainStart: z.enum(["1", "2", "3"]).optional(),
  shoulderPainInitialSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  shoulderPainCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  shoulderPainResolveDays: z.string().optional(),

  // Section 6 - Back Pain
  backPain: z.enum(["1", "2"]).default("2"),
  backLocation: z.enum(["1", "2", "3"]).optional(),
  backPainStart: z.enum(["1", "2", "3"]).optional(),
  backPainInitialSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  backPainCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  backPainResolveDays: z.string().optional(),

  // Section 7 - Headache
  headache: z.enum(["1", "2"]).default("2"),
  headacheStart: z.enum(["1", "2", "3"]).optional(),
  headacheInitialSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  headacheCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  headacheResolveDays: z.string().optional(),
  headachePastHistory: z.string().optional(),

  // Section 8 - Travel Anxiety
  travelAnxiety: z.enum(["1", "2"]).default("2"),
  travelAnxietySymptoms: z.string().array().optional(),
  otherTravelAnxietySymptom: z.string().optional(),
  currentlyDriving: z.enum(["1", "2", "3"]).optional(),
  anxietyInitialSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  anxietyCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  anxietyResolveDays: z.string().optional(),
  anxietyPastHistory: z.string().optional(),
  anxietyDuration: z.string().optional(),
  hasAnxietyHistory: z.enum(["yes", "no"]).optional(),

  // Section 9 - Bruising
  hasBruising: z.enum(["1", "2"]).default("2"),
  bruisingLocation: z.string().optional(),
  bruisingNoticed: z.enum(["1", "2", "3"]).optional(),
  bruisingInitialSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  bruisingCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  bruisingResolveDays: z.string().optional(),
  hasVisibleScar: z.enum(["1", "2"]).optional(),

  // Section 10 - Other Injuries
  hasOtherInjury: z.enum(["1", "2"]).default("2"),
  injuryName: z.string().optional(),
  injuryStart: z.string().optional(),
  injuryInitialSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  injuryCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  injuryResolveDays: z.string().optional(),

  // Section 11 - Treatment
  hasTreatment: z.enum(["1", "2"]).default("2"),
  treatmentType: z.string().array().optional(),
  treatmentFrequency: z.string().optional(),
  treatmentDuration: z.string().optional(),
  ongoingTreatment: z.enum(["1", "2"]).optional(),
  // Treatment questionnaire fields
  sceneOfAccidentTreatment: z.string().optional(),
  sceneOfAccidentTreatmentTypes: z.string().array().optional(),
  wentToAE: z.string().optional(),
  hospitalName: z.string().optional(),
  hospitalTreatment: z.string().array().optional(),
  wentToWalkInGP: z.string().optional(),
  daysBeforeGPVisit: z.string().optional(),
  currentTreatment: z.string().optional(),
  physiotherapySessions: z.string().optional(),

  // Section 12 - Impact on Lifestyle
  impactOnWork: z.enum(["1", "2"]).default("2"),
  timeOffWork: z.string().optional(),
  workRestrictions: z.string().array().optional(),
  workImpactDate: z.string().optional(),
  
  impactOnSleep: z.enum(["1", "2"]).default("2"),
  sleepIssues: z.string().array().optional(),
  sleepImpactDate: z.string().optional(),
  
  impactOnDomestic: z.enum(["1", "2"]).default("2"),
  domesticIssues: z.string().array().optional(),
  domesticImpactDate: z.string().optional(),
  
  impactOnSports: z.enum(["1", "2"]).default("2"),
  sportsActivities: z.string().optional(),
  sportsDuration: z.string().optional(),
  sportsImpactDate: z.string().optional(),
  
  impactOnSocial: z.enum(["1", "2"]).default("2"),
  socialDetails: z.string().optional(),
  socialImpactDate: z.string().optional(),
  
  // Section 11 - New Daily Life Impact Fields
  daysOffWork: z.string().optional(),
  daysLightDuties: z.string().optional(),
  workDifficulties: z.string().array().optional(),
  otherWorkDifficulties: z.string().optional(),
  
  sleepDisturbance: z.enum(["1", "2"]).optional(),
  sleepDisturbances: z.string().array().optional(),
  otherSleepDisturbances: z.string().optional(),
  
  effectOnDomesticLiving: z.enum(["1", "2"]).optional(),
  domesticEffects: z.string().array().optional(),
  otherDomesticEffects: z.string().optional(),
  
  effectOnSportLeisure: z.enum(["1", "2"]).optional(),
  sportLeisureEffects: z.string().array().optional(),
  otherSportLeisureEffects: z.string().optional(),
  
  effectOnSocialLife: z.enum(["1", "2"]).optional(),
  socialLifeEffects: z.string().array().optional(),
  otherSocialLifeEffects: z.string().optional(),

  // Section 13 - Previous Medical History
  exceptionalInjuries: z.enum(["1", "2"]).default("2"),
  exceptionalInjuriesDetails: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
