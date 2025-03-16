
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { formatDate } from '../../../../utils/dateUtils';

interface ExpertDetailsSectionProps {
  formData: ReportData;
  styles: any;
}

export const ExpertDetailsSection = ({ formData, styles }: ExpertDetailsSectionProps) => {
  // Use UK date format for report date
  const reportDate = formatDate(formData.prefilled?.dateOfReport || new Date().toISOString().split('T')[0]);
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 3 - Expert Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.1 Expert Name</Text>
          <Text style={styles.fieldValue}>Dr. {formData.prefilled?.expertName || 'Awais Iqbal'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.2 Speciality</Text>
          <Text style={styles.fieldValue}>{formData.prefilled?.expertSpecialty || 'General Practice'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.3 GMC/Registration Number</Text>
          <Text style={styles.fieldValue}>{formData.prefilled?.gmcNumber || '6138189'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.4 Report Date</Text>
          <Text style={styles.fieldValue}>{reportDate}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.5 MedCo Reference</Text>
          <Text style={styles.fieldValue}>{formData.prefilled?.medcoReference || 'DME 8094'}</Text>
        </View>
      </View>
    </View>
  );
};
