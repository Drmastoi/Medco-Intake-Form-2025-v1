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

const formatCheckboxList = (items: string[] = [], otherText?: string) => {
  if (!items.length) return '';
  const mainItems = items.filter(item => item !== 'other');
  const formattedList = mainItems.join(', ');
  return otherText ? `${formattedList}${mainItems.length ? ', and ' : ''}${otherText}` : formattedList;
};

export const DailyLifeImpactSection = ({ formData }: { formData: any }) => {
  const formatWorkDifficulties = () => {
    const difficulties = formatCheckboxList(formData.workDifficulties, formData.otherWorkDifficulties);
    if (!difficulties) return "No specific work difficulties reported.";
    return `The claimant reports difficulties with ${difficulties}.`;
  };

  const formatSleepDisturbances = () => {
    const disturbances = formatCheckboxList(formData.sleepDisturbances, formData.otherSleepDisturbances);
    if (!disturbances) return "No sleep disturbances reported.";
    return `The claimant experiences sleep disturbances including ${disturbances}.`;
  };

  const formatDomesticEffects = () => {
    const effects = formatCheckboxList(formData.domesticEffects, formData.otherDomesticEffects);
    if (!effects) return "No effects on domestic activities reported.";
    return `The claimant's domestic activities are affected, specifically with ${effects}.`;
  };

  const formatSportLeisureEffects = () => {
    const effects = formatCheckboxList(formData.sportLeisureEffects, formData.otherSportLeisureEffects);
    if (!effects) return "No effects on sport and leisure activities reported.";
    return `The claimant's sport and leisure activities are affected, particularly ${effects}.`;
  };

  const formatSocialLifeEffects = () => {
    const effects = formatCheckboxList(formData.socialLifeEffects, formData.otherSocialLifeEffects);
    if (!effects) return "No effects on social life reported.";
    return `The claimant's social life is affected, specifically regarding ${effects}.`;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Impact on Daily Life</Text>
      
      <View style={styles.subsection}>
        <Text style={styles.text}>
          {formData.daysOffWork ? 
            `The claimant took ${formData.daysOffWork} days off work following the accident.` :
            "The claimant did not take any days off work."}
        </Text>
        
        {formData.daysLightDuties && (
          <Text style={styles.text}>
            They were on light duties or reduced hours for ${formData.daysLightDuties} days.
          </Text>
        )}
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatWorkDifficulties()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatSleepDisturbances()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatDomesticEffects()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatSportLeisureEffects()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatSocialLifeEffects()}</Text>
      </View>

      {formData.additionalInformation === "1" && formData.additionalInformationDetails && (
        <View style={styles.subsection}>
          <Text style={styles.text}>
            Additional Information: {formData.additionalInformationDetails}
          </Text>
        </View>
      )}
    </View>
  );
};