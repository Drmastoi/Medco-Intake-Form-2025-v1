
export const getOnsetText = (onset: string) => {
  switch (onset) {
    case "1": return "Same day";
    case "2": return "Next Day";
    case "3": return "Few days Later";
    default: return "Not specified";
  }
};

export const getSeverityText = (severity: string) => {
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
  }
};

export const getPrognosis = (severity: string, resolveDays: string | undefined) => {
  if (severity === "4" && resolveDays) {
    return `${resolveDays} DAYS`;
  }
  
  switch (severity) {
    case "1": return "3 MONTHS FROM DATE OF ACCIDENT";
    case "2": return "6 MONTHS FROM DATE OF ACCIDENT";
    case "3": return "9 MONTHS FROM DATE OF ACCIDENT (Prolonged prognosis is due to severity of symptoms)";
    default: return "6 MONTHS FROM DATE OF ACCIDENT";
  }
};

export const getTreatmentRecommendation = (severity: string) => {
  if (severity === "4") {
    return "Pain killers if required";
  } else {
    return "Physiotherapy recommended. Number of sessions to be determined by the physiotherapist";
  }
};

export const prepareWhiplashInjuries = (formData: any) => {
  const injuries = [];
  
  if (formData.neckPain === "1") {
    injuries.push({
      injury: "Neck Pain",
      onset: getOnsetText(formData.neckPainStart),
      initialSeverity: getSeverityText(formData.neckPainInitialSeverity),
      currentSeverity: getSeverityText(formData.neckPainCurrentSeverity),
      treatment: getTreatmentRecommendation(formData.neckPainCurrentSeverity),
      prognosis: getPrognosis(formData.neckPainCurrentSeverity, formData.neckPainResolveDays),
    });
  }

  if (formData.shoulderPain === "1") {
    injuries.push({
      injury: "Shoulder Pain",
      onset: getOnsetText(formData.shoulderPainStart),
      initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
      currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
      treatment: getTreatmentRecommendation(formData.shoulderPainCurrentSeverity),
      prognosis: getPrognosis(formData.shoulderPainCurrentSeverity, formData.shoulderPainResolveDays),
    });
  }

  if (formData.backPain === "1") {
    injuries.push({
      injury: "Back Pain",
      onset: getOnsetText(formData.backPainStart),
      initialSeverity: getSeverityText(formData.backPainInitialSeverity),
      currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
      treatment: getTreatmentRecommendation(formData.backPainCurrentSeverity),
      prognosis: getPrognosis(formData.backPainCurrentSeverity, formData.backPainResolveDays),
    });
  }

  return injuries;
};

export const prepareNonWhiplashInjuries = (formData: any) => {
  const injuries = [];
  
  if (formData.headache === "1") {
    injuries.push({
      injury: "Headache",
      onset: getOnsetText(formData.headacheStart),
      initialSeverity: getSeverityText(formData.headacheInitialSeverity),
      currentSeverity: getSeverityText(formData.headacheCurrentSeverity),
      treatment: getTreatmentRecommendation(formData.headacheCurrentSeverity),
      prognosis: getPrognosis(formData.headacheCurrentSeverity, formData.headacheResolveDays),
    });
  }

  if (formData.travelAnxiety === "1") {
    injuries.push({
      injury: "Travel Anxiety",
      onset: getOnsetText(formData.anxietyStart),
      initialSeverity: getSeverityText(formData.anxietyInitialSeverity),
      currentSeverity: getSeverityText(formData.anxietyCurrentSeverity),
      treatment: getTreatmentRecommendation(formData.anxietyCurrentSeverity),
      prognosis: getPrognosis(formData.anxietyCurrentSeverity, formData.anxietyResolveDays),
    });
  }

  if (formData.hasBruising === "1") {
    injuries.push({
      injury: "Bruising",
      onset: getOnsetText(formData.bruisingNoticed),
      initialSeverity: getSeverityText(formData.bruisingInitialSeverity),
      currentSeverity: getSeverityText(formData.bruisingCurrentSeverity),
      treatment: getTreatmentRecommendation(formData.bruisingCurrentSeverity),
      prognosis: getPrognosis(formData.bruisingCurrentSeverity, formData.bruisingResolveDays),
    });
  }

  if (formData.hasOtherInjury === "1") {
    injuries.push({
      injury: formData.injuryName || "Other Injury",
      onset: getOnsetText(formData.injuryStart),
      initialSeverity: getSeverityText(formData.injuryInitialSeverity),
      currentSeverity: getSeverityText(formData.injuryCurrentSeverity),
      treatment: getTreatmentRecommendation(formData.injuryCurrentSeverity),
      prognosis: getPrognosis(formData.injuryCurrentSeverity, formData.injuryResolveDays),
    });
  }

  return injuries;
};
