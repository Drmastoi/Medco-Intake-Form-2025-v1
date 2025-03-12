
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
}

export interface PersonalData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  occupation: string;
  workType: string;
}

export interface AccidentData {
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
}

export interface NeckPainData {
  hasInjury: boolean;
  painStart: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays: string;
  additionalInfo: string;
  hadPrior: boolean;
}

export interface ShoulderPainData {
  hasInjury: boolean;
  side: string;
  painStart: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays: string;
}

export interface BackPainData {
  hasInjury: boolean;
  location: string;
  painStart: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays: string;
}

export interface HeadacheData {
  hasInjury: boolean;
  start: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays: string;
  pastHistory: string;
}

export interface InjuriesData {
  neckPain: NeckPainData;
  shoulderPain: ShoulderPainData;
  backPain: BackPainData;
  headache: HeadacheData;
}

export interface TravelAnxietyData {
  hasAnxiety: boolean;
  symptoms: string[];
  currentlyDriving: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays: string;
  pastHistory: string;
  duration: string;
  hasHistory: string;
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
}

export interface LifestyleData {
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
}

export interface MedicalHistoryData {
  exceptionalInjuries: boolean;
  exceptionalInjuriesDetails: string;
}

export interface OtherData {
  bruising: BruisingData;
  otherInjuries: OtherInjuriesData;
  treatment: TreatmentData;
  lifestyle: LifestyleData;
  medicalHistory: MedicalHistoryData;
}

export interface ReportData {
  prefilled: PrefilledData;
  personal: PersonalData;
  accident: AccidentData;
  injuries: InjuriesData;
  travelAnxiety: TravelAnxietyData;
  other: OtherData;
}
