
import { Text, View } from '@react-pdf/renderer';
import { getInjuryClassification, getPrognosis, getTreatmentRecommendation } from '../utils/injuryClassification';

interface InjuryTableRowProps {
  injuryName: string;
  additionalInfo?: string;
  currentSeverity: string;
  resolveDays?: string;
  injuryType: string;
  location?: string;
  styles: any;
}

export const InjuryTableRow = ({
  injuryName,
  additionalInfo = '',
  currentSeverity,
  resolveDays,
  injuryType,
  location,
  styles
}: InjuryTableRowProps) => {
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 1.5 }]}>
        {injuryName}{additionalInfo ? ` (${additionalInfo})` : ''}
      </Text>
      <Text style={[styles.tableCell, { flex: 1.5 }]}>
        {getInjuryClassification(injuryType, location)}
      </Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>
        {currentSeverity === "4" ? `${resolveDays || "Unknown"} Days` : getPrognosis(currentSeverity)}
      </Text>
      <Text style={[styles.tableCell, { flex: 2 }]}>
        {getTreatmentRecommendation(currentSeverity, injuryType)}
      </Text>
    </View>
  );
};
