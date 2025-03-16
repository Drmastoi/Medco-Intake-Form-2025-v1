
import { Text, View } from '@react-pdf/renderer';

interface OnsetRowProps {
  painStart: string | undefined;
  styles: any;
}

export const OnsetRow = ({ painStart, styles }: OnsetRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Onset</Text>
      <Text style={styles.injuryValue}>
        The Claimant recalls the symptoms beginning 
        {painStart === "1" ? " immediately after" :
         painStart === "2" ? " the day after" :
         painStart === "3" ? " a few days after" : 
         painStart === "4" ? " within 1 days of" : " sometime after"} 
        the accident/incident.
      </Text>
    </View>
  );
};
