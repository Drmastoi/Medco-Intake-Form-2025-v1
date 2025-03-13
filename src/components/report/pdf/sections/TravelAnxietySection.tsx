
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TravelAnxietySectionProps {
  formData: ReportData;
  styles: any;
}

export const TravelAnxietySection = ({ formData, styles }: TravelAnxietySectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 9 - Travel Anxiety Details</Text>
      
      {formData.travelAnxiety.hasAnxiety ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.1 Symptoms and Severity</Text>
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
              <Text style={styles.fieldLabel}>9.2 Specific Anxiety Symptoms</Text>
              <Text style={styles.fieldValue}>The following symptoms were reported:</Text>
              {formData.travelAnxiety.symptoms.map((symptom, index) => (
                <Text key={index} style={[styles.fieldValue, { marginLeft: 10 }]}>• {symptom}</Text>
              ))}
            </View>
          )}
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.3 Current Driving Status</Text>
            <Text style={styles.fieldValue}>
              {formData.travelAnxiety.currentlyDriving === "Yes" 
                ? "The claimant has returned to driving despite anxiety." 
                : formData.travelAnxiety.currentlyDriving === "No"
                ? "The claimant has not yet returned to driving due to anxiety."
                : "The claimant's current driving status was not specified."}
            </Text>
          </View>
          
          {formData.travelAnxiety.pastHistory && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.fieldLabel}>9.4 Prior History</Text>
              <Text style={styles.fieldValue}>{formData.travelAnxiety.pastHistory}</Text>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.fieldValue}>The claimant did not report any travel anxiety following the accident.</Text>
      )}
    </View>
  );
};
