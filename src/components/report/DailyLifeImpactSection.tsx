import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
  subsection: {
    marginTop: 8,
  },
});

export const DailyLifeImpactSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Impact on Daily Life</Text>

    {/* Work Impact */}
    <View style={styles.subsection}>
      <Text style={styles.text}>Days Off Work: {formData.daysOffWork || "_______"}</Text>
      <Text style={styles.text}>Light Duties/Reduced Hours: {formData.daysLightDuties || "_______"}</Text>
      <Text style={styles.text}>Work Difficulties: {formData.workDifficulties || "_______"}</Text>
    </View>

    {/* Sleep Impact */}
    <View style={styles.subsection}>
      <Text style={styles.text}>Sleep Disturbance: {formData.sleepDisturbance === "1" ? "Yes" : "No"}</Text>
      {formData.sleepDisturbance === "1" && (
        <Text style={styles.text}>Details: {formData.sleepDisturbanceDetails || "_______"}</Text>
      )}
    </View>

    {/* Domestic Life Impact */}
    <View style={styles.subsection}>
      <Text style={styles.text}>Effect on Domestic Living: {formData.effectOnDomesticLiving === "1" ? "Yes" : "No"}</Text>
      {formData.effectOnDomesticLiving === "1" && (
        <Text style={styles.text}>Details: {formData.domesticLivingDetails || "_______"}</Text>
      )}
    </View>

    {/* Sport & Leisure Impact */}
    <View style={styles.subsection}>
      <Text style={styles.text}>Effect on Sport & Leisure: {formData.effectOnSportLeisure === "1" ? "Yes" : "No"}</Text>
      {formData.effectOnSportLeisure === "1" && (
        <Text style={styles.text}>Details: {formData.sportLeisureDetails || "_______"}</Text>
      )}
    </View>

    {/* Social Life Impact */}
    <View style={styles.subsection}>
      <Text style={styles.text}>Effect on Social Life: {formData.effectOnSocialLife === "1" ? "Yes" : "No"}</Text>
      {formData.effectOnSocialLife === "1" && (
        <Text style={styles.text}>Details: {formData.socialLifeDetails || "_______"}</Text>
      )}
    </View>
  </View>
);