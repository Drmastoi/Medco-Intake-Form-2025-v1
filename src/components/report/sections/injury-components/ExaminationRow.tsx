
import { Text, View } from '@react-pdf/renderer';
import { getExaminationFindings } from '../../utils/injuryClassification';

interface ExaminationRowProps {
  injuryType: string;
  currentSeverity: string | undefined;
  styles: any;
  location?: string;
}

export const ExaminationRow = ({ injuryType, currentSeverity, styles, location }: ExaminationRowProps) => {
  // Get formatted examination findings based on injury type and severity
  const findings = getExaminationFindings(injuryType, currentSeverity || "");
  
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Examination Findings</Text>
      <Text style={styles.injuryValue}>
        {findings}
      </Text>
    </View>
  );
};
