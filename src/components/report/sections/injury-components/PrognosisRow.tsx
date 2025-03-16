
import { Text, View } from '@react-pdf/renderer';
import { getPrognosis } from '../../utils/injuryClassification';

interface PrognosisRowProps {
  injuryType: string;
  currentSeverity: string | undefined;
  resolveDays: string | undefined;
  styles: any;
}

export const PrognosisRow = ({ 
  injuryType, 
  currentSeverity, 
  resolveDays,
  styles 
}: PrognosisRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Prognosis</Text>
      <Text style={styles.injuryValue}>
        {injuryType === 'Travel Anxiety' ?
          (currentSeverity === "4" ? 
            `Resolved within ${resolveDays || "1"} days from the date of accident.` :
            currentSeverity === "1" ? 
              "3 months from the date of accident." :
            currentSeverity === "2" ? 
              "6 months from the date of accident." :
            currentSeverity === "3" ? 
              "9 months from the date of accident. (The extended prognosis is due to the severity of the symptoms.)" :
            "6 months from the date of accident.") :
          getPrognosis(currentSeverity || "")
        }
        {currentSeverity === "3" && injuryType !== 'Travel Anxiety' && " - The extended prognosis is due to the severity of the symptoms."}
      </Text>
    </View>
  );
};
