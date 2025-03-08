
import { Text, View } from '@react-pdf/renderer';

interface ExpertDetailsSectionProps {
  styles: any;
}

export const ExpertDetailsSection = ({ styles }: ExpertDetailsSectionProps) => {
  return (
    <View style={[styles.subsection, { marginBottom: 15 }]}>
      <Text style={styles.sectionHeader}>Expert Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Medical Expert</Text>
          <Text style={styles.fieldValue}>Dr. Awais Iqbal, General Practice, Consultant</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Regulatory</Text>
          <Text style={styles.fieldValue}>GMC - 6138189</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Medco Registration</Text>
          <Text style={styles.fieldValue}>DME 8094</Text>
        </View>
      </View>
    </View>
  );
};
