import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';

export const InjurySummarySection = ({ formData }: { formData: any }) => {
  // Helper function to get text based on value codes
  const getPainTimingText = (code: string) => {
    switch(code) {
      case "1": return "same day";
      case "2": return "next day";
      case "3": return "few days later";
      default: return "unknown time";
    }
  };
  
  const getSeverityText = (code: string) => {
    switch(code) {
      case "1": return "mild";
      case "2": return "moderate";
      case "3": return "severe";
      case "4": return "resolved";
      default: return "unknown severity";
    }
  };

  // Neck pain information
  const hasNeckPain = formData?.neckPain === "1";
  let neckPainText = "";
  
  if (hasNeckPain) {
    const startText = getPainTimingText(formData?.neckPainStart);
    const initialSeverity = getSeverityText(formData?.neckPainInitialSeverity);
    const currentSeverity = getSeverityText(formData?.neckPainCurrentSeverity);
    
    neckPainText = `Claimant suffered from neck pain after the accident. It started ${startText}, initial severity was ${initialSeverity}, current severity is ${currentSeverity}. `;
    
    if (formData?.hadPriorNeckPain === "1") {
      if (formData?.accidentNeckPainPercentage && formData?.priorNeckPainPercentage) {
        neckPainText += `Claimant had previous history of neck pain before the accident. ${formData.accidentNeckPainPercentage}% of current pain is due to this accident and ${formData.priorNeckPainPercentage}% is due to previous condition.`;
      } else {
        neckPainText += "Claimant had previous history of neck pain before the accident.";
      }
    } else {
      neckPainText += "Claimant did not have previous history of neck pain before the accident.";
    }
  } else {
    neckPainText = "Claimant did not suffer from neck pain after the accident.";
  }

  return (
    <View style={styles.subsection}>
      <Text style={styles.subheading}>PHYSICAL INJURIES AND SYMPTOMS</Text>
      
      {/* Neck Pain Details */}
      <Text style={styles.paragraph}>{neckPainText}</Text>
      
      {/* Other injuries will be added here as more sections are developed */}
    </View>
  );
};
