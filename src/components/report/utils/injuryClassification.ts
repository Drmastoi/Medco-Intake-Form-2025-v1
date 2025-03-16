
export const getInjuryClassification = (injuryType: string, location?: string) => {
  if (injuryType === 'Neck' || injuryType === 'Shoulder' || (injuryType === 'Back' && (location === "1" || location === "2"))) {
    return 'Whiplash';
  } else if (injuryType === 'Back' && location === "3") {
    return 'Whiplash';
  } else if (['Headache', 'Dizziness'].includes(injuryType)) {
    return 'Whiplash Associated';
  } else if (['Anxiety', 'Travel Anxiety', 'Panic', 'Fear of Travel'].includes(injuryType)) {
    return 'Psychological';
  } else {
    return 'Non-whiplash';
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

export const getMechanismOfInjury = (injuryType: string, location?: string) => {
  if (injuryType === 'Neck' || (injuryType === 'Back' && location === "3")) {
    return "The injury is caused by acceleration-deceleration mechanism of energy transfer to the neck.";
  } else if (injuryType === 'Shoulder' || (injuryType === 'Back' && location !== "3")) {
    return "The injury is caused by a direct trauma to the vehicle interior.";
  } else if (['Headache', 'Dizziness'].includes(injuryType)) {
    return "It is classified as Whiplash Associated injury and falls within subsection 1.3 of the civil liability act 2018.";
  } else if (['Anxiety', 'Travel Anxiety'].includes(injuryType)) {
    return "It is classified as a Psychological impact and falls within subsection 1.3 of the civil liability act 2018.";
  } else {
    return "The injury is caused by a direct impact during the accident.";
  }
};

export const getOpinion = (injuryType: string, location?: string) => {
  // Check if it's a whiplash injury (neck, shoulder or lower back)
  const isWhiplash = (injuryType === 'Neck') || 
                     (injuryType === 'Shoulder') || 
                     (injuryType === 'Back' && location === "3");
                     
  // List of injury types that shouldn't have the Civil Liability Act statement
  const excludedInjuries = ['Neck', 'Shoulder', 'Back', 'Anxiety', 'Travel Anxiety', 'Headache', 'Dizziness'];
  
  if (isWhiplash) {
    return "In my opinion, the Claimant's symptoms are due to a Whiplash Injury. On the balance of probabilities, they are attributable to the index accident.";
  } else if (injuryType === 'Back' && location !== "3") {
    return "In my opinion, the Claimant's symptoms are due to a Soft Tissue Injury. On the balance of probabilities, they are attributable to the index accident. The injury falls within subsection 1.3 of the Civil Liability Act 2018.";
  } else if (['Headache', 'Dizziness'].includes(injuryType)) {
    return "In my opinion, the Claimant's symptoms are due to a Whiplash Associated Injury. On the balance of probabilities, they are attributable to the index accident.";
  } else if (['Anxiety', 'Travel Anxiety'].includes(injuryType)) {
    return "In my opinion, the Claimant's symptoms are due to a Psychological Impact. On the balance of probabilities, they are attributable to the index accident.";
  } else {
    return "In my opinion, the Claimant's symptoms are due to a Non-whiplash Injury. On the balance of probabilities, they are attributable to the index accident. The injury falls within subsection 1.3 of the Civil Liability Act 2018.";
  }
};

export const getOICTariff = (injuryType: string, location?: string) => {
  if (injuryType === 'Neck' || (injuryType === 'Back' && location === "3")) {
    return "Yes";
  } else {
    return "No";
  }
};

export const getExaminationFindings = (injuryType: string, severity: string) => {
  if (['Anxiety', 'Travel Anxiety', 'Headache', 'Dizziness'].includes(injuryType)) {
    return "Not applicable for this type of injury.";
  }
  
  let baseText = "Observation Normal\n";
  
  if (severity === "1") {
    baseText += "Mild - as per claimant's entry. ";
  } else if (severity === "2") {
    baseText += "Moderate - as per claimant's entry. ";
  } else if (severity === "3") {
    baseText += "Severe - as per claimant's entry. ";
  }
  
  baseText += "Movements Flexion, Extension Mild Restriction | Extremes mild Painful\n";
  baseText += "Left Lateral Flexion, Right Lateral Flexion | Left side | Normal\n";
  baseText += "No neurovascular deficits noted.";
  
  return baseText;
};
