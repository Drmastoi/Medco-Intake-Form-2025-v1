
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface ConclusionSectionProps {
  formData: ReportData;
  styles: any;
}

export const ConclusionSection = ({ formData, styles }: ConclusionSectionProps) => {
  // Calculate how many types of injuries the claimant has
  const injuries = [];
  if (formData.injuries.neckPain.hasInjury) injuries.push("neck pain");
  if (formData.injuries.shoulderPain.hasInjury) injuries.push("shoulder pain");
  if (formData.injuries.backPain.hasInjury) injuries.push("back pain");
  if (formData.injuries.headache.hasInjury) injuries.push("headaches");
  if (formData.travelAnxiety.hasAnxiety) injuries.push("travel anxiety");
  if (formData.other.bruising.hasBruising) injuries.push("bruising/scarring");
  if (formData.other.otherInjuries.hasOtherInjury) injuries.push("other injuries");
  
  // Calculate if any injuries have resolved
  const resolvedInjuries = [];
  if (formData.injuries.neckPain.hasInjury && formData.injuries.neckPain.currentSeverity === "Resolved") 
    resolvedInjuries.push("neck pain");
  if (formData.injuries.shoulderPain.hasInjury && formData.injuries.shoulderPain.currentSeverity === "Resolved") 
    resolvedInjuries.push("shoulder pain");
  if (formData.injuries.backPain.hasInjury && formData.injuries.backPain.currentSeverity === "Resolved") 
    resolvedInjuries.push("back pain");
  if (formData.injuries.headache.hasInjury && formData.injuries.headache.currentSeverity === "Resolved") 
    resolvedInjuries.push("headaches");
  if (formData.travelAnxiety.hasAnxiety && formData.travelAnxiety.currentSeverity === "Resolved") 
    resolvedInjuries.push("travel anxiety");
  if (formData.other.bruising.hasBruising && formData.other.bruising.currentSeverity === "Resolved") 
    resolvedInjuries.push("bruising/scarring");
  if (formData.other.otherInjuries.hasOtherInjury && formData.other.otherInjuries.currentSeverity === "Resolved") 
    resolvedInjuries.push("other injuries");
  
  // Generate prognosis text
  const allResolved = resolvedInjuries.length === injuries.length && injuries.length > 0;
  const someResolved = resolvedInjuries.length > 0 && resolvedInjuries.length < injuries.length;
  const noneResolved = resolvedInjuries.length === 0 && injuries.length > 0;
  
  let prognosisText = "";
  if (allResolved) {
    prognosisText = "All of the claimant's injuries have resolved completely.";
  } else if (someResolved) {
    prognosisText = `Some of the claimant's injuries (${resolvedInjuries.join(", ")}) have resolved, while others remain active.`;
  } else if (noneResolved) {
    prognosisText = "The claimant's injuries have not yet resolved.";
  } else {
    prognosisText = "No injuries were reported by the claimant.";
  }
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 12 - Conclusion and Prognosis</Text>
      
      <Text style={[styles.fieldLabel, { marginTop: 5 }]}>Summary of Injuries:</Text>
      <Text style={styles.fieldValue}>
        {injuries.length > 0 
          ? `The claimant suffered from ${injuries.join(", ")} as a result of the accident.` 
          : "The claimant reported no injuries from the accident."}
      </Text>
      
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Causation:</Text>
      <Text style={styles.fieldValue}>
        {injuries.length > 0 
          ? "Based on the claimant's history and examination findings, the injuries described are consistent with the accident mechanism reported." 
          : "No causation assessment was necessary as no injuries were reported."}
      </Text>
      
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Prognosis:</Text>
      <Text style={styles.fieldValue}>{prognosisText}</Text>
      
      {injuries.length > 0 && !allResolved && (
        <Text style={styles.fieldValue}>
          {someResolved 
            ? "For the remaining unresolved symptoms, " 
            : ""}
          I would expect all remaining symptoms to resolve within 6-12 months from the date of the accident without any significant permanent effects. The claimant should continue with symptomatic management as advised.
        </Text>
      )}
      
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Treatment Recommendations:</Text>
      <Text style={styles.fieldValue}>
        {injuries.length > 0 && !allResolved
          ? "I would recommend the following: regular over-the-counter analgesics as needed, gentle exercises, and a gradual return to normal activities. If symptoms persist beyond 3 months, a course of physical therapy may be beneficial."
          : "No specific treatment recommendations are necessary as the claimant has either fully recovered or reported no injuries."}
      </Text>
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        In conclusion, this report finds that {injuries.length > 0 
          ? `the claimant has suffered ${injuries.join(", ")} as a result of the accident on ${formData.accident.accidentDate}. `
          : "the claimant reported no injuries from the accident. "}
        {prognosisText} 
        {injuries.length > 0 && !allResolved 
          ? " The injuries are consistent with the reported accident mechanism and should resolve without long-term complications given appropriate management." 
          : ""}
      </Text>
    </View>
  );
};
