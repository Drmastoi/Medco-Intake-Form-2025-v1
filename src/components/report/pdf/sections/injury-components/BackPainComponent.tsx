
import { Text, View } from '@react-pdf/renderer';
import { formatSeverity, safeValue } from '../../utils/formatUtils';
import { getExaminationFindings } from '../../../utils/injuryClassification';

interface BackPainComponentProps {
  backPain: any;
  styles: any;
}

export const BackPainComponent = ({ backPain, styles }: BackPainComponentProps) => {
  if (!backPain?.hasInjury) return null;

  // Get prognosis based on severity
  const getPrognosis = () => {
    if (backPain.currentSeverity === "Resolved" && backPain.resolveDays) {
      return `${backPain.resolveDays} days`;
    } else if (backPain.currentSeverity === "Mild") {
      return "3 months from date of accident";
    } else if (backPain.currentSeverity === "Moderate") {
      return "6 months from date of accident";
    } else if (backPain.currentSeverity === "Severe") {
      return "9 months from date of accident (Prolonged prognosis is due to severity of symptoms)";
    }
    return "6 months from date of accident";
  };

  // Get treatment recommendation based on severity
  const getTreatment = () => {
    if (backPain.currentSeverity === "Resolved") {
      return "Pain killers if required";
    } else {
      return "Physiotherapy recommended. Number of sessions to be determined by the physiotherapist";
    }
  };

  // Helper to convert severity to numeric code for examination findings
  const getSeverityCode = () => {
    if (backPain.currentSeverity === "Resolved") return "4";
    if (backPain.currentSeverity === "Mild") return "1";
    if (backPain.currentSeverity === "Moderate") return "2";
    if (backPain.currentSeverity === "Severe") return "3";
    return "1";
  };

  // Get onset description
  const getOnsetDescription = (painStart?: string) => {
    switch (painStart) {
      case "1": return "Same day";
      case "2": return "Next day";
      case "3": return "Few days later";
      default: return "Not specified";
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.2 Back Pain</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Onset</Text>
          <Text style={styles.fieldValue}>{getOnsetDescription(backPain.painStart)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Location</Text>
          <Text style={styles.fieldValue}>{safeValue(backPain.location)}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(backPain.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(backPain.currentSeverity)}</Text>
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

      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Examination Findings</Text>
          <Text style={styles.fieldValue}>
            {getExaminationFindings('Back', getSeverityCode())}
          </Text>
        </View>
      </View>
    </View>
  );
};
