
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
});

export const AdditionalInformationSection = ({ formData }: { formData: Partial<FormSchema> }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Additional Information</Text>
    
    <Text style={styles.text}>Additional Information: {formData.additionalInfo ? "Yes" : "No"}</Text>
    {formData.additionalInfo && (
      <Text style={styles.text}>Details: {formData.additionalInfo || "_______"}</Text>
    )}
  </View>
);
