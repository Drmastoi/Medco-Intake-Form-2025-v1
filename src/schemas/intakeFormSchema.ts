import * as z from "zod";

export const formSchema = z.object({
  // Pre-filled fields (sender details)
  solicitorName: z.string(),
  solicitorReference: z.string(),
  instructingPartyName: z.string(),
  instructingPartyReference: z.string(),
  examinationLocation: z.string(),
  medcoReference: z.string(),
  accompaniedBy: z.string(),
  mobileNumber: z.string(),
  emailId: z.string().email(),
  
  // Existing fields
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string(),
  idType: z.enum(["1", "2", "3"]),
  address: z.string(),
  occupation: z.string(),
  workType: z.enum(["1", "2"]),
  livingWith: z.enum(["1", "2", "3", "4", "5", "6"]),
  childrenCount: z.string(),
  
  // Section 2 - Accident Information
  accidentDate: z.string(),
  accidentTime: z.enum(["1", "2", "3", "4"]),
  vehiclePosition: z.enum(["1", "2", "3"]),
  
  // Section 3 - Medical Information
  neckPain: z.enum(["1", "2"]),
  additionalInfo: z.string().optional(),
  
  // Section 4 - Shoulder Pain Information
  shoulderPain: z.enum(["1", "2"]),
  shoulderSide: z.enum(["1", "2", "3"]),
  shoulderPainStart: z.enum(["1", "2", "3"]),
  shoulderPainInitialSeverity: z.enum(["1", "2", "3"]),
  shoulderPainCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  shoulderPainResolveDays: z.string().optional(),

  // Section 5 - Back Pain Information
  backPain: z.enum(["1", "2"]),
  backLocation: z.enum(["1", "2", "3", "4"]),
  backPainStart: z.enum(["1", "2", "3"]),
  backPainInitialSeverity: z.enum(["1", "2", "3"]),
  backPainCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  backPainResolveDays: z.string().optional(),

  // Section 6 - Headache Information
  headache: z.enum(["1", "2"]),
  headacheStart: z.enum(["1", "2", "3"]),
  headacheInitialSeverity: z.enum(["1", "2", "3"]),
  headacheCurrentSeverity: z.enum(["1", "2", "3", "4"]),
  headacheResolveDays: z.string().optional(),
  headachePastHistory: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
