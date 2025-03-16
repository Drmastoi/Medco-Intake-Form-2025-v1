
import { Text, View } from '@react-pdf/renderer';
import { getTreatmentRecommendation } from '../../utils/injuryClassification';

interface TreatmentRowProps {
  injuryType: string;
  currentSeverity: string | undefined;
  styles: any;
}

export const TreatmentRow = ({ injuryType, currentSeverity, styles }: TreatmentRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Treatment Recommendation</Text>
      <Text style={styles.injuryValue}>
        {injuryType === 'Travel Anxiety' ? 
          "Self-help measures including gradual exposure to travel situations, relaxation techniques, and breathing exercises. If symptoms persist or worsen, referral for brief psychological intervention may be beneficial." :
          getTreatmentRecommendation(currentSeverity || "", injuryType)}
      </Text>
    </View>
  );
};
