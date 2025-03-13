
import { Text, View } from '@react-pdf/renderer';

interface InstructionDetailsSectionProps {
  formData: any;
  styles: any;
}

export const InstructionDetailsSection = ({ formData, styles }: InstructionDetailsSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 3 - Instruction Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.1 Agency</Text>
          <Text style={styles.fieldValue}>{formData.agency || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.2 Solicitor</Text>
          <Text style={styles.fieldValue}>{formData.solicitor || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.3 Medco Reference</Text>
          <Text style={styles.fieldValue}>{formData.medcoReference || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>3.4 Review of Records</Text>
          <Text style={styles.fieldValue}>GP Records, A&E Records</Text>
        </View>
      </View>
    </View>
  );
};
