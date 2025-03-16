
import { Text, View } from '@react-pdf/renderer';
import { formatDuration, formatSeverity, safeValue } from '../../utils/formatUtils';

interface NeckPainComponentProps {
  neckPain: any;
  styles: any;
}

export const NeckPainComponent = ({ neckPain, styles }: NeckPainComponentProps) => {
  if (!neckPain?.hasInjury) return null;

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.1 Neck Pain</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(neckPain.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(neckPain.currentSeverity)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(neckPain.currentSeverity) === 'Resolved' 
              ? formatDuration(neckPain.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{neckPain.hadPrior ? 'Yes' : 'None'}</Text>
        </View>
      </View>
    </View>
  );
};
