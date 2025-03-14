
import { Text, View } from '@react-pdf/renderer';
import { ExaminationDetailsSection } from './ExaminationDetailsSection';

interface ExaminationSectionProps {
  formData: any;
  styles: any;
}

export const ExaminationSection = ({ formData, styles }: ExaminationSectionProps) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.sectionHeader}>Medical Examination</Text>
      <ExaminationDetailsSection formData={formData} styles={styles} />
    </View>
  );
};
