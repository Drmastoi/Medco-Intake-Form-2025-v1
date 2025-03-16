
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
      return "12 months from date of accident (Prolonged prognosis is due to severity of symptoms)";
    }
    return "6 months from date of accident";
  };

  // Get treatment recommendation based on severity
  const getTreatment = () => {
    if (travelAnxiety.currentSeverity === "Resolved") {
      return "No further treatment required";
    } else if (travelAnxiety.currentSeverity === "Severe") {
      return "Cognitive Behavioral Therapy (CBT) recommended";
    } else {
      return "Self-help techniques and gradual exposure therapy recommended";
    }
  };

  // Get onset description
  const getOnsetDescription = (start?: string) => {
    switch (start) {
      case "1": return "Same day";
      case "2": return "Next day";
      case "3": return "Few days later";
      default: return "Not specified";
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>6.5 Travel Anxiety</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Onset</Text>
          <Text style={styles.fieldValue}>{getOnsetDescription(travelAnxiety.anxietyStart)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Currently Driving</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.currentlyDriving === "1" ? "Yes" : "No"}</Text>
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
          <Text style={styles.fieldLabel}>Prognosis</Text>
          <Text style={styles.fieldValue}>{getPrognosis()}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Treatment</Text>
          <Text style={styles.fieldValue}>{getTreatment()}</Text>
        </View>
      </View>
      
      <View style={{ marginTop: 5 }}>
        <Text style={styles.fieldLabel}>Symptoms</Text>
        <Text style={styles.fieldValue}>
          {travelAnxiety.symptoms?.length > 0 
            ? travelAnxiety.symptoms.join(", ") 
            : "No specific symptoms reported"}
        </Text>
      </View>
      
      {travelAnxiety.pastHistory && (
        <View style={{ marginTop: 5 }}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.pastHistory}</Text>
        </View>
      )}
    </View>
  );
};
