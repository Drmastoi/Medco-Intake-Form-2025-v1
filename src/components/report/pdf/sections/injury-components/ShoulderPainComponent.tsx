
import { Text, View } from '@react-pdf/renderer';
import { formatDuration } from '../../../../utils/formatUtils';

interface ShoulderPainComponentProps {
  shoulderPain: any;
  styles: any;
}

export const ShoulderPainComponent = ({ shoulderPain, styles }: ShoulderPainComponentProps) => {
  if (!shoulderPain.hasInjury) return null;

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.3 Shoulder Pain</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{shoulderPain.initialSeverity || 'Not specified'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{shoulderPain.currentSeverity || 'Not specified'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Start Date</Text>
          <Text style={styles.fieldValue}>{shoulderPain.painStart || 'Not specified'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>End Date</Text>
          <Text style={styles.fieldValue}>
            {shoulderPain.currentSeverity === 'Resolved' 
              ? 'Resolved' 
              : 'Ongoing'}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {shoulderPain.currentSeverity === 'Resolved' 
              ? formatDuration(shoulderPain.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>None</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Affected Side</Text>
          <Text style={styles.fieldValue}>{shoulderPain.side || 'Not specified'}</Text>
        </View>
      </View>
    </View>
  );
};
