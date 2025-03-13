
import { Text, View } from '@react-pdf/renderer';
import { ExaminationDetailsSection } from './ExaminationDetailsSection';

interface ExaminationSectionProps {
  formData: any;
  styles: any;
}

export const ExaminationSection = ({ formData, styles }: ExaminationSectionProps) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.sectionHeader}>Section 7 - Medical Examination</Text>
      <ExaminationDetailsSection formData={formData} styles={styles} />
    </View>
  );
};
