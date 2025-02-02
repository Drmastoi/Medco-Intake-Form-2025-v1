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
  if (!items.length && !otherText) return '';
  
  const mainItems = items.filter(item => item !== 'other');
  let formattedText = '';
  
  if (mainItems.length) {
    if (mainItems.length === 1) {
      formattedText = mainItems[0];
    } else if (mainItems.length === 2) {
      formattedText = `${mainItems[0]} and ${mainItems[1]}`;
    } else {
      const lastItem = mainItems.pop();
      formattedText = `${mainItems.join(', ')}, and ${lastItem}`;
    }
  }
  
  if (otherText) {
    formattedText = formattedText ? `${formattedText}, and ${otherText}` : otherText;
  }
  
  return formattedText;
};

export const DailyLifeImpactSection = ({ formData }: { formData: any }) => {
  const formatWorkImpact = () => {
    const daysOff = formData.daysOffWork ? 
      `The claimant required ${formData.daysOffWork} days off work following the accident. ` : 
      "The claimant did not require any time off work. ";

    const lightDuties = formData.daysLightDuties ? 
      `They subsequently worked on light duties for ${formData.daysLightDuties} days. ` : 
      "";

    const difficulties = formatCheckboxList(formData.workDifficulties, formData.otherWorkDifficulties);
    const workDifficulties = difficulties ? 
      `The claimant reports experiencing difficulties at work with ${difficulties}. ` : 
      "";

    return daysOff + lightDuties + workDifficulties;
  };

  const formatSleepImpact = () => {
    const disturbances = formatCheckboxList(formData.sleepDisturbances, formData.otherSleepDisturbances);
    return disturbances ? 
      `Sleep has been significantly affected. The claimant reports experiencing ${disturbances}. ` : 
      "";
  };

  const formatDomesticImpact = () => {
    const effects = formatCheckboxList(formData.domesticEffects, formData.otherDomesticEffects);
    return effects ? 
      `Daily domestic activities have been impacted. The claimant has difficulty with ${effects}. ` : 
      "";
  };

  const formatSportLeisureImpact = () => {
    const effects = formatCheckboxList(formData.sportLeisureEffects, formData.otherSportLeisureEffects);
    return effects ? 
      `Sport and leisure activities have been affected. The claimant reports limitations with ${effects}. ` : 
      "";
  };

  const formatSocialLifeImpact = () => {
    const effects = formatCheckboxList(formData.socialLifeEffects, formData.otherSocialLifeEffects);
    return effects ? 
      `Social activities have been impacted. The claimant experiences difficulties with ${effects}. ` : 
      "";
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Impact on Daily Life</Text>
      
      <View style={styles.subsection}>
        <Text style={styles.text}>{formatWorkImpact()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatSleepImpact()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatDomesticImpact()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatSportLeisureImpact()}</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.text}>{formatSocialLifeImpact()}</Text>
      </View>

      {formData.additionalInformation === "1" && formData.additionalInformationDetails && (
        <View style={styles.subsection}>
          <Text style={styles.text}>
            Additional Impact Information: {formData.additionalInformationDetails}
          </Text>
        </View>
      )}
    </View>
  );
};