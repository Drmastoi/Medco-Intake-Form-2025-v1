
import { Text, View } from '@react-pdf/renderer';
import StatusBadge from '../../pdf/components/StatusBadge';

interface InitialSeverityRowProps {
  initialSeverity: string | undefined;
  injuryType: string;
  styles: any;
}

export const InitialSeverityRow = ({ initialSeverity, injuryType, styles }: InitialSeverityRowProps) => {
  const getSeverityText = (severity: string | undefined): string => {
    switch (severity) {
      case "1": return "Mild";
      case "2": return "Moderate";
      case "3": return "Severe";
      case "4": return "Resolved";
      default: return "Not Specified";
    }
  };

  const severityText = getSeverityText(initialSeverity);
  
  const getSeverityDescription = (severity: string): string => {
    switch (severity) {
      case "Mild":
        return injuryType === "Travel Anxiety" 
          ? "Mild anxiety when traveling but able to travel with minimal distress."
          : "Pain present but not limiting daily activities.";
      case "Moderate":
        return injuryType === "Travel Anxiety"
          ? "Moderate anxiety causing noticeable distress, but able to travel when necessary."
          : "Pain limiting some daily activities and causing discomfort.";
      case "Severe":
        return injuryType === "Travel Anxiety"
          ? "Severe anxiety making travel very difficult or impossible without significant distress."
          : "Pain significantly limiting daily activities and causing considerable discomfort.";
      default:
        return "Severity not specified.";
    }
  };

  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Initial Severity</Text>
      <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.injuryValue}>{severityText}</Text>
        <StatusBadge status={severityText} />
        <View style={{ marginTop: 5, width: '100%' }}>
          <Text style={{ fontSize: 8, fontStyle: 'italic' }}>
            {getSeverityDescription(severityText)}
          </Text>
        </View>
      </View>
    </View>
  );
};
