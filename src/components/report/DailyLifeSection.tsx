
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 10,
  },
  bulletPoint: {
    marginLeft: 10,
    fontSize: 12,
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
    <Text style={styles.subtitle}>Accident Information Summary</Text>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Date and Time</Text>
      <Text style={styles.bulletPoint}>• Date of Accident: {formatDate(formData.accidentDate)}</Text>
      <Text style={styles.bulletPoint}>• Time of Day: {getTimeOfDay(formData.accidentTime)}</Text>
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Vehicle Details</Text>
      <Text style={styles.bulletPoint}>• Claimant's Position: {getVehiclePosition(formData.claimantPosition)}</Text>
      <Text style={styles.bulletPoint}>• Claimant's Vehicle Type: {getVehicleType(formData.claimantVehicle)}</Text>
      <Text style={styles.bulletPoint}>• Other Vehicle Type: {getVehicleType(formData.otherVehicle)}</Text>
      <Text style={styles.bulletPoint}>• Vehicle Status: {getVehicleStatus(formData.vehicleStatus)}</Text>
      <Text style={styles.bulletPoint}>• Impact Location: {getImpactLocation(formData.impactLocation)}</Text>
      <Text style={styles.bulletPoint}>• Vehicle Damage Level: {getDamageLevel(formData.vehicleDamage)}</Text>
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Injury Details</Text>
      {formData.neckPain === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Neck Pain: Yes</Text>
          <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.neckPainInitialSeverity)}</Text>
          <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.neckPainCurrentSeverity)}</Text>
          {formData.neckPainCurrentSeverity === "4" && (
            <Text style={styles.bulletPoint}>  - Days to Resolve: {formData.neckPainResolveDays}</Text>
          )}
        </View>
      )}
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Treatment Information</Text>
      {formData.sceneOfAccidentTreatment === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Received treatment at scene: Yes</Text>
          <Text style={styles.bulletPoint}>  - Treatments received: {formatList(formData.sceneOfAccidentTreatmentTypes)}</Text>
        </View>
      )}
      {formData.wentToAE === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Visited A&E: Yes</Text>
          <Text style={styles.bulletPoint}>  - Hospital: {formData.hospitalName}</Text>
          <Text style={styles.bulletPoint}>  - Treatments received: {formatList(formData.hospitalTreatment)}</Text>
        </View>
      )}
      {formData.wentToWalkInGP === "1" && (
        <View>
          <Text style={styles.bulletPoint}>• Visited Walk-in/GP: Yes</Text>
          <Text style={styles.bulletPoint}>  - Days after accident: {formData.daysBeforeGPVisit}</Text>
        </View>
      )}
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Impact on Daily Life</Text>
      {formData.daysOffWork > 0 && (
        <Text style={styles.bulletPoint}>• Days off work: {formData.daysOffWork}</Text>
      )}
      {formData.daysLightDuties > 0 && (
        <Text style={styles.bulletPoint}>• Days on light duties: {formData.daysLightDuties}</Text>
      )}
      {formData.workDifficulties?.length > 0 && (
        <Text style={styles.bulletPoint}>• Work difficulties: {formatList(formData.workDifficulties, formData.otherWorkDifficulties)}</Text>
      )}
      {formData.sleepDisturbance === "1" && (
        <Text style={styles.bulletPoint}>• Sleep disturbances: {formatList(formData.sleepDisturbances, formData.otherSleepDisturbances)}</Text>
      )}
      {formData.effectOnDomesticLiving === "1" && (
        <Text style={styles.bulletPoint}>• Domestic activities affected: {formatList(formData.domesticEffects, formData.otherDomesticEffects)}</Text>
      )}
    </View>

    {formData.additionalInformation === "1" && (
      <View style={styles.paragraph}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        <Text style={styles.bulletPoint}>• {formData.additionalInformationDetails}</Text>
      </View>
    )}
  </View>
);
