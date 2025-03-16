
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { formatDate } from '@/utils/dateUtils';

interface AppointmentDetailsSectionProps {
  formData: ReportData;
  styles: any;
}

export const AppointmentDetailsSection = ({ formData, styles }: AppointmentDetailsSectionProps) => {
  return (
    <View style={[styles.subsection, { marginBottom: 10 }]}>
      <Text style={[styles.sectionHeader, { marginBottom: 8 }]}>Section 4 - Appointment Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.1 Date of Examination</Text>
          <Text style={styles.fieldValue}>{formatDate(formData.prefilled?.dateOfExamination || '')}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.2 Location</Text>
          <Text style={styles.fieldValue}>{formData.prefilled?.examinationLocation || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.3 Duration</Text>
          <Text style={styles.fieldValue}>{formData.prefilled?.timeSpentWithClaimant || 'Not provided'} minutes</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.4 Accompanied By</Text>
          <Text style={styles.fieldValue}>{formData.prefilled?.accompaniedBy || 'Unaccompanied'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.5 Identity Verification</Text>
          <Text style={styles.fieldValue}>{formData.personal?.idType || 'Photo ID'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.6 Date of Report</Text>
          <Text style={styles.fieldValue}>{formatDate(formData.prefilled?.dateOfReport || '')}</Text>
        </View>
      </View>
    </View>
  );
};
