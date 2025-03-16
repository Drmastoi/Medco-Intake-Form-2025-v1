
import { Text, View } from '@react-pdf/renderer';
import { formatDuration } from '../../../../utils/formatUtils';

interface TravelAnxietyComponentProps {
  travelAnxiety: any;
  styles: any;
}

export const TravelAnxietyComponent = ({ travelAnxiety, styles }: TravelAnxietyComponentProps) => {
  if (!travelAnxiety?.hasAnxiety) return null;

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.5 Travel Anxiety</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.initialSeverity || 'Not specified'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.currentSeverity || 'Not specified'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Start Date</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.duration || 'Not specified'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>End Date</Text>
          <Text style={styles.fieldValue}>
            {travelAnxiety.currentSeverity === 'Resolved' 
              ? 'Resolved' 
              : 'Ongoing'}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {travelAnxiety.currentSeverity === 'Resolved' 
              ? formatDuration(travelAnxiety.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.pastHistory || 'None'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Symptoms</Text>
          <Text style={styles.fieldValue}>
            {travelAnxiety.symptoms && travelAnxiety.symptoms.length > 0
              ? travelAnxiety.symptoms.join(', ')
              : 'Not specified'}
          </Text>
        </View>
      </View>
    </View>
  );
};
