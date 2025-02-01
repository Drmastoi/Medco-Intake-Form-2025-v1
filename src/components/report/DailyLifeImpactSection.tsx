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
  sectionTitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'extrabold',
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
      "1": "Wife",
      "2": "Husband",
      "3": "Partner",
      "4": "Parents",
      "5": "Alone"
    };
    return livingWithMap[value] || "Not specified";
  };

  const getWorkTypeText = (value: string) => {
    return value === "1" ? "Full Time" : value === "2" ? "Part Time" : "Not specified";
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Employment Position/Education</Text>
      <Text style={styles.text}>Occupation: {formData.occupation || "Not specified"}</Text>
      <Text style={styles.text}>Work Type: {getWorkTypeText(formData.workType)}</Text>
      <Text style={styles.text}>Time taken off work: {formData.daysOffWork || "0"} Days</Text>
      <Text style={styles.text}>Light duties: {formData.daysLightDuties || "0"} Days</Text>
      <Text style={styles.text}>Work Difficulties: {formData.workDifficulties || "None reported"}</Text>
      <Text style={styles.text}>Employment prospects in the open job market would be unaffected because of the injuries.</Text>

      <View style={styles.subsection}>
        <Text style={styles.sectionTitle}>Home Circumstances</Text>
        <Text style={styles.text}>Claimant lives with: {getLivingWithText(formData.livingWith)}</Text>
        <Text style={styles.text}>Number of Children at home: {formData.childrenCount || "0"}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.sectionTitle}>Effects on Daily Life</Text>
        
        {formData.effectOnDomesticLiving === "1" ? (
          <Text style={styles.text}>
            Effects on Domestic Lifestyle: The claimant's ability to perform domestic activities has been mildly restricted. 
            {formData.domesticLivingDetails && `Details: ${formData.domesticLivingDetails}`}
          </Text>
        ) : (
          <Text style={styles.text}>No effects on domestic lifestyle reported.</Text>
        )}

        {formData.effectOnSportLeisure === "1" ? (
          <Text style={styles.text}>
            Effects on Social and Leisure: The claimant's ability to participate in sport & leisure activities is mildly restricted due to pains.
            {formData.sportLeisureDetails && `Details: ${formData.sportLeisureDetails}`}
          </Text>
        ) : (
          <Text style={styles.text}>No effects on social and leisure activities reported.</Text>
        )}

        {formData.sleepDisturbance === "1" ? (
          <Text style={styles.text}>
            Sleep Disturbance: {formData.sleepDisturbanceDetails || "Present but no details provided"}
          </Text>
        ) : (
          <Text style={styles.text}>No sleep disturbance reported.</Text>
        )}
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subtitle}>Psychological Effects</Text>
        <Text style={styles.text}>The claimant continues to drive but is more cautious and vigilant about driving.</Text>
      </View>
    </View>
  );
};