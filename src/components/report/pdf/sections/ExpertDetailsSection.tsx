
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
          <Text style={styles.fieldValue}>Dr. Awais Iqbal</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Specialty:</Text>
          <Text style={styles.fieldValue}>General Practice, Consultant</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>GMC:</Text>
          <Text style={styles.fieldValue}>6138189</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Medco Registration:</Text>
          <Text style={styles.fieldValue}>DME 8094</Text>
        </View>
      </View>
    </View>
  );
};
