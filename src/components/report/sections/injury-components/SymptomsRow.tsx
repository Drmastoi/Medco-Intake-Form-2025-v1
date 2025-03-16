
import { Text, View } from '@react-pdf/renderer';

interface SymptomsRowProps {
  injuryType: string;
  styles: any;
}

export const SymptomsRow = ({ injuryType, styles }: SymptomsRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Symptoms</Text>
      <Text style={styles.injuryValue}>
        {injuryType === 'Travel Anxiety' 
          ? 'Anxiety, fear of travel, and panic when traveling in a vehicle.' 
          : 'Pain, Stiffness and Discomfort.'}
      </Text>
    </View>
  );
};
