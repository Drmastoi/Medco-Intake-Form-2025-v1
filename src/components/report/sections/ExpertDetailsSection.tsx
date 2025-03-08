
import { Text, View } from '@react-pdf/renderer';

interface ExpertDetailsSectionProps {
  styles: any;
}

export const ExpertDetailsSection = ({ styles }: ExpertDetailsSectionProps) => {
  return (
    <View style={styles.compactSection}>
      <Text style={styles.sectionHeader}>Expert Details</Text>
      
      <View style={styles.compactFieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.compactFieldLabel}>Medical Expert</Text>
          <Text style={styles.compactFieldValue}>Dr. Awais Iqbal, GP Consultant</Text>
        </View>
      </View>
      
      <View style={styles.compactFieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.compactFieldLabel}>Regulatory</Text>
          <Text style={styles.compactFieldValue}>GMC - 6138189</Text>
        </View>
      </View>
      
      <View style={styles.compactFieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.compactFieldLabel}>Medco Registration</Text>
          <Text style={styles.compactFieldValue}>DME 8094</Text>
        </View>
      </View>
    </View>
  );
};
