
import { Text, View } from '@react-pdf/renderer';
import { getOICTariff } from '../../utils/injuryClassification';

interface OICTariffRowProps {
  injuryType: string;
  location?: string;
  styles: any;
}

export const OICTariffRow = ({ injuryType, location, styles }: OICTariffRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>OIC Tariff</Text>
      <Text style={styles.injuryValue}>{injuryType === 'Travel Anxiety' ? 
        "This psychological symptom is not directly included in the OIC Tariff but can be considered alongside the primary injuries." :
        getOICTariff(injuryType, location)}</Text>
    </View>
  );
};
