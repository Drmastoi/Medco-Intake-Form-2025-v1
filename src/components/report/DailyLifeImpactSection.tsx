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
    fontSize: 13,
    marginBottom: 10,
    fontWeight: 'extrabold',
    textTransform: 'uppercase',
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
  return (
    <View style={styles.section}>      
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
  );
};