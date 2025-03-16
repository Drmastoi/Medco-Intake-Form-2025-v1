
import { Text, View } from '@react-pdf/renderer';
import StatusBadge from '../../pdf/components/StatusBadge';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface CurrentStatusRowProps {
  currentSeverity: string | undefined;
  resolveDays: string | undefined;
  styles: any;
}

export const CurrentStatusRow = ({ currentSeverity, resolveDays, styles }: CurrentStatusRowProps) => {
  const getSeverityText = (severity: string | undefined): string => {
    switch (severity) {
      case "1": return "Mild";
      case "2": return "Moderate";
      case "3": return "Severe";
      case "4": return "Resolved";
      default: return "Not Specified";
    }
  };

  const severityText = getSeverityText(currentSeverity);
  
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Current Status</Text>
      <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.injuryValue}>
          {severityText}
          {currentSeverity === "4" ? ` after ${resolveDays || "unknown"} days` : ""}
        </Text>
        <StatusBadge status={severityText} />
        
        {currentSeverity === "4" && (
          <View style={{ 
            marginTop: 5, 
            width: '100%', 
            backgroundColor: colorScheme.altSectionBg,
            padding: 3,
            borderRadius: 2
          }}>
            <Text style={{ 
              fontSize: 8, 
              fontStyle: 'italic',
              color: colorScheme.success
            }}>
              The injury has completely resolved and no longer causes any symptoms or functional limitations.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
