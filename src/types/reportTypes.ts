export interface ReportData {
  prefilled: PrefilledData;
  personal: PersonalData;
  accident: AccidentData;
  injuries: InjuriesData;
  travelAnxiety: TravelAnxietyData;
  other: OtherData;
}

export interface PrefilledData {
  solicitorName: string;
  solicitorReference: string;
  instructingPartyName: string;
  instructingPartyReference: string;
  examinationLocation: string;
  medcoReference: string;
  dateOfExamination: string;
  dateOfReport: string;
  timeSpentWithClaimant: string;
  accompaniedBy: string;
  expertName: string;
  expertSpecialty: string;
  expertTitle: string;
  gmcNumber: string;
  claimantEmail?: string; // Add this property as optional
}

export interface PersonalData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  occupation: string;
  workType: string;
  idType: string;
  emailId?: string; // Add this property as optional
}

export interface AccidentData {
  accidentDate: string;
  accidentTime: string;
  vehiclePosition: string;
  vehicleStatus: string;
  vehicleLocation: string;
  impactLocation: string;
  vehicleDamage: string;
  claimantPosition: string;
  claimantVehicle: string;
  otherVehicle: string;
  accidentSummary: string;
}

export interface InjuriesData {
  neckPain: InjuryDetails;
  shoulderPain: ShoulderPainDetails;
  backPain: BackPainDetails;
  headache: HeadacheDetails;
}

export interface InjuryDetails {
  hasInjury: boolean;
  painStart: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays?: string;
  additionalInfo?: string;
  hadPrior?: boolean;
}

export interface ShoulderPainDetails {
  hasInjury: boolean;
  side: string;
  painStart: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays?: string;
}

export interface BackPainDetails {
  hasInjury: boolean;
  location: string;
  painStart: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays?: string;
}

export interface HeadacheDetails {
  hasInjury: boolean;
  start: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays?: string;
  pastHistory?: string;
}

export interface TravelAnxietyData {
  hasAnxiety: boolean;
  symptoms: string[];
  initialSeverity: string;
  currentSeverity: string;
  resolveDays: string;
  start?: string;
  anxietyStart?: string; // This should be included for backward compatibility
  pastHistory: string;
  hasHistory: string;
  currentlyDriving: string;
  duration?: string; // Add this field to fix the errors
}

export interface OtherData {
  bruising: BruisingData;
  otherInjuries: OtherInjuriesData;
  treatment: TreatmentData;
  lifestyle: LifestyleData;
  medicalHistory: MedicalHistoryData;
}

export interface BruisingData {
  hasBruising: boolean;
  location?: string;
  noticed?: string;
  initialSeverity?: string;
  currentSeverity?: string;
  resolveDays?: string;
  hasVisibleScar?: boolean;
}

export interface OtherInjuriesData {
  hasOtherInjury: boolean;
  name?: string;
  start?: string;
  initialSeverity?: string;
  currentSeverity?: string;
  resolveDays?: string;
}

export interface TreatmentData {
  hasTreatment: boolean;
  type?: string[];
  frequency?: string;
  duration?: string;
  ongoing?: boolean;
  sceneOfAccidentTreatment?: string;
  sceneOfAccidentTreatmentTypes?: string[];
  wentToAE?: string;
  hospitalName?: string;
  hospitalTreatment?: string[];
  wentToWalkInGP?: string;
  daysBeforeGPVisit?: string;
  currentTreatment?: string;
  physiotherapySessions?: string;
}

export interface LifestyleData {
  impactOnWork: boolean;
  timeOffWork?: string;
  workRestrictions?: string[];
  workImpactDate?: string;
  impactOnSleep: boolean;
  sleepIssues?: string[];
  sleepImpactDate?: string;
  impactOnDomestic: boolean;
  domesticIssues?: string[];
  domesticImpactDate?: string;
  impactOnSports: boolean;
  sportsActivities?: string;
  sportsDuration?: string;
  sportsImpactDate?: string;
  impactOnSocial: boolean;
  socialDetails?: string;
  socialImpactDate?: string;
}

export interface MedicalHistoryData {
  exceptionalInjuries: boolean;
  exceptionalInjuriesDetails: string;
  physiotherapyPreference?: string;
}
