
import { Text, View } from '@react-pdf/renderer';
import { formatDuration, formatSeverity, safeValue } from '../../utils/formatUtils';

interface ShoulderPainComponentProps {
  shoulderPain: any;
  styles: any;
}

export const ShoulderPainComponent = ({ shoulderPain, styles }: ShoulderPainComponentProps) => {
  if (!shoulderPain?.hasInjury) return null;

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.3 Shoulder Pain</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(shoulderPain.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(shoulderPain.currentSeverity)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Start Date</Text>
          <Text style={styles.fieldValue}>{safeValue(shoulderPain.painStart)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>End Date</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(shoulderPain.currentSeverity) === 'Resolved' 
              ? 'Resolved' 
              : 'Ongoing'}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(shoulderPain.currentSeverity) === 'Resolved' 
              ? formatDuration(shoulderPain.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Side Affected</Text>
          <Text style={styles.fieldValue}>{safeValue(shoulderPain.side, 'Not specified')}</Text>
        </View>
      </View>
    </View>
  );
};
