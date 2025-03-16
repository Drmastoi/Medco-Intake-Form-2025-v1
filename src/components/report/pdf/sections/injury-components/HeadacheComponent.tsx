
import { Text, View } from '@react-pdf/renderer';
import { formatDuration, formatSeverity, safeValue } from '../../utils/formatUtils';

interface HeadacheComponentProps {
  headache: any;
  styles: any;
}

export const HeadacheComponent = ({ headache, styles }: HeadacheComponentProps) => {
  if (!headache?.hasInjury) return null;

  // Get prognosis based on severity
  const getPrognosis = () => {
    if (headache.currentSeverity === "Resolved" && headache.resolveDays) {
      return `${headache.resolveDays} days`;
    } else if (headache.currentSeverity === "Mild") {
      return "3 months from date of accident";
    } else if (headache.currentSeverity === "Moderate") {
      return "6 months from date of accident";
    } else if (headache.currentSeverity === "Severe") {
      return "9 months from date of accident (Prolonged prognosis is due to severity of symptoms)";
    }
    return "6 months from date of accident";
  };

  // Get treatment recommendation based on severity
  const getTreatment = () => {
    if (headache.currentSeverity === "Resolved") {
      return "Pain killers if required";
    } else {
      return "Physiotherapy recommended. Number of sessions to be determined by the physiotherapist";
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.4 Headache</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(headache.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(headache.currentSeverity)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration</Text>
          <Text style={styles.fieldValue}>
            {formatSeverity(headache.currentSeverity) === 'Resolved' 
              ? formatDuration(headache.resolveDays) 
              : 'Ongoing'}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{safeValue(headache.pastHistory, 'None')}</Text>
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
