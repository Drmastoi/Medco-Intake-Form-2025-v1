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

export const DailyLifeImpactSection = ({ formData }: { formData: any }) => {
  const getLivingWithText = (value: string) => {
    const livingWithMap: { [key: string]: string } = {
      "1": "their wife",
      "2": "their husband",
      "3": "their partner",
      "4": "their parents",
      "5": "alone"
    };
    return livingWithMap[value] || "in an unspecified arrangement";
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Employment Position/Education</Text>
      <Text style={styles.text}>
        The claimant is employed as a {formData.occupation || "not specified"} on a 
        {formData.workType === "1" ? " full-time" : formData.workType === "2" ? " part-time" : ""} basis. 
        Following the accident, they required {formData.daysOffWork || "0"} days off work and 
        {formData.daysLightDuties || "0"} days of light duties. 
        {formData.workDifficulties && `They reported difficulties with ${formData.workDifficulties}.`}
      </Text>

      <View style={styles.subsection}>
        <Text style={styles.subtitle}>Home Circumstances</Text>
        <Text style={styles.text}>
          The claimant lives {getLivingWithText(formData.livingWith)}
          {formData.childrenCount && formData.childrenCount !== "0" 
            ? ` with ${formData.childrenCount} children at home` 
            : ""}.
        </Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subtitle}>Effects on Daily Life</Text>
        <Text style={styles.text}>
          {formData.effectOnDomesticLiving === "1" 
            ? `The accident has impacted the claimant's ability to perform domestic activities. ${formData.domesticLivingDetails || ""}`
            : "The claimant reports no significant impact on their domestic activities."}
        </Text>
        
        <Text style={styles.text}>
          {formData.effectOnSportLeisure === "1"
            ? `Their participation in sports and leisure activities has been affected. ${formData.sportLeisureDetails || ""}`
            : "Their ability to participate in sports and leisure activities remains unchanged."}
        </Text>

        <Text style={styles.text}>
          {formData.sleepDisturbance === "1"
            ? `The claimant reports sleep disturbance following the accident. ${formData.sleepDisturbanceDetails || ""}`
            : "No sleep disturbance has been reported."}
        </Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subtitle}>Psychological Effects</Text>
        <Text style={styles.text}>
          {formData.travelAnxiety === "1"
            ? "The claimant reports experiencing travel anxiety following the accident. " +
              (formData.currentlyDriving === "2" ? "They have not yet returned to driving. " : "They continue to drive but with increased caution. ") +
              (formData.moreCautious === "1" ? "They report being more vigilant while traveling. " : "") +
              (formData.checkingMirrors === "1" ? "They frequently check their mirrors and are hypervigilant. " : "")
            : "The claimant reports no significant psychological impact from the accident."}
        </Text>
      </View>
    </View>
  );
};