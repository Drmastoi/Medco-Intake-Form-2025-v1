
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TravelAnxietySectionProps {
  formData: ReportData;
  styles: any;
}

export const TravelAnxietySection = ({ formData, styles }: TravelAnxietySectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 8.5 - Travel Anxiety Details</Text>
      
      {formData.travelAnxiety.hasAnxiety ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>8.5.1 Symptoms and Severity</Text>
            <Text style={styles.fieldValue}>
              The claimant reported travel anxiety following the accident. 
              The initial severity was {formData.travelAnxiety.initialSeverity.toLowerCase()}. 
              {formData.travelAnxiety.currentSeverity === "Resolved" 
                ? ` The anxiety has now resolved after ${formData.travelAnxiety.resolveDays || "an unspecified number of"} days.` 
                : ` The current severity is ${formData.travelAnxiety.currentSeverity.toLowerCase()}.`}
            </Text>
          </View>
          
          {formData.travelAnxiety.symptoms && formData.travelAnxiety.symptoms.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.fieldLabel}>8.5.2 Specific Anxiety Symptoms</Text>
              <Text style={styles.fieldValue}>The following symptoms were reported:</Text>
              {formData.travelAnxiety.symptoms.map((symptom, index) => (
                <Text key={index} style={[styles.fieldValue, { marginLeft: 10 }]}>• {symptom}</Text>
              ))}
            </View>
          )}
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>8.5.3 Psychological Impact</Text>
            <Text style={styles.fieldValue}>
              The psychological impact of the accident has manifested as anxiety specifically related to traveling in vehicles.
              This is a typical trauma response following a road traffic accident and can significantly affect quality of life.
              During examination, the patient demonstrated normal mood with good eye contact and no signs of acute distress
              outside of travel situations.
            </Text>
          </View>
          
          {formData.travelAnxiety.pastHistory && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.fieldLabel}>8.5.4 Prior History</Text>
              <Text style={styles.fieldValue}>{formData.travelAnxiety.pastHistory}</Text>
            </View>
          )}

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>8.5.5 Treatment and Prognosis</Text>
            <Text style={styles.fieldValue}>
              Self-help measures including gradual exposure to travel situations, relaxation techniques, and breathing exercises
              are recommended. The prognosis is estimated at 
              {formData.travelAnxiety.currentSeverity === "Resolved" 
                ? ` ${formData.travelAnxiety.resolveDays || "an unspecified number of"} days (already resolved)` 
                : formData.travelAnxiety.currentSeverity === "Mild"
                  ? " 3 months"
                  : formData.travelAnxiety.currentSeverity === "Moderate"
                    ? " 6 months"
                    : formData.travelAnxiety.currentSeverity === "Severe"
                      ? " 9 months (The extended prognosis is due to the severity of the symptoms)"
                      : " 6 months"}
              from the date of the accident.
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>The claimant did not report any travel anxiety following the accident.</Text>
      )}
    </View>
  );
};
