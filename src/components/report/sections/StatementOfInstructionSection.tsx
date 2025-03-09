
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/dateUtils';

interface StatementOfInstructionSectionProps {
  styles: any;
  formData: any;
}

export const StatementOfInstructionSection = ({ styles, formData }: StatementOfInstructionSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Statement of Instruction</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Solicitor's Name</Text>
          <Text style={styles.fieldValue}>{formData.solicitorName || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Solicitor's Reference</Text>
          <Text style={styles.fieldValue}>{formData.solicitorReference || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Instructing Party</Text>
          <Text style={styles.fieldValue}>{formData.instructingPartyName || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Instructing Party Reference</Text>
          <Text style={styles.fieldValue}>{formData.instructingPartyReference || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Location of Examination</Text>
          <Text style={styles.fieldValue}>{formData.examinationLocation || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Medco Reference</Text>
          <Text style={styles.fieldValue}>{formData.medcoReference || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Date of Examination</Text>
          <Text style={styles.fieldValue}>{formData.dateOfExamination ? formatDate(formData.dateOfExamination) : 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Date of Report</Text>
          <Text style={styles.fieldValue}>{formData.dateOfReport ? formatDate(formData.dateOfReport) : formatDate(new Date().toISOString())}</Text>
        </View>
      </View>
      
      <Text style={styles.disclaimerText}>
        This report is entirely independent and is prepared for the injuries sustained in the accident. The instructing party has requested an examination to be conducted with a report to include the nature and extent of the claimant's injuries, treatment received, effects on lifestyle and whether any further treatment is appropriate.
      </Text>
      
      <Text style={styles.disclaimerText}>
        The report is produced for the Court based on the information provided by the client and the instructing party.
      </Text>
    </View>
  );
};
