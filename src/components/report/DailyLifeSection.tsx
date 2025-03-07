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
  paragraph: {
    marginBottom: 10,
  },
});

const formatList = (items: string[] = [], otherText?: string) => {
  if (!items.length) return '';
  const mainItems = items.filter(item => item !== 'other');
  const formattedList = mainItems.join(', ');
  return otherText ? `${formattedList}${mainItems.length ? ', and ' : ''}${otherText}` : formattedList;
};

export const DailyLifeSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Impact on Daily Life</Text>

    <View style={styles.paragraph}>
      <Text style={styles.text}>
        {formData.daysOffWork ? 
          `Following the accident, the claimant required ${formData.daysOffWork} days off work. ` :
          "The claimant did not require any time off work. "}
        {formData.daysLightDuties ? 
          `They subsequently worked on light duties for ${formData.daysLightDuties} days. ` :
          ""}
      </Text>
    </View>

    {formData.workDifficulties?.length > 0 && (
      <View style={styles.paragraph}>
        <Text style={styles.text}>
          The claimant reports experiencing difficulties at work with: {formatList(formData.workDifficulties, formData.otherWorkDifficulties)}.
        </Text>
      </View>
    )}

    {formData.sleepDisturbance === "1" && (
      <View style={styles.paragraph}>
        <Text style={styles.text}>
          Sleep has been significantly affected. The claimant reports: {formatList(formData.sleepDisturbances, formData.otherSleepDisturbances)}.
        </Text>
      </View>
    )}

    {formData.effectOnDomesticLiving === "1" && (
      <View style={styles.paragraph}>
        <Text style={styles.text}>
          Daily domestic activities have been impacted, particularly: {formatList(formData.domesticEffects, formData.otherDomesticEffects)}.
        </Text>
      </View>
    )}

    {formData.effectOnSportLeisure === "1" && (
      <View style={styles.paragraph}>
        <Text style={styles.text}>
          Sport and leisure activities have been affected, specifically: {formatList(formData.sportLeisureEffects, formData.otherSportLeisureEffects)}.
        </Text>
      </View>
    )}

    {formData.effectOnSocialLife === "1" && (
      <View style={styles.paragraph}>
        <Text style={styles.text}>
          Social activities have been impacted, particularly: {formatList(formData.socialLifeEffects, formData.otherSocialLifeEffects)}.
        </Text>
      </View>
    )}
  </View>
);