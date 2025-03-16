
import { Text, View } from '@react-pdf/renderer';

interface ExpertDetailsSectionProps {
  styles: any;
}

export const ExpertDetailsSection = ({ styles }: ExpertDetailsSectionProps) => {
  return (
    <View style={[styles.subsection, { marginBottom: 10 }]}>
      <Text style={styles.sectionHeader}>Section 1 - Expert Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.1 Medical Expert</Text>
          <Text style={styles.fieldValue}>Dr. Awais Iqbal, Consultant & Direct Medical Expert</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.2 Regulatory</Text>
          <Text style={styles.fieldValue}>GMC - 6138189</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.3 Medco Registration</Text>
          <Text style={styles.fieldValue}>DME 8094</Text>
        </View>
      </View>
    </View>
  );
};
