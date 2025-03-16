
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface AdditionalReportRowProps {
  styles: any;
}

export const AdditionalReportRow = ({ styles }: AdditionalReportRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Additional Report</Text>
      <View style={{ width: '70%' }}>
        <Text style={styles.injuryValue}>No additional reports are required at this time.</Text>
        <View style={{ 
          backgroundColor: colorScheme.altSectionBg, 
          padding: 5,
          marginTop: 3,
          borderRadius: 2,
          borderLeft: `3px solid ${colorScheme.info}`
        }}>
          <Text style={{ 
            fontSize: 8, 
            color: colorScheme.textSecondary 
          }}>
            If the symptoms persist beyond the expected recovery period or new symptoms develop, a follow-up assessment may be recommended.
          </Text>
        </View>
      </View>
    </View>
  );
};
