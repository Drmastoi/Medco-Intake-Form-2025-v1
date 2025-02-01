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

export const DailyLifeSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Impact on Daily Life</Text>
    <Text style={styles.text}>Days off work: {formData.daysOffWork || "Claimant has not reported any days off work"}</Text>
    <Text style={styles.text}>Days on light duties: {formData.daysLightDuties || "Claimant has not reported any light duties"}</Text>
    <Text style={styles.text}>Work Difficulties: {formData.workDifficulties || "Claimant has not reported any work difficulties"}</Text>

    {formData.sleepDisturbance === "1" ? (
      <Text style={styles.text}>Sleep Disturbance: {formData.sleepDisturbanceDetails || "Yes, but no details provided"}</Text>
    ) : (
      <Text style={styles.text}>Claimant has not reported any sleep disturbance</Text>
    )}

    {formData.effectOnDomesticLiving === "1" ? (
      <Text style={styles.text}>Effect on Domestic Living: {formData.domesticLivingDetails || "Yes, but no details provided"}</Text>
    ) : (
      <Text style={styles.text}>Claimant has not reported any effect on domestic living</Text>
    )}

    {formData.effectOnSportLeisure === "1" ? (
      <Text style={styles.text}>Effect on Sport & Leisure: {formData.sportLeisureDetails || "Yes, but no details provided"}</Text>
    ) : (
      <Text style={styles.text}>Claimant has not reported any effect on sport and leisure activities</Text>
    )}

    {formData.effectOnSocialLife === "1" ? (
      <Text style={styles.text}>Effect on Social Life: {formData.socialLifeDetails || "Yes, but no details provided"}</Text>
    ) : (
      <Text style={styles.text}>Claimant has not reported any effect on social life</Text>
    )}
  </View>
);