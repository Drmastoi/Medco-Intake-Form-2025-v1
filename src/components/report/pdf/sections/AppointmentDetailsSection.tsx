
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '../../../../utils/dateUtils';

interface AppointmentDetailsSectionProps {
  formData: any;
  styles: any;
}

export const AppointmentDetailsSection = ({ formData, styles }: AppointmentDetailsSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 4 - Appointment Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.1 Date of Appointment</Text>
          <Text style={styles.fieldValue}>
            {formData.dateOfExamination ? formatDate(formData.dateOfExamination) : formatDate(new Date().toISOString().split('T')[0])} {formData.examinationTime || '10:00'}
            {'\nMethod - Clinic'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.2 Time spent</Text>
          <Text style={styles.fieldValue}>30 Minutes</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.3 Place of Examination</Text>
          <Text style={styles.fieldValue}>{formData.examinationLocation || 'Medical Examination Center, London, UNITED KINGDOM'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.4 Date of Report</Text>
          <Text style={styles.fieldValue}>{formData.dateOfReport ? formatDate(formData.dateOfReport) : formatDate(new Date().toISOString().split('T')[0])}</Text>
        </View>
      </View>
    </View>
  );
};
