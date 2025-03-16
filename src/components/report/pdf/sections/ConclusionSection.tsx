
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface ConclusionSectionProps {
  formData: ReportData;
  styles: any;
}

export const ConclusionSection = ({ formData, styles }: ConclusionSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 16 - Conclusion</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>16.1 Assessment Summary</Text>
        <Text style={styles.fieldValue}>
          Based on my examination and the information provided by the claimant, I believe that the injuries described are consistent with the mechanism of the accident as described. The injuries are in keeping with those typically seen in this type of road traffic accident.
        </Text>
      </View>
    </View>
  );
};
