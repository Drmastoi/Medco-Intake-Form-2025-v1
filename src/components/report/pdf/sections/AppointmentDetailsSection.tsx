
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
          <Text style={{ ...styles.fieldLabel, fontSize: 9 }}>4.1 Date & Time</Text>
          <Text style={{ ...styles.fieldValue, fontSize: 9 }}>
            {formData.dateOfExamination ? formatDate(formData.dateOfExamination) : formatDate(new Date().toISOString().split('T')[0])} {formData.examinationTime || '10:00'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={{ ...styles.fieldLabel, fontSize: 9 }}>4.2 Method</Text>
          <Text style={{ ...styles.fieldValue, fontSize: 9 }}>Clinic</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={{ ...styles.fieldLabel, fontSize: 9 }}>4.3 Time Spent</Text>
          <Text style={{ ...styles.fieldValue, fontSize: 9 }}>{formData.timeSpentWithClaimant || '30'} Minutes</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={{ ...styles.fieldLabel, fontSize: 9 }}>4.4 Location</Text>
          <Text style={{ ...styles.fieldValue, fontSize: 9 }}>{formData.examinationLocation || 'Medical Examination Center'}</Text>
        </View>
      </View>
    </View>
  );
};
