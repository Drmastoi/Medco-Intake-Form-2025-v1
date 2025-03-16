
import { Text, View } from '@react-pdf/renderer';
import { formatDuration, formatSeverity, safeValue } from '../../utils/formatUtils';

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
          <Text style={styles.fieldValue}>{formatSeverity(travelAnxiety.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(travelAnxiety.currentSeverity)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Symptoms</Text>
          <Text style={styles.fieldValue}>
            {travelAnxiety.symptoms && travelAnxiety.symptoms.length > 0 
              ? travelAnxiety.symptoms.join(", ") 
              : "Not specified"}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Currently Driving</Text>
          <Text style={styles.fieldValue}>{safeValue(travelAnxiety.currentlyDriving)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(travelAnxiety.currentSeverity) === 'Resolved' 
              ? formatDuration(travelAnxiety.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{safeValue(travelAnxiety.pastHistory, 'None')}</Text>
        </View>
      </View>
    </View>
  );
};
