
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TravelAnxietySectionProps {
  formData: ReportData;
  styles: any;
}

export const TravelAnxietySection = ({ formData, styles }: TravelAnxietySectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 9 - Travel Anxiety</Text>
      
      {formData.injuries.travelAnxiety === "Yes" ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.1 Symptoms</Text>
            <Text style={styles.fieldValue}>
              The claimant reported experiencing travel anxiety following the accident. 
              {formData.injuries.travelAnxietySymptoms && formData.injuries.travelAnxietySymptoms.length > 0 && 
                ` Symptoms included: ${formData.injuries.travelAnxietySymptoms.join(", ")}.`}
              {formData.injuries.otherTravelAnxietySymptom && 
                ` Additional symptoms: ${formData.injuries.otherTravelAnxietySymptom}.`}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.2 Severity</Text>
            <Text style={styles.fieldValue}>
              The initial severity of the anxiety was {formData.injuries.anxietyInitialSeverity.toLowerCase()}. 
              {formData.injuries.anxietyCurrentSeverity === "Resolved" 
                ? ` The anxiety has now resolved after ${formData.injuries.anxietyResolveDays || "an unspecified number of"} days.` 
                : ` The current severity is ${formData.injuries.anxietyCurrentSeverity.toLowerCase()}.`}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.3 Current Status</Text>
            <Text style={styles.fieldValue}>
              The claimant is {formData.injuries.currentlyDriving === "Yes" ? "currently driving" : "not currently driving"}.
              {formData.injuries.anxietyDuration && ` The anxiety lasted for approximately ${formData.injuries.anxietyDuration}.`}
              {formData.injuries.anxietyPastHistory && ` ${formData.injuries.anxietyPastHistory}`}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>The claimant did not report any travel anxiety following the accident.</Text>
      )}
    </View>
  );
};
