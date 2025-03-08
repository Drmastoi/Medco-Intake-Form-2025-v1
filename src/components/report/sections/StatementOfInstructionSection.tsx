
import { Text, View } from '@react-pdf/renderer';

interface StatementOfInstructionSectionProps {
  styles: any;
}

export const StatementOfInstructionSection = ({ styles }: StatementOfInstructionSectionProps) => {
  return (
    <View style={styles.compactSection}>
      <Text style={styles.sectionHeader}>Statement of Instruction</Text>
      
      <Text style={styles.compactText}>
        This report is entirely independent and is prepared for the injuries sustained in the accident. The instructing party has requested an examination to be conducted with a report to include the nature and extent of the claimant's injuries, treatment received, effects on lifestyle and whether any further treatment is appropriate.
      </Text>
      
      <Text style={styles.compactText}>
        The report is produced for the Court based on the information provided by the client and the instructing party.
      </Text>
    </View>
  );
};
