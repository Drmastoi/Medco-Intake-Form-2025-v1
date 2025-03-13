
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface InstructionDetailsSectionProps {
  formData: ReportData;
  styles: any;
}

export const InstructionDetailsSection = ({ formData, styles }: InstructionDetailsSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 3 - Instruction Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Agency:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.instructingPartyName} ({formData.prefilled.instructingPartyReference || "Not Provided"})</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Solicitor:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.solicitorName}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Medco Reference:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.medcoReference}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Review of Records:</Text>
          <Text style={styles.fieldValue}>A&E</Text>
        </View>
      </View>
    </View>
  );
};
