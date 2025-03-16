
import { Text, View } from '@react-pdf/renderer';

interface InitialSeverityRowProps {
  initialSeverity: string | undefined;
  injuryType: string;
  styles: any;
}

export const InitialSeverityRow = ({ initialSeverity, injuryType, styles }: InitialSeverityRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Initial Severity</Text>
      <Text style={styles.injuryValue}>
        The symptoms were 
        {initialSeverity === "1" ? " mild." :
         initialSeverity === "2" ? " moderate." :
         initialSeverity === "3" ? 
          ` severe. They were severe for a period of ${injuryType === 'Back' ? '7' : injuryType === 'Shoulder' ? '3' : '2'} days.` : 
          "."}
      </Text>
    </View>
  );
};
