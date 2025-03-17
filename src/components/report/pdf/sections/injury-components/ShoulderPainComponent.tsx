
import { Text, View } from '@react-pdf/renderer';
import { formatSeverity, safeValue } from '../../utils/formatUtils';
import { getExaminationFindings } from '../../../utils/injuryClassification';

interface ShoulderPainComponentProps {
  shoulderPain: any;
  styles: any;
}

export const ShoulderPainComponent = ({ shoulderPain, styles }: ShoulderPainComponentProps) => {
  if (!shoulderPain?.hasInjury) return null;

  // Get prognosis based on severity
  const getPrognosis = () => {
    if (shoulderPain.currentSeverity === "Resolved" && shoulderPain.resolveDays) {
      return `${shoulderPain.resolveDays} days`;
    } else if (shoulderPain.currentSeverity === "Mild") {
      return "3 months from date of accident";
    } else if (shoulderPain.currentSeverity === "Moderate") {
      return "6 months from date of accident";
    } else if (shoulderPain.currentSeverity === "Severe") {
      return "9 months from date of accident (Prolonged prognosis is due to severity of symptoms)";
    }
    return "6 months from date of accident";
  };

  // Get treatment recommendation based on severity
  const getTreatment = () => {
    if (shoulderPain.currentSeverity === "Resolved") {
      return "Pain killers if required";
    } else {
      return "Physiotherapy recommended. Number of sessions to be determined by the physiotherapist";
    }
  };

  // Helper to convert severity to numeric code for examination findings
  const getSeverityCode = () => {
    if (shoulderPain.currentSeverity === "Resolved") return "4";
    if (shoulderPain.currentSeverity === "Mild") return "1";
    if (shoulderPain.currentSeverity === "Moderate") return "2";
    if (shoulderPain.currentSeverity === "Severe") return "3";
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
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.3 Shoulder Pain</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Onset</Text>
          <Text style={styles.fieldValue}>{getOnsetDescription(shoulderPain.painStart)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Side Affected</Text>
          <Text style={styles.fieldValue}>{safeValue(shoulderPain.side, 'Not specified')}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(shoulderPain.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(shoulderPain.currentSeverity)}</Text>
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
            {getExaminationFindings('Shoulder', getSeverityCode())}
          </Text>
        </View>
      </View>
    </View>
  );
};
