
import { Text, View } from '@react-pdf/renderer';
import { getExaminationFindings } from '../utils/injuryClassification';

interface ExaminationDetailsSectionProps {
  formData: any;
  styles: any;
}

export const ExaminationDetailsSection = ({ formData, styles }: ExaminationDetailsSectionProps) => {
  const renderBruisingDetails = () => {
    if (formData.hasBruising === "1") {
      const bruisingNoticed = {
        "1": "Same day",
        "2": "Next day",
        "3": "Few days later"
      }[formData.bruisingNoticed] || "Not specified";

      const initialSeverity = {
        "1": "Mild",
        "2": "Moderate",
        "3": "Severe"
      }[formData.bruisingInitialSeverity] || "Not specified";

      const currentSeverity = {
        "1": "Mild",
        "2": "Moderate",
        "3": "Severe",
        "4": "Resolved"
      }[formData.bruisingCurrentSeverity] || "Not specified";

      return (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Location</Text>
              <Text style={styles.text}>{formData.bruisingLocation || "Not specified"}</Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Onset</Text>
              <Text style={styles.text}>{bruisingNoticed}</Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity</Text>
              <Text style={styles.text}>{initialSeverity}</Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity</Text>
              <Text style={styles.text}>{currentSeverity}</Text>
            </View>
          </View>
          {formData.bruisingCurrentSeverity === "4" && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After</Text>
                <Text style={styles.text}>{formData.bruisingResolveDays || "Not specified"} days</Text>
              </View>
            </View>
          )}
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Visible Scar</Text>
              <Text style={styles.text}>{formData.hasVisibleScar === "1" ? "Yes" : "No"}</Text>
            </View>
          </View>
        </>
      );
    }
    
    return <Text style={styles.text}>Claimant has not reported any issues related to bruising or scarring.</Text>;
  };
  
  return (
    <View>
      <Text style={styles.sectionHeader}>Section 8 - Examination</Text>
      
      <View style={styles.grayBackground}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>8.1 Clinical Examination Findings</Text>
      </View>
      
      <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Examination Details</Text>
      <View style={styles.grayBackground}>
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Location</Text>
            <Text style={styles.text}>{formData.examinationLocation || "Not specified"}</Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Accompanied By</Text>
            <Text style={styles.text}>{formData.accompaniedBy || "None"}</Text>
          </View>
        </View>
      </View>

      <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Bruising and Scarring</Text>
      <View style={styles.grayBackground}>
        {renderBruisingDetails()}
      </View>
    </View>
  );
};
