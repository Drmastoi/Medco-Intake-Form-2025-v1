
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface SymptomsRowProps {
  injuryType: string;
  styles: any;
}

export const SymptomsRow = ({ injuryType, styles }: SymptomsRowProps) => {
  const getSymptoms = (type: string): string => {
    switch (type) {
      case 'Neck':
        return 'Pain, stiffness, reduced range of movement, and discomfort when turning the head.';
      case 'Back':
        return 'Pain, stiffness, difficulty bending, and discomfort when sitting for prolonged periods.';
      case 'Shoulder':
        return 'Pain, limited movement, difficulty raising the arm above head level, and discomfort when carrying objects.';
      case 'Headache':
        return 'Throbbing pain, pressure sensation, sensitivity to light and sound, and occasional dizziness.';
      case 'Travel Anxiety':
        return 'Anxiety, fear of travel, panic attacks, hypervigilance, and avoidance behaviors when traveling in a vehicle.';
      default:
        return 'Pain, Stiffness and Discomfort.';
    }
  };

  const symptoms = getSymptoms(injuryType);

  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Symptoms</Text>
      <View style={{ width: '70%' }}>
        <Text style={styles.injuryValue}>{symptoms}</Text>
        {injuryType === 'Travel Anxiety' && (
          <View style={{ 
            backgroundColor: colorScheme.altSectionBg, 
            padding: 5,
            marginTop: 3,
            borderRadius: 2
          }}>
            <Text style={{ 
              fontSize: 8, 
              fontStyle: 'italic',
              color: colorScheme.textSecondary 
            }}>
              Note: Psychological symptoms can persist longer than physical injuries and may require specialized treatment.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
