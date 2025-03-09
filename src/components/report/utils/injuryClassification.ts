
export const getInjuryClassification = (injuryType: string, location?: string) => {
  if (injuryType === 'Neck' || injuryType === 'Shoulder' || (injuryType === 'Back' && (location === "1" || location === "2"))) {
    return 'Whiplash';
  } else if (injuryType === 'Back' && location === "3") {
    return 'Whiplash';
  } else if (['Headache', 'Dizziness'].includes(injuryType)) {
    return 'Whiplash Associated';
  } else if (['Anxiety', 'Travel Anxiety', 'Panic', 'Fear of Travel'].includes(injuryType)) {
    return 'Psychological Impact';
  } else {
    return 'Non-whiplash Injury';
  }
};

export const getPrognosis = (severity: string) => {
  if (severity === "1") return "3 Months";
  if (severity === "2") return "6 Months";
  if (severity === "3") return "9 Months";
  if (severity === "4") return "Resolved";
  return "Unknown";
};

export const getTreatmentRecommendation = (severity: string, injuryType?: string) => {
  if (severity === "4") {
    return 'None - Resolved';
  } else if (['Anxiety', 'Travel Anxiety'].includes(injuryType || '')) {
    return 'Reassurance, Relaxation techniques';
  } else {
    return 'Physiotherapy - The required number of sessions to be determined by the Physiotherapist';
  }
};

// Helper function to determine if exceptional criteria are met
export const hasExceptionalCircumstances = (formData: any) => {
  // Check if any symptoms are still severe (severity level 3) or have lasted more than 8 months
  if (
    (formData.neckPain === "1" && formData.neckPainCurrentSeverity === "3") ||
    (formData.shoulderPain === "1" && formData.shoulderPainCurrentSeverity === "3") ||
    (formData.backPain === "1" && formData.backPainCurrentSeverity === "3") ||
    (formData.headache === "1" && formData.headacheCurrentSeverity === "3") ||
    (formData.travelAnxiety === "1" && formData.anxietyCurrentSeverity === "3")
  ) {
    return true;
  }
  
  // Check for duration of symptoms (assuming 240 days = ~8 months)
  // This is an approximation as we don't have direct duration data for all symptoms
  if (
    (formData.neckPainResolveDays && parseInt(formData.neckPainResolveDays) > 240) ||
    (formData.shoulderPainResolveDays && parseInt(formData.shoulderPainResolveDays) > 240) ||
    (formData.backPainResolveDays && parseInt(formData.backPainResolveDays) > 240) ||
    (formData.headacheResolveDays && parseInt(formData.headacheResolveDays) > 240) ||
    (formData.anxietyDuration && parseInt(formData.anxietyDuration) > 240)
  ) {
    return true;
  }
  
  return false;
};
