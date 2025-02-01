import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
  },
});

export const AdditionalInformationSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Additional Information</Text>
    {formData.additionalInformation === "1" && (
      <Text style={styles.text}>{formData.additionalInformationDetails || "_______"}</Text>
    )}
  </View>
);