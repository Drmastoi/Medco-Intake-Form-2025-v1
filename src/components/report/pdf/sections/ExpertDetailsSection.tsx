
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface ExpertDetailsSectionProps {
  styles: any;
  formData: ReportData;
}

export const ExpertDetailsSection = ({ styles, formData }: ExpertDetailsSectionProps) => {
  return (
    <View style={[styles.subsection, { marginBottom: 10 }]}>
      <Text style={styles.sectionHeader}>Section 2 - Expert Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Medical Expert:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.expertName || "Dr. Sam Smith"}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Specialty:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.expertSpecialty || "General Practice, Consultant"}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>GMC:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.gmcNumber || "1234567"}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Medco Registration:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.medcoReference || "Not Provided"}</Text>
        </View>
      </View>
    </View>
  );
};
