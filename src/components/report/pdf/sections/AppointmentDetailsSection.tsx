
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '@/utils/dateUtils';
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
          <Text style={styles.fieldLabel}>Date of Appointment:</Text>
          <Text style={styles.fieldValue}>
            {formData.prefilled.dateOfExamination 
              ? formatDate(formData.prefilled.dateOfExamination) + " 11:30" 
              : "Not Specified"}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Method:</Text>
          <Text style={styles.fieldValue}>Clinic</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Time Spent:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.timeSpentWithClaimant || "15"} Minutes</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Place of Examination:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.examinationLocation}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Date of Report:</Text>
          <Text style={styles.fieldValue}>
            {formData.prefilled.dateOfReport
              ? formatDate(formData.prefilled.dateOfReport)
              : formatDate(new Date().toISOString())}
          </Text>
        </View>
      </View>
    </View>
  );
};
