
import { Text, View } from '@react-pdf/renderer';
import { formatDuration, formatSeverity, safeValue } from '../../../utils/formatUtils';

interface BackPainComponentProps {
  backPain: any;
  styles: any;
}

export const BackPainComponent = ({ backPain, styles }: BackPainComponentProps) => {
  if (!backPain?.hasInjury) return null;

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.2 Back Pain</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(backPain.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(backPain.currentSeverity)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Start Date</Text>
          <Text style={styles.fieldValue}>{safeValue(backPain.painStart)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>End Date</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(backPain.currentSeverity) === 'Resolved' 
              ? 'Resolved' 
              : 'Ongoing'}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(backPain.currentSeverity) === 'Resolved' 
              ? formatDuration(backPain.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>None</Text>
        </View>
      </View>
      
      {backPain.location && (
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Location</Text>
            <Text style={styles.fieldValue}>{safeValue(backPain.location)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
