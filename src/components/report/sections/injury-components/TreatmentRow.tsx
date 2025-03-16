
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface TreatmentRowProps {
  injuryType: string;
  severity: string | undefined;
  styles: any;
}

export const TreatmentRow = ({ injuryType, severity, styles }: TreatmentRowProps) => {
  
  const getTreatmentRecommendation = (type: string, severity: string | undefined): string => {
    const severityLevel = severity ? parseInt(severity) : 1;
    
    switch (type) {
      case 'Neck':
        return severityLevel === 3 
          ? 'Physiotherapy recommended. In the interim, over-the-counter analgesics as needed for pain relief.' 
          : 'Self-management with gentle stretching exercises. Over-the-counter analgesics as needed for pain relief.';
      case 'Back':
        return severityLevel === 3 
          ? 'Physiotherapy recommended. In the interim, over-the-counter analgesics as needed for pain relief.'
          : 'Self-management with core strengthening exercises. Over-the-counter analgesics as needed for pain relief.';
      case 'Shoulder':
        return severityLevel === 3 
          ? 'Physiotherapy recommended with targeted range-of-motion exercises. Over-the-counter analgesics as needed for pain relief.'
          : 'Self-management with gentle shoulder exercises. Over-the-counter analgesics as needed for pain relief.';
      case 'Headache':
        return 'Over-the-counter analgesics as needed. Stress management techniques and adequate hydration recommended.';
      case 'Travel Anxiety':
        return severityLevel === 3 
          ? 'Referral to psychological services for Cognitive Behavioral Therapy should be considered if symptoms persist beyond 3 months.'
          : 'Self-help strategies including gradual exposure techniques and relaxation exercises.';
      default:
        return 'Symptomatic management with over-the-counter medications as needed.';
    }
  };

  const treatment = getTreatmentRecommendation(injuryType, severity);
  
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Treatment</Text>
      <View style={{ width: '70%' }}>
        <Text style={styles.injuryValue}>{treatment}</Text>
        {(injuryType === 'Neck' || injuryType === 'Back' || injuryType === 'Shoulder') && severity === "3" && (
          <View style={{ 
            backgroundColor: colorScheme.altSectionBg, 
            padding: 5, 
            marginTop: 3, 
            borderRadius: 2 
          }}>
            <Text style={{ fontSize: 8, fontStyle: 'italic', color: colorScheme.textSecondary }}>
              Note: Early intervention with physiotherapy may reduce recovery time and improve long-term outcomes.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
