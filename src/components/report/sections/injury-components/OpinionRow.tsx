
import { Text, View } from '@react-pdf/renderer';
import { getOpinion } from '../../utils/injuryClassification';

interface OpinionRowProps {
  injuryType: string;
  location?: string;
  styles: any;
}

export const OpinionRow = ({ injuryType, location, styles }: OpinionRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Opinion</Text>
      <Text style={styles.injuryValue}>
        {injuryType === 'Travel Anxiety' ? 
          "The reported travel anxiety is directly attributed to the index accident. The symptoms are consistent with the history provided and the nature of the accident." :
          getOpinion(injuryType, location)}
      </Text>
    </View>
  );
};
