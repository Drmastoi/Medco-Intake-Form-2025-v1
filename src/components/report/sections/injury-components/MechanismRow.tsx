
import { Text, View } from '@react-pdf/renderer';
import { getMechanismOfInjury } from '../../utils/injuryClassification';

interface MechanismRowProps {
  injuryType: string;
  location?: string;
  styles: any;
}

export const MechanismRow = ({ injuryType, location, styles }: MechanismRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Mechanism of Injury</Text>
      <Text style={styles.injuryValue}>
        {injuryType === 'Travel Anxiety' ? 
          "Psychological Impact. The traumatic experience of the accident has led to anxiety when traveling in vehicles." :
          getMechanismOfInjury(injuryType, location)}
      </Text>
    </View>
  );
};
