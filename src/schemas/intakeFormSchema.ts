
import * as z from "zod";

export const formSchema = z.object({
  // Pre-filled fields (sender details)
  solicitorName: z.string(),
  solicitorReference: z.string(),
  instructingPartyName: z.string(),
  instructingPartyReference: z.string(),
  examinationLocation: z.string(),
  dateOfExamination: z.string(),
  dateOfReport: z.string(),
  medcoReference: z.string(),
  accompaniedBy: z.string(),
  mobileNumber: z.string(),
  emailId: z.string().email(),
  timeSpentWithClaimant: z.string().default("15"),
  
  // Personal Information fields
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string(),
  gender: z.string().optional(),
  idType: z.enum(["1", "2", "3", "4"]),
  address: z.string(),
  occupation: z.string(),
  workType: z.enum(["1", "2"]),
  livingWith: z.enum(["1", "2", "3", "4", "5", "6"]),
  childrenCount: z.string(),
  
  // Section 2 - Accident Information
  accidentDate: z.string(),
  accidentTime: z.enum(["1", "2", "3", "4"]),
  vehiclePosition: z.enum(["1", "2", "3"]),
  impactLocation: z.enum(["1", "2", "3", "4"]).default("1"),
  vehicleDamage: z.enum(["1", "2", "3"]).default("1"),
  claimantPosition: z.enum(["1", "2", "3", "4"]).default("1"),
  claimantVehicle: z.enum(["1", "2", "3", "4"]).default("1"),
  otherVehicle: z.enum(["1", "2", "3", "4"]).default("1"),
  vehicleStatus: z.enum(["1", "2", "3", "4"]).default("1"),
  vehicleLocation: z.enum(["1", "2", "3", "4", "5"]).default("1"),
  
  // Section 3 - Medical Information
  neckPain: z.enum(["1", "2"]).default("2"),
  neckPainStart: z.enum(["1", "2", "3"]).default("1"),
  neckPainInitialSeverity: z.enum(["1", "2", "3"]).default("1"),
  neckPainCurrentSeverity: z.enum(["1", "2", "3", "4"]).default("1"),
  neckPainResolveDays: z.string().optional(),
  additionalInfo: z.string().optional(),
  hadPriorNeckPain: z.enum(["1", "2"]).default("2"), // "1" for Yes, "2" for No
  accidentNeckPainPercentage: z.string().optional(), // Percentage due to current accident
  priorNeckPainPercentage: z.string().optional(), // Percentage due to previous condition
  
  // Section 4 - Shoulder Pain Information
  shoulderPain: z.enum(["1", "2"]).default("2"),
  shoulderSide: z.enum(["1", "2", "3"]),
  shoulderPainStart: z.enum(["1", "2", "3"]),
  shoulderPainInitialSeverity: z.enum(["1", "2", "3"]),
  shoulderPainCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  shoulderPainResolveDays: z.string().optional(),
  hadPriorShoulderPain: z.enum(["1", "2"]).default("2"), // "1" for Yes, "2" for No
  accidentShoulderPainPercentage: z.string().optional(), // Percentage due to current accident
  priorShoulderPainPercentage: z.string().optional(), // Percentage due to previous condition

  // Section 5 - Back Pain Information
  backPain: z.enum(["1", "2"]).default("2"),
  backLocation: z.enum(["1", "2", "3", "4"]),
  backPainStart: z.enum(["1", "2", "3"]),
  backPainInitialSeverity: z.enum(["1", "2", "3"]),
  backPainCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  backPainResolveDays: z.string().optional(),

  // Section 6 - Headache Information
  headache: z.enum(["1", "2"]).default("2"),
  headacheStart: z.enum(["1", "2", "3"]),
  headacheInitialSeverity: z.enum(["1", "2", "3"]),
  headacheCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  headacheResolveDays: z.string().optional(),
  headachePastHistory: z.string().optional(),
  
  // Section 7 - Travel Anxiety Information
  travelAnxiety: z.enum(["1", "2"]).default("2"),
  travelAnxietySymptoms: z.array(z.string()).optional(),
  otherTravelAnxietySymptom: z.string().optional(),
  currentlyDriving: z.enum(["1", "2"]).optional(),
  anxietyInitialSeverity: z.enum(["1", "2", "3"]).optional(),
  anxietyCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  anxietyResolveDays: z.string().optional(),
  anxietyPastHistory: z.string().optional(),
  anxietyDuration: z.string().optional(),
  hasAnxietyHistory: z.enum(["yes", "no"]).optional(),
  
  // Section 8 - Bruising Information
  hasBruising: z.enum(["1", "2"]).default("2"),
  bruisingLocation: z.string().optional(),
  bruisingInitialSeverity: z.enum(["1", "2", "3"]).optional(),
  bruisingCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  bruisingResolveDays: z.string().optional(),
  
  // Section 9 - Other Injuries Information
  hasOtherInjury: z.enum(["1", "2"]).default("2"),
  injuryName: z.string().optional(),
  injuryDescription: z.string().optional(),
  injuryInitialSeverity: z.enum(["1", "2", "3"]).optional(),
  injuryCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  injuryResolveDays: z.string().optional(),
  
  // Section 10 - Treatment Information
  hasTreatment: z.enum(["1", "2"]).default("2"),
  treatmentType: z.array(z.string()).optional(),
  otherTreatmentType: z.string().optional(),
  treatmentFrequency: z.string().optional(),
  treatmentDuration: z.string().optional(),
  ongoingTreatment: z.enum(["1", "2"]).optional(),
  
  // Section 11 - Lifestyle Impact
  impactOnWork: z.enum(["1", "2"]).default("2"),
  timeOffWork: z.string().optional(),
  workRestrictions: z.array(z.string()).optional(),
  impactOnSleep: z.enum(["1", "2"]).default("2"),
  sleepIssues: z.array(z.string()).optional(),
  impactOnDomestic: z.enum(["1", "2"]).default("2"),
  domesticIssues: z.array(z.string()).optional(),
  impactOnSports: z.enum(["1", "2"]).default("2"),
  sportsActivities: z.string().optional(),
  sportsDuration: z.string().optional(),
  impactOnSocial: z.enum(["1", "2"]).default("2"),
  socialDetails: z.string().optional(),
  
  // Section 12 - Previous Medical History
  previousAccident: z.enum(["1", "2"]).default("2"),
  previousAccidentDate: z.string().optional(),
  previousAccidentRecovery: z.enum(["1", "2"]).optional(),
  previousInjuriesWorse: z.enum(["1", "2"]).optional(),
  previousConditionWorse: z.string().optional(),
  additionalInformation: z.enum(["1", "2"]).default("2"),
  additionalInformationDetails: z.string().optional(),
  
  // New fields for Section 12 - Previous Medical History
  exceptionalInjuries: z.enum(["1", "2"]).default("2"), // "1" for Yes, "2" for No
  exceptionalInjuriesDetails: z.string().optional(),
  
  // New fields for Section 7-11 dynamic text (these are derived values, not directly input)
  dizziness: z.enum(["1", "2"]).default("2"),
  dizzinessCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional(),
  dizzinessResolveDays: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
