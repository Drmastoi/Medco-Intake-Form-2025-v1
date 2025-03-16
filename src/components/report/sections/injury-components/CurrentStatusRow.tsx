
import { Text, View } from '@react-pdf/renderer';

interface CurrentStatusRowProps {
  currentSeverity: string | undefined;
  resolveDays: string | undefined;
  styles: any;
}

export const CurrentStatusRow = ({ currentSeverity, resolveDays, styles }: CurrentStatusRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Current Status and Severity</Text>
      <Text style={styles.injuryValue}>
        {currentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
         currentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
         currentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
         currentSeverity === "4" ? `Resolved within ${resolveDays || "1"} days (from the date of accident / incident)` : 
         "Current status not specified."}
      </Text>
    </View>
  );
};
