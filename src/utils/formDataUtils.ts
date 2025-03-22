
import { FormSchema } from "@/schemas/intakeFormSchema";

/**
 * Prepares form submission data for Supabase
 * @param values The form values
 * @returns Object formatted for Supabase insertion
 */
export const prepareFormData = (values: FormSchema) => {
  // Prepare travel anxiety data to be stored as JSON
  const travelAnxietyData = {
    travel_anxiety: values.travelAnxiety,
    travel_anxiety_symptoms: Array.isArray(values.travelAnxietySymptoms) 
      ? values.travelAnxietySymptoms 
      : values.travelAnxietySymptoms ? [values.travelAnxietySymptoms] : [],
    other_travel_anxiety_symptom: values.otherTravelAnxietySymptom,
    currently_driving: values.currentlyDriving,
    anxiety_initial_severity: values.anxietyInitialSeverity,
    anxiety_current_severity: values.anxietyCurrentSeverity,
    anxiety_resolve_days: values.anxietyResolveDays,
    anxiety_past_history: values.anxietyPastHistory,
    anxiety_duration: values.anxietyDuration,
    has_anxiety_history: values.hasAnxietyHistory
  };
  
  // Store lifestyle impact data
  const lifestyleData = {
    impact_on_work: values.impactOnWork,
    time_off_work: values.timeOffWork,
    work_restrictions: values.workRestrictions,
    work_impact_date: values.workImpactDate,
    
    impact_on_sleep: values.impactOnSleep,
    sleep_issues: values.sleepIssues,
    sleep_impact_date: values.sleepImpactDate,
    
    impact_on_domestic: values.impactOnDomestic,
    domestic_issues: values.domesticIssues,
    domestic_impact_date: values.domesticImpactDate,
    
    impact_on_sports: values.impactOnSports,
    sports_activities: values.sportsActivities,
    sports_duration: values.sportsDuration,
    sports_impact_date: values.sportsImpactDate,
    
    impact_on_social: values.impactOnSocial,
    social_details: values.socialDetails,
    social_impact_date: values.socialImpactDate
  };
  
  // Treatment data
  const treatmentData = {
    has_treatment: values.hasTreatment,
    treatment_type: values.treatmentType,
    treatment_frequency: values.treatmentFrequency,
    treatment_duration: values.treatmentDuration,
    ongoing_treatment: values.ongoingTreatment,
    scene_of_accident_treatment: values.sceneOfAccidentTreatment,
    scene_of_accident_treatment_types: values.sceneOfAccidentTreatmentTypes,
    went_to_ae: values.wentToAE,
    hospital_name: values.hospitalName,
    hospital_treatment: values.hospitalTreatment,
    went_to_walk_in_gp: values.wentToWalkInGP,
    days_before_gp_visit: values.daysBeforeGPVisit,
    current_treatment: values.currentTreatment,
    physiotherapy_sessions: values.physiotherapySessions
  };
  
  // Create a properly formatted object for Supabase insertion
  return {
    // Store identifiable information to track submissions
    solicitor_name: values.solicitorName,
    solicitor_reference: values.solicitorReference,
    instructing_party_name: values.instructingPartyName,
    instructing_party_reference: values.instructingPartyReference,
    examination_location: values.examinationLocation,
    medco_reference: values.medcoReference,
    accompanied_by: values.accompaniedBy,
    mobile_number: values.mobileNumber,
    email_id: values.emailId,
    full_name: values.fullName,
    date_of_birth: values.dateOfBirth,
    id_type: values.idType,
    address: values.address,
    occupation: values.occupation,
    work_type: values.workType,
    living_with: values.livingWith,
    children_count: values.childrenCount ? parseInt(values.childrenCount) : null,
    
    // Accident information
    accident_date: values.accidentDate,
    accident_time: values.accidentTime,
    vehicle_position: values.vehiclePosition,
    
    // Injuries information
    neck_pain: values.neckPain,
    additional_info: values.additionalInfo,
    
    // Shoulder pain
    shoulder_pain: values.shoulderPain,
    shoulder_side: values.shoulderSide,
    shoulder_pain_start: values.shoulderPainStart,
    shoulder_pain_initial_severity: values.shoulderPainInitialSeverity,
    shoulder_pain_current_severity: values.shoulderPainCurrentSeverity,
    shoulder_pain_resolve_days: values.shoulderPainResolveDays ? parseInt(values.shoulderPainResolveDays) : null,
    
    // Back pain
    back_pain: values.backPain,
    back_location: values.backLocation,
    back_pain_start: values.backPainStart,
    back_pain_initial_severity: values.backPainInitialSeverity,
    back_pain_current_severity: values.backPainCurrentSeverity,
    back_pain_resolve_days: values.backPainResolveDays ? parseInt(values.backPainResolveDays) : null,
    
    // Headache
    headache: values.headache,
    headache_start: values.headacheStart,
    headache_initial_severity: values.headacheInitialSeverity,
    headache_current_severity: values.headacheCurrentSeverity,
    headache_resolve_days: values.headacheResolveDays ? parseInt(values.headacheResolveDays) : null,
    headache_past_history: values.headachePastHistory,
    
    // Store complex data as JSON strings
    travel_anxiety_data: JSON.stringify(travelAnxietyData),
    lifestyle_data: JSON.stringify(lifestyleData),
    treatment_data: JSON.stringify(treatmentData),
    
    // Store other injuries and past medical history
    exceptional_injuries: values.exceptionalInjuries,
    exceptional_injuries_details: values.exceptionalInjuriesDetails
  };
};
