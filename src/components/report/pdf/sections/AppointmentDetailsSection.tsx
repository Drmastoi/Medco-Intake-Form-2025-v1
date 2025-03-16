
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface AppointmentDetailsSectionProps {
  formData: ReportData;
  styles: any;
}

export const AppointmentDetailsSection = ({ formData, styles }: AppointmentDetailsSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 4 - Appointment Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>4.1 Date of Examination</Text>
          <Text style={styles.fieldValue}>{formData.prefilled?.dateOfExamination || 'Not provided'}</Text>
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
          <Text style={styles.fieldValue}>{formData.prefilled?.dateOfReport || 'Not provided'}</Text>
        </View>
      </View>
    </View>
  );
};
