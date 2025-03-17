
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface PrognosisRowProps {
  injuryType: string;
  currentSeverity: string | undefined;
  resolveDays: string | undefined;
  styles: any;
}

export const PrognosisRow = ({ injuryType, currentSeverity, resolveDays, styles }: PrognosisRowProps) => {
  const isResolved = currentSeverity === "4";
  
  const getPrognosis = (currentSeverity: string | undefined, injuryType: string): string => {
    if (isResolved) {
      return `Resolved after ${resolveDays || "unknown"} days.`;
    }
    
    switch (currentSeverity) {
      case "1": // Mild
        return "3 months from date of accident.";
      case "2": // Moderate
        return "6 months from date of accident.";
      case "3": // Severe
        return "9 months from date of accident. (Prolonged prognosis is due to severity of symptoms)";
      default:
        return "Prognosis cannot be determined with available information.";
    }
  };
  
  // Additional details based on injury type
  const getAdditionalPrognosisDetails = (injuryType: string, currentSeverity: string | undefined): string => {
    if (isResolved) return "No ongoing symptoms or functional limitations remain.";
    
    switch (injuryType) {
      case "Neck":
      case "Back":
        return currentSeverity === "3" 
          ? "Physiotherapy recommended to aid recovery and prevent chronic issues."
          : "Regular stretching and maintaining good posture will aid recovery.";
      case "Shoulder":
        return currentSeverity === "3"
          ? "Physiotherapy and targeted exercises recommended to restore full range of motion."
          : "Gentle shoulder exercises and avoiding heavy lifting will aid recovery.";
      case "Headache":
        return "Managing stress levels and ensuring adequate hydration and rest will aid recovery.";
      case "Travel Anxiety":
        return "Gradual exposure to travel situations and potentially CBT (Cognitive Behavioral Therapy) may be beneficial.";
      default:
        return "";
    }
  };

  const prognosis = getPrognosis(currentSeverity, injuryType);
  const additionalDetails = getAdditionalPrognosisDetails(injuryType, currentSeverity);
  
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Prognosis</Text>
      <View style={{ width: '70%' }}>
        <Text style={styles.injuryValue}>{prognosis}</Text>
        {!isResolved && (
          <View style={{ 
            marginTop: 3,
            backgroundColor: colorScheme.altSectionBg,
            padding: 5,
            borderRadius: 2,
            borderLeft: `3px solid ${colorScheme.info}`
          }}>
            <Text style={{ fontSize: 8, color: colorScheme.textSecondary }}>
              {additionalDetails}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
