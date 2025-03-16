
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface TreatmentRowProps {
  injuryType: string;
  severity: string | undefined;
  styles: any;
}

export const TreatmentRow = ({ injuryType, severity, styles }: TreatmentRowProps) => {
  const isResolved = severity === "4";
  
  const getTreatmentRecommendation = (): string => {
    if (isResolved) {
      return "Pain killers if required";
    }
    
    if (injuryType === "Travel Anxiety") {
      return "Self-help measures including gradual exposure, relaxation techniques, and breathing exercises";
    }
    
    return "Physiotherapy recommended. Number of sessions to be determined by the physiotherapist";
  };
  
  const getAdditionalTreatmentDetails = (): string => {
    if (isResolved) return "No further treatment required as symptoms have resolved.";
    
    switch (injuryType) {
      case "Neck":
      case "Back":
      case "Shoulder":
        return "Pain management with over-the-counter medications as needed. Ice/heat therapy may provide temporary relief.";
      case "Headache":
        return "Ensure adequate hydration, regular rest periods, and stress management techniques.";
      case "Travel Anxiety":
        return "Professional psychological support may be considered if self-help measures are ineffective.";
      default:
        return "";
    }
  };

  const treatment = getTreatmentRecommendation();
  const additionalDetails = getAdditionalTreatmentDetails();
  
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Treatment</Text>
      <View style={{ width: '70%' }}>
        <Text style={styles.injuryValue}>{treatment}</Text>
        {!isResolved && (
          <View style={{ 
            marginTop: 3,
            backgroundColor: colorScheme.altSectionBg,
            padding: 5,
            borderRadius: 2,
            borderLeft: `3px solid ${colorScheme.warning}`
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
