
import { Text, View } from '@react-pdf/renderer';
import { getExaminationFindings } from '../../utils/injuryClassification';

interface ExaminationRowProps {
  injuryType: string;
  currentSeverity: string | undefined;
  styles: any;
}

export const ExaminationRow = ({ injuryType, currentSeverity, styles }: ExaminationRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Examination Findings</Text>
      <Text style={styles.injuryValue}>
        {injuryType === 'Travel Anxiety' ? 
          "Normal mood, good eye contact, no signs of acute distress during examination. The patient reports anxiety specifically when traveling in vehicles." :
          getExaminationFindings(injuryType, currentSeverity || "")}
      </Text>
    </View>
  );
};
