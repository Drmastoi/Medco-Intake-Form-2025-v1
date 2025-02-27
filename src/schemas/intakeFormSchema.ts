import * as z from "zod";

export const formSchema = z.object({
  // Pre-filled fields (sender details)
  solicitorName: z.string().optional().default(""),
  solicitorReference: z.string().optional().default(""),
  instructingPartyName: z.string().optional().default(""),
  instructingPartyReference: z.string().optional().default(""),
  examinationLocation: z.string().optional().default(""),
  medcoReference: z.string().optional().default(""),
  accompaniedBy: z.string().optional().default(""),
  mobileNumber: z.string().optional().default(""),
  emailId: z.string().email().optional().default(""),
  
  // Existing fields
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string(),
  idType: z.enum(["1", "2", "3", "4"]),
  address: z.string().optional().default(""),
  occupation: z.string().optional().default(""),
  workType: z.enum(["1", "2", "3"]).optional().default("1"),
  livingWith: z.enum(["1", "2", "3", "4", "5", "6"]).optional().default("1"),
  childrenCount: z.string().optional().default("0"),
  
  // Section 2 - Accident Information
  accidentDate: z.string().optional().default(""),
  accidentTime: z.enum(["1", "2", "3", "4"]).optional().default("1"),
  vehiclePosition: z.enum(["1", "2", "3", "4"]).optional().default("1"),
  
  // Section 3 - Medical Information
  neckPain: z.enum(["1", "2"]).optional().default("1"),
  additionalInfo: z.string().optional().default(""),
  
  // Section 4 - Shoulder Pain Information
  shoulderPain: z.enum(["1", "2"]).optional().default("1"),
  shoulderSide: z.enum(["1", "2", "3"]).optional().default("1"),
  shoulderPainStart: z.enum(["1", "2", "3"]).optional().default("1"),
  shoulderPainInitialSeverity: z.enum(["1", "2", "3"]).optional().default("1"),
  shoulderPainCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional().default("1"),
  shoulderPainResolveDays: z.string().optional().default(""),

  // Section 5 - Back Pain Information
  backPain: z.enum(["1", "2"]).optional().default("1"),
  backLocation: z.enum(["1", "2", "3", "4"]).optional().default("1"),
  backPainStart: z.enum(["1", "2", "3"]).optional().default("1"),
  backPainInitialSeverity: z.enum(["1", "2", "3"]).optional().default("1"),
  backPainCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional().default("1"),
  backPainResolveDays: z.string().optional().default(""),

  // Section 6 - Headache Information
  headache: z.enum(["1", "2"]).optional().default("1"),
  headacheStart: z.enum(["1", "2", "3"]).optional().default("1"),
  headacheInitialSeverity: z.enum(["1", "2", "3"]).optional().default("1"),
  headacheCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional().default("1"),
  headacheResolveDays: z.string().optional().default(""),
  headachePastHistory: z.string().optional().default(""),
  
  // Add other sections as needed
  travelAnxiety: z.enum(["1", "2"]).optional().default("1"),
  anxietyInitialSeverity: z.enum(["1", "2", "3"]).optional().default("1"),
  anxietyCurrentSeverity: z.enum(["1", "2", "3", "4"]).optional().default("1"),
  anxietyResolveDays: z.string().optional().default(""),
  
  effectOnDomesticLiving: z.enum(["1", "2"]).optional().default("1"),
  domesticEffects: z.array(z.string()).optional().default([]),
  otherDomesticEffects: z.string().optional().default(""),
  
  sleepDisturbance: z.enum(["1", "2"]).optional().default("1"),
  sleepDisturbances: z.array(z.string()).optional().default([]),
  otherSleepDisturbances: z.string().optional().default(""),
  
  daysOffWork: z.number().optional().default(0),
  daysLightDuties: z.number().optional().default(0),
  workDifficulties: z.array(z.string()).optional().default([]),
  otherWorkDifficulties: z.string().optional().default(""),
  
  additionalInformation: z.enum(["1", "2"]).optional().default("1"),
  additionalInformationDetails: z.string().optional().default(""),
});

export type FormSchema = z.infer<typeof formSchema>;
