
import { Text, View } from '@react-pdf/renderer';
import { formatDuration } from '../../../../utils/formatUtils';

interface HeadacheComponentProps {
  headache: any;
  styles: any;
}

export const HeadacheComponent = ({ headache, styles }: HeadacheComponentProps) => {
  if (!headache.hasInjury) return null;

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.4 Headache</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{headache.initialSeverity || 'Not specified'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{headache.currentSeverity || 'Not specified'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Start Date</Text>
          <Text style={styles.fieldValue}>{headache.start || 'Not specified'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>End Date</Text>
          <Text style={styles.fieldValue}>
            {headache.currentSeverity === 'Resolved' 
              ? 'Resolved' 
              : 'Ongoing'}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {headache.currentSeverity === 'Resolved' 
              ? formatDuration(headache.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{headache.pastHistory || 'None'}</Text>
        </View>
      </View>
    </View>
  );
};
