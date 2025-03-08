
import { Text, View } from '@react-pdf/renderer';

interface InstructionDetailsSectionProps {
  formData: any;
  styles: any;
}

export const InstructionDetailsSection = ({ formData, styles }: InstructionDetailsSectionProps) => {
  return (
    <View style={styles.compactSection}>
      <Text style={styles.sectionHeader}>Instruction Details</Text>
      
      <View style={styles.compactFieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.compactFieldLabel}>Agency</Text>
          <Text style={styles.compactFieldValue}>{formData.agency || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.compactFieldLabel}>Solicitor</Text>
          <Text style={styles.compactFieldValue}>{formData.solicitor || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.compactFieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.compactFieldLabel}>Medco Reference</Text>
          <Text style={styles.compactFieldValue}>{formData.medcoReference || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.compactFieldLabel}>Review of Records</Text>
          <Text style={styles.compactFieldValue}>GP Records, A&E Records</Text>
        </View>
      </View>
    </View>
  );
};
