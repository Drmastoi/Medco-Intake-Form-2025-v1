
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface StatementOfInstructionSectionProps {
  styles: any;
  formData: ReportData;
}

export const StatementOfInstructionSection = ({ styles, formData }: StatementOfInstructionSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 7 - Statement of Instruction</Text>
      
      <View style={styles.fieldRow}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldValue}>
            I have been instructed by {formData.prefilled.solicitorName || "the solicitor"} of {formData.prefilled.instructingPartyName || "the instructing party"} to examine {formData.personal.fullName || "the claimant"} and to prepare a medico-legal report on the injuries sustained as a result of a road traffic accident which occurred on {formData.accident.accidentDate || "the accident date"}.
          </Text>
        </View>
      </View>
      
      <View style={[styles.fieldRow, { marginTop: 10 }]}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldValue}>
            I have been informed that liability for this accident has been admitted by the defendants.
          </Text>
        </View>
      </View>
      
      <View style={[styles.fieldRow, { marginTop: 10 }]}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldValue}>
            I understand that this report may be disclosed to the Court and therefore I confirm that I have made clear which facts in this report are within my own knowledge, and which are not. Those that are not within my own knowledge are derived from the sources indicated by me.
          </Text>
        </View>
      </View>
    </View>
  );
};
