
import { Text, View } from '@react-pdf/renderer';

interface SimilarSymptomsRowProps {
  injuryType: string;
  hasAnxietyHistory: string | undefined;
  anxietyPastHistory: string | undefined;
  styles: any;
}

export const SimilarSymptomsRow = ({ 
  injuryType, 
  hasAnxietyHistory, 
  anxietyPastHistory, 
  styles 
}: SimilarSymptomsRowProps) => {
  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Similar symptoms</Text>
      <Text style={styles.injuryValue}>
        {injuryType === 'Travel Anxiety' && hasAnxietyHistory === "yes" ?
          `The Claimant reported a prior history of anxiety: ${anxietyPastHistory || "details not specified"}. The current travel anxiety symptoms are distinctly related to this specific accident.` :
          "The Claimant reported no prior similar symptoms before the index accident, indicating that there were no pre-existing symptoms that could have been exacerbated by the accident."}
      </Text>
    </View>
  );
};
