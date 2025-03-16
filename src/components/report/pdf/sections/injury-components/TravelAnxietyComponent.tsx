
import { Text, View } from '@react-pdf/renderer';
import { formatSeverity, safeValue } from '../../utils/formatUtils';

interface TravelAnxietyComponentProps {
  travelAnxiety: any;
  styles: any;
}

export const TravelAnxietyComponent = ({ travelAnxiety, styles }: TravelAnxietyComponentProps) => {
  if (!travelAnxiety?.hasAnxiety) return null;

  // Get prognosis based on severity
  const getPrognosis = () => {
    if (travelAnxiety.currentSeverity === "Resolved" && travelAnxiety.resolveDays) {
      return `${travelAnxiety.resolveDays} days`;
    } else if (travelAnxiety.currentSeverity === "Mild") {
      return "3 months from date of accident";
    } else if (travelAnxiety.currentSeverity === "Moderate") {
      return "6 months from date of accident";
    } else if (travelAnxiety.currentSeverity === "Severe") {
      return "9 months from date of accident (Prolonged prognosis is due to severity of symptoms)";
    }
    return "6 months from date of accident";
  };

  // Get treatment recommendation based on severity
  const getTreatment = () => {
    if (travelAnxiety.currentSeverity === "Resolved") {
      return "Pain killers if required";
    } else {
      return "Self-help measures including gradual exposure, relaxation techniques, and breathing exercises";
    }
  };

  // Get onset description
  const getOnsetDescription = (anxietyStart?: string) => {
    switch (anxietyStart) {
      case "1": return "Same day";
      case "2": return "Next day";
      case "3": return "Few days later";
      default: return "Not specified";
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.5 Travel Anxiety</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Onset</Text>
          <Text style={styles.fieldValue}>{getOnsetDescription(travelAnxiety.anxietyStart)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Currently Driving</Text>
          <Text style={styles.fieldValue}>{safeValue(travelAnxiety.currentlyDriving)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(travelAnxiety.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(travelAnxiety.currentSeverity)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Symptoms</Text>
          <Text style={styles.fieldValue}>
            {travelAnxiety.symptoms && travelAnxiety.symptoms.length > 0 
              ? travelAnxiety.symptoms.join(", ") 
              : "Not specified"}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{safeValue(travelAnxiety.pastHistory, 'None')}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Prognosis</Text>
          <Text style={styles.fieldValue}>{getPrognosis()}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Treatment</Text>
          <Text style={styles.fieldValue}>{getTreatment()}</Text>
        </View>
      </View>
    </View>
  );
};
