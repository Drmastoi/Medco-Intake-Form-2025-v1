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

export const DailyLifeImpactSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Impact on Daily Life</Text>
    <Text style={styles.text}>Days Off Work: {formData.daysOffWork || "_______"}</Text>
    <Text style={styles.text}>Days on Light Duties: {formData.daysLightDuties || "_______"}</Text>
    <Text style={styles.text}>Work Difficulties: {formData.workDifficulties || "_______"}</Text>
    <Text style={styles.text}>Sleep Disturbance: {formData.sleepDisturbance === "1" ? "Yes" : "No"}</Text>
    {formData.sleepDisturbance === "1" && (
      <Text style={styles.text}>Details: {formData.sleepDisturbanceDetails || "_______"}</Text>
    )}
    <Text style={styles.text}>Effect on Domestic Living: {formData.effectOnDomesticLiving === "1" ? "Yes" : "No"}</Text>
    {formData.effectOnDomesticLiving === "1" && (
      <Text style={styles.text}>Details: {formData.domesticLivingDetails || "_______"}</Text>
    )}
  </View>
);