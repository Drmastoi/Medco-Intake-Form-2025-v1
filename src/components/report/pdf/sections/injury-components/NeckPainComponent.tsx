
import { Text, View } from '@react-pdf/renderer';
import { formatSeverity, safeValue } from '../../utils/formatUtils';
import { getExaminationFindings } from '../../../utils/injuryClassification';

interface NeckPainComponentProps {
  neckPain: any;
  styles: any;
}

export const NeckPainComponent = ({ neckPain, styles }: NeckPainComponentProps) => {
  if (!neckPain?.hasInjury) return null;

  // Get prognosis based on severity
  const getPrognosis = () => {
    if (neckPain.currentSeverity === "Resolved" && neckPain.resolveDays) {
      return `${neckPain.resolveDays} days`;
    } else if (neckPain.currentSeverity === "Mild") {
      return "3 months from date of accident";
    } else if (neckPain.currentSeverity === "Moderate") {
      return "6 months from date of accident";
    } else if (neckPain.currentSeverity === "Severe") {
      return "9 months from date of accident (Prolonged prognosis is due to severity of symptoms)";
    }
    return "6 months from date of accident";
  };

  // Get treatment recommendation based on severity
  const getTreatment = () => {
    if (neckPain.currentSeverity === "Resolved") {
      return "Pain killers if required";
    } else {
      return "Physiotherapy recommended. Number of sessions to be determined by the physiotherapist";
    }
  };

  // Get severity code for examination findings
  const getSeverityCode = () => {
    if (neckPain.currentSeverity === "Resolved") return "4";
    if (neckPain.currentSeverity === "Mild") return "1";
    if (neckPain.currentSeverity === "Moderate") return "2";
    if (neckPain.currentSeverity === "Severe") return "3";
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
      <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.1 Neck Pain</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Onset</Text>
          <Text style={styles.fieldValue}>{getOnsetDescription(neckPain.painStart)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History</Text>
          <Text style={styles.fieldValue}>{neckPain.hadPrior ? 'Yes' : 'None'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(neckPain.initialSeverity)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity</Text>
          <Text style={styles.fieldValue}>{formatSeverity(neckPain.currentSeverity)}</Text>
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
            {getExaminationFindings('Neck', getSeverityCode())}
          </Text>
        </View>
      </View>
    </View>
  );
};
