
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 10,
  },
  bulletPoint: {
    marginLeft: 10,
    fontSize: 10,
    lineHeight: 1.4,
  }
});

const formatList = (items: string[] = [], otherText?: string) => {
  if (!items.length) return '';
  const mainItems = items.filter(item => item !== 'other');
  const formattedList = mainItems.join(', ');
  return otherText ? `${formattedList}${mainItems.length ? ', and ' : ''}${otherText}` : formattedList;
};

const getVehiclePosition = (value: string) => {
  const positions: { [key: string]: string } = {
    "1": "Driver",
    "2": "Front Passenger",
    "3": "Back Passenger",
    "4": "Other"
  };
  return positions[value] || value;
};

const getTimeOfDay = (value: string) => {
  const times: { [key: string]: string } = {
    "1": "Morning",
    "2": "Afternoon",
    "3": "Evening",
    "4": "Night"
  };
  return times[value] || value;
};

const getVehicleType = (value: string) => {
  const types: { [key: string]: string } = {
    "1": "Car",
    "2": "Van",
    "3": "Bus",
    "4": "Other"
  };
  return types[value] || value;
};

const getVehicleStatus = (value: string) => {
  const statuses: { [key: string]: string } = {
    "1": "Moving",
    "2": "Stationary",
    "3": "Parked",
    "4": "Other"
  };
  return statuses[value] || value;
};

const getImpactLocation = (value: string) => {
  const locations: { [key: string]: string } = {
    "1": "Rear",
    "2": "Front",
    "3": "Passenger Side",
    "4": "Driver Side"
  };
  return locations[value] || value;
};

const getDamageLevel = (value: string) => {
  const levels: { [key: string]: string } = {
    "1": "Mild Damage",
    "2": "Moderate Damage",
    "3": "Written Off"
  };
  return levels[value] || value;
};

const getPainSeverity = (value: string) => {
  const severities: { [key: string]: string } = {
    "1": "Mild",
    "2": "Moderate",
    "3": "Severe",
    "4": "Resolved"
  };
  return severities[value] || value;
};

export const DailyLifeSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.title}>COMPREHENSIVE INJURY AND IMPACT SUMMARY</Text>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Major Injuries Reported:</Text>
      {formData.neckPain === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Neck Pain</Text>
          <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.neckPainInitialSeverity)}</Text>
          <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.neckPainCurrentSeverity)}</Text>
          {formData.neckPainCurrentSeverity === "4" && (
            <Text style={styles.bulletPoint}>  - Resolved after: {formData.neckPainResolveDays} days</Text>
          )}
        </View>
      )}
      {formData.shoulderPain === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Shoulder Pain</Text>
          <Text style={styles.bulletPoint}>  - Side Affected: {
            formData.shoulderSide === "1" ? "Left" :
            formData.shoulderSide === "2" ? "Right" :
            formData.shoulderSide === "3" ? "Both" : "Not specified"
          }</Text>
          <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.shoulderPainInitialSeverity)}</Text>
          <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.shoulderPainCurrentSeverity)}</Text>
          {formData.shoulderPainCurrentSeverity === "4" && (
            <Text style={styles.bulletPoint}>  - Resolved after: {formData.shoulderPainResolveDays} days</Text>
          )}
        </View>
      )}
      {formData.backPain === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Back Pain</Text>
          <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.backPainInitialSeverity)}</Text>
          <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.backPainCurrentSeverity)}</Text>
          {formData.backPainCurrentSeverity === "4" && (
            <Text style={styles.bulletPoint}>  - Resolved after: {formData.backPainResolveDays} days</Text>
          )}
        </View>
      )}
      {formData.headache === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Headaches</Text>
          <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.headacheInitialSeverity)}</Text>
          <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.headacheCurrentSeverity)}</Text>
          {formData.headacheCurrentSeverity === "4" && (
            <Text style={styles.bulletPoint}>  - Resolved after: {formData.headacheResolveDays} days</Text>
          )}
        </View>
      )}
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Psychological Impacts:</Text>
      {formData.travelAnxiety === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Travel Anxiety Present</Text>
          <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.anxietyInitialSeverity)}</Text>
          <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.anxietyCurrentSeverity)}</Text>
          {formData.anxietyCurrentSeverity === "4" && (
            <Text style={styles.bulletPoint}>  - Resolved after: {formData.anxietyResolveDays} days</Text>
          )}
        </View>
      )}
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Impact on Daily Activities:</Text>
      {formData.effectOnDomesticLiving === "1" && (
        <Text style={styles.bulletPoint}>• Domestic activities affected: {formatList(formData.domesticEffects, formData.otherDomesticEffects)}</Text>
      )}
      {formData.sleepDisturbance === "1" && (
        <Text style={styles.bulletPoint}>• Sleep disturbances: {formatList(formData.sleepDisturbances, formData.otherSleepDisturbances)}</Text>
      )}
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Impact on Work:</Text>
      {formData.daysOffWork > 0 && (
        <Text style={styles.bulletPoint}>• Total days off work: {formData.daysOffWork}</Text>
      )}
      {formData.daysLightDuties > 0 && (
        <Text style={styles.bulletPoint}>• Days on light duties: {formData.daysLightDuties}</Text>
      )}
      {formData.workDifficulties?.length > 0 && (
        <Text style={styles.bulletPoint}>• Specific work difficulties: {formatList(formData.workDifficulties, formData.otherWorkDifficulties)}</Text>
      )}
    </View>

    {formData.additionalInformation === "1" && (
      <View style={styles.paragraph}>
        <Text style={styles.sectionTitle}>Additional Information:</Text>
        <Text style={styles.bulletPoint}>• {formData.additionalInformationDetails}</Text>
      </View>
    )}
  </View>
);
