
import { Text, View } from '@react-pdf/renderer';
import { formatDuration, formatSeverity, safeValue } from '../../../utils/formatUtils';

interface TravelAnxietyComponentProps {
  travelAnxiety: any;
  styles: any;
}

export const TravelAnxietyComponent = ({ travelAnxiety, styles }: TravelAnxietyComponentProps) => {
  if (!travelAnxiety?.hasAnxiety) return null;

  // Safely handle symptoms array
  const symptomsText = (() => {
    if (!travelAnxiety.symptoms) return 'Not specified';
    if (!Array.isArray(travelAnxiety.symptoms)) return 'Not specified';
    if (travelAnxiety.symptoms.length === 0) return 'Not specified';
    
    try {
      return travelAnxiety.symptoms.join(', ');
    } catch (error) {
      console.error("Error joining symptoms:", error);
      return 'Not specified';
    }
  })();

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
          <Text style={styles.fieldLabel}>Start Date</Text>
          <Text style={styles.fieldValue}>{safeValue(travelAnxiety.duration)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>End Date</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(travelAnxiety.currentSeverity) === 'Resolved' 
              ? 'Resolved' 
              : 'Ongoing'}
          </Text>
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
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Symptoms</Text>
          <Text style={styles.fieldValue}>{symptomsText}</Text>
        </View>
      </View>
    </View>
  );
};
