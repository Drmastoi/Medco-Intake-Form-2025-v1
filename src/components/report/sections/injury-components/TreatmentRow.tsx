
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface TreatmentRowProps {
  injuryType: string;
  currentSeverity: string | undefined;
  styles: any;
}

export const TreatmentRow = ({ injuryType, currentSeverity, styles }: TreatmentRowProps) => {
  const isResolved = currentSeverity === "4";
  
  const getTreatmentRecommendation = (currentSeverity: string | undefined, injuryType: string): string => {
    if (isResolved) {
      return "No further treatment required.";
    }
    
    const severityLevel = currentSeverity === "3" ? "severe" : 
                           currentSeverity === "2" ? "moderate" :
                           "mild";
    
    switch (injuryType) {
      case "Neck":
        return `For ${severityLevel} neck pain: Analgesics, heat/cold therapy, gentle stretching exercises. ${severityLevel === "severe" || severityLevel === "moderate" ? "Physiotherapy recommended." : ""}`;
      case "Back":
        return `For ${severityLevel} back pain: Analgesics, heat/cold therapy, maintaining good posture. ${severityLevel === "severe" || severityLevel === "moderate" ? "Physiotherapy recommended." : ""}`;
      case "Shoulder":
        return `For ${severityLevel} shoulder pain: Analgesics, heat/cold therapy, gentle mobility exercises. ${severityLevel === "severe" || severityLevel === "moderate" ? "Physiotherapy recommended." : ""}`;
      case "Headache":
        return `For ${severityLevel} headache: Analgesics, ensuring adequate hydration, rest, and stress management. ${severityLevel === "severe" ? "GP consultation recommended if persistent." : ""}`;
      case "Travel Anxiety":
        return `For ${severityLevel} travel anxiety: ${severityLevel === "severe" ? "Psychological therapy recommended (CBT)." : "Gradual exposure techniques, relaxation methods, and possibly counseling."}`;
      default:
        return "Standard pain management recommended.";
    }
  };
  
  // Additional self-care advice based on injury type
  const getSelfCareAdvice = (injuryType: string): string => {
    switch (injuryType) {
      case "Neck":
        return "Maintain good posture, take regular breaks from prolonged sitting, use suitable pillow height when sleeping.";
      case "Back":
        return "Maintain good posture, use proper lifting techniques, consider ergonomic adjustments in workplace setup.";
      case "Shoulder":
        return "Avoid heavy lifting, take regular breaks from repetitive movements, use proper technique during activities.";
      case "Headache":
        return "Ensure regular sleep patterns, stay hydrated, manage stress levels, limit screen time.";
      case "Travel Anxiety":
        return "Practice relaxation techniques, gradually expose yourself to travel situations, develop a coping strategy.";
      default:
        return "";
    }
  };

  const treatment = getTreatmentRecommendation(currentSeverity, injuryType);
  const selfCare = !isResolved ? getSelfCareAdvice(injuryType) : "";
  
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Treatment</Text>
      <View style={{ width: '70%' }}>
        <Text style={styles.injuryValue}>{treatment}</Text>
        {!isResolved && selfCare && (
          <View style={{ 
            marginTop: 3,
            backgroundColor: colorScheme.altSectionBg,
            padding: 5,
            borderRadius: 2
          }}>
            <Text style={{ fontSize: 8, fontStyle: 'italic', color: colorScheme.textSecondary }}>
              <Text style={{ fontWeight: 'bold' }}>Self-care advice: </Text>
              {selfCare}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
