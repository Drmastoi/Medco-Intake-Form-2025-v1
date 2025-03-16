
import { Text, View } from '@react-pdf/renderer';

interface ConcludingStatementProps {
  styles: any;
}

export const ConcludingStatement = ({ styles }: ConcludingStatementProps) => {
  return (
    <View style={{ marginTop: 20, marginBottom: 10 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>Concluding Statement</Text>
      
      <Text style={styles.fieldValue}>
        Based on the history provided by the claimant and my clinical examination, the injuries
        sustained are consistent with the type of accident described. The symptoms and their
        progression follow the expected pattern for injuries of this nature.
      </Text>
      
      <Text style={[styles.fieldValue, { marginTop: 8 }]}>
        The prognosis outlined for each injury represents my professional opinion on the expected
        recovery period, taking into account the claimant's age, general health status, and the
        nature of the injuries sustained. This prognosis assumes that the claimant follows the
        recommended treatment advice and that no complications arise during the recovery process.
      </Text>
      
      <Text style={[styles.fieldValue, { marginTop: 8 }]}>
        If the claimant's symptoms persist beyond the anticipated recovery period, I would
        recommend a reassessment to determine if any additional treatment or investigation
        is required.
      </Text>
    </View>
  );
};
