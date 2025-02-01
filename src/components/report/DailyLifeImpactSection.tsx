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
      <Text style={styles.subtitle}>1. Work Impact</Text>
      <Text style={styles.text}>Days Off Work: {formData.daysOffWork || "_______"}</Text>
      <Text style={styles.text}>Light Duties/Reduced Hours: {formData.daysLightDuties || "_______"} days</Text>
      <Text style={styles.text}>Work Difficulties: {formData.workDifficulties || "_______"}</Text>
      <Text style={styles.text}>Current Work Status: {
        formData.currentWorkStatus === "1" ? "Returned to normal duties" :
        formData.currentWorkStatus === "2" ? "On light duties" :
        formData.currentWorkStatus === "3" ? "Still off work" : "_______"
      }</Text>
    </View>

    {/* Sleep Impact */}
    <View style={styles.subsection}>
      <Text style={styles.subtitle}>2. Sleep Disturbance</Text>
      <Text style={styles.text}>Present: {formData.sleepDisturbance === "1" ? "Yes" : "No"}</Text>
      {formData.sleepDisturbance === "1" && (
        <>
          <Text style={styles.text}>Nature of Disturbance: {formData.sleepDisturbanceDetails || "_______"}</Text>
          <Text style={styles.text}>Duration: {formData.sleepDisturbanceDuration || "_______"} days</Text>
          <Text style={styles.text}>Current Status: {
            formData.sleepDisturbanceStatus === "1" ? "Resolved" :
            formData.sleepDisturbanceStatus === "2" ? "Improving" :
            formData.sleepDisturbanceStatus === "3" ? "Unchanged" : "_______"
          }</Text>
        </>
      )}
    </View>

    {/* Domestic Life Impact */}
    <View style={styles.subsection}>
      <Text style={styles.subtitle}>3. Effect on Domestic Living</Text>
      <Text style={styles.text}>Present: {formData.effectOnDomesticLiving === "1" ? "Yes" : "No"}</Text>
      {formData.effectOnDomesticLiving === "1" && (
        <>
          <Text style={styles.text}>Activities Affected: {formData.domesticLivingDetails || "_______"}</Text>
          <Text style={styles.text}>Duration of Impact: {formData.domesticLivingDuration || "_______"} days</Text>
          <Text style={styles.text}>Current Status: {
            formData.domesticLivingStatus === "1" ? "Resolved" :
            formData.domesticLivingStatus === "2" ? "Improving" :
            formData.domesticLivingStatus === "3" ? "Unchanged" : "_______"
          }</Text>
        </>
      )}
    </View>

    {/* Sport & Leisure Impact */}
    <View style={styles.subsection}>
      <Text style={styles.subtitle}>4. Effect on Sport & Leisure</Text>
      <Text style={styles.text}>Present: {formData.effectOnSportLeisure === "1" ? "Yes" : "No"}</Text>
      {formData.effectOnSportLeisure === "1" && (
        <>
          <Text style={styles.text}>Activities Affected: {formData.sportLeisureDetails || "_______"}</Text>
          <Text style={styles.text}>Duration of Impact: {formData.sportLeisureDuration || "_______"} days</Text>
          <Text style={styles.text}>Current Status: {
            formData.sportLeisureStatus === "1" ? "Resolved" :
            formData.sportLeisureStatus === "2" ? "Improving" :
            formData.sportLeisureStatus === "3" ? "Unchanged" : "_______"
          }</Text>
        </>
      )}
    </View>

    {/* Social Life Impact */}
    <View style={styles.subsection}>
      <Text style={styles.subtitle}>5. Effect on Social Life</Text>
      <Text style={styles.text}>Present: {formData.effectOnSocialLife === "1" ? "Yes" : "No"}</Text>
      {formData.effectOnSocialLife === "1" && (
        <>
          <Text style={styles.text}>Activities Affected: {formData.socialLifeDetails || "_______"}</Text>
          <Text style={styles.text}>Duration of Impact: {formData.socialLifeDuration || "_______"} days</Text>
          <Text style={styles.text}>Current Status: {
            formData.socialLifeStatus === "1" ? "Resolved" :
            formData.socialLifeStatus === "2" ? "Improving" :
            formData.socialLifeStatus === "3" ? "Unchanged" : "_______"
          }</Text>
        </>
      )}
    </View>
  </View>
);