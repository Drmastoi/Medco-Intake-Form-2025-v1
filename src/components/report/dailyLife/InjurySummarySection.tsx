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

  const getShoulderSideText = (code: string) => {
    switch(code) {
      case "1": return "left shoulder";
      case "2": return "right shoulder";
      case "3": return "both shoulders";
      default: return "shoulder";
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

  // Shoulder pain information
  const hasShoulderPain = formData?.shoulderPain === "1";
  let shoulderPainText = "";
  
  if (hasShoulderPain) {
    const shoulderSide = getShoulderSideText(formData?.shoulderSide);
    const startText = getPainTimingText(formData?.shoulderPainStart);
    const initialSeverity = getSeverityText(formData?.shoulderPainInitialSeverity);
    const currentSeverity = getSeverityText(formData?.shoulderPainCurrentSeverity);
    
    shoulderPainText = `Claimant suffered from ${shoulderSide} pain after the accident. It started ${startText}, initial severity was ${initialSeverity}, current severity is ${currentSeverity}. `;
    
    if (formData?.hadPriorShoulderPain === "1") {
      if (formData?.accidentShoulderPainPercentage && formData?.priorShoulderPainPercentage) {
        shoulderPainText += `Claimant had previous history of shoulder pain before the accident. ${formData.accidentShoulderPainPercentage}% of current pain is due to this accident and ${formData.priorShoulderPainPercentage}% is due to previous condition.`;
      } else {
        shoulderPainText += "Claimant had previous history of shoulder pain before the accident.";
      }
    } else {
      shoulderPainText += "Claimant did not have previous history of shoulder pain before the accident.";
    }
  } else {
    shoulderPainText = "Claimant did not suffer from shoulder pain after the accident.";
  }

  return (
    <View style={styles.subsection}>
      <Text style={styles.subheading}>PHYSICAL INJURIES AND SYMPTOMS</Text>
      
      {/* Neck Pain Details */}
      <Text style={styles.paragraph}>{neckPainText}</Text>
      
      {/* Shoulder Pain Details */}
      <Text style={styles.paragraph}>{shoulderPainText}</Text>
      
      {/* Other injuries will be added here as more sections are developed */}
    </View>
  );
};
