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
    case "1": return "3 MONTHS";
    case "2": return "6 MONTHS";
    case "3": return "9 MONTHS";
    default: return "6 MONTHS";
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
      treatment: formData.neckPainCurrentSeverity === "4" ? "Pain killers if required" : "Physiotherapy and pain management",
      prognosis: getPrognosis(formData.neckPainCurrentSeverity, formData.neckPainResolveDays),
    });
  }

  if (formData.shoulderPain === "1") {
    injuries.push({
      injury: "Shoulder Pain",
      onset: getOnsetText(formData.shoulderPainStart),
      initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
      currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
      treatment: formData.shoulderPainCurrentSeverity === "4" ? "Pain killers if required" : "Physiotherapy and pain management",
      prognosis: getPrognosis(formData.shoulderPainCurrentSeverity, formData.shoulderPainResolveDays),
    });
  }

  if (formData.backPain === "1") {
    injuries.push({
      injury: "Back Pain",
      onset: getOnsetText(formData.backPainStart),
      initialSeverity: getSeverityText(formData.backPainInitialSeverity),
      currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
      treatment: formData.backPainCurrentSeverity === "4" ? "Pain killers if required" : "Physiotherapy and pain management",
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
      treatment: formData.headacheCurrentSeverity === "4" ? "Pain killers if required" : "Pain management",
      prognosis: getPrognosis(formData.headacheCurrentSeverity, formData.headacheResolveDays),
    });
  }

  if (formData.travelAnxiety === "1") {
    injuries.push({
      injury: "Travel Anxiety",
      onset: getOnsetText(formData.anxietyStart),
      initialSeverity: getSeverityText(formData.anxietyInitialSeverity),
      currentSeverity: getSeverityText(formData.anxietyCurrentSeverity),
      treatment: formData.anxietyCurrentSeverity === "4" ? "Pain killers if required" : "Self-management techniques",
      prognosis: getPrognosis(formData.anxietyCurrentSeverity, formData.anxietyResolveDays),
    });
  }

  return injuries;
};