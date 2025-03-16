
import { Text, View } from '@react-pdf/renderer';

interface AdditionalReportRowProps {
  styles: any;
}

export const AdditionalReportRow = ({ styles }: AdditionalReportRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Additional Report</Text>
      <Text style={styles.injuryValue}>No additional reports are required.</Text>
    </View>
  );
};
