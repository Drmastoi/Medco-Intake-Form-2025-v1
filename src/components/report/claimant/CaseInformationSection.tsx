
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/dateUtils';
import { claimantReportStyles as styles } from '../pdf/styles/claimantReportStyles';

interface CaseInformationSectionProps {
  formData: any;
}

export const CaseInformationSection = ({ formData }: CaseInformationSectionProps) => {
  return (
    <View style={styles.instructionSection}>
      <Text style={styles.subtitle}>Case Information</Text>
      
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
    </View>
  );
};
