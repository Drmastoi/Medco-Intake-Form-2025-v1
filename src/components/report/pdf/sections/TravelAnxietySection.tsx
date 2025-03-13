
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TravelAnxietySectionProps {
  formData: ReportData;
  styles: any;
}

export const TravelAnxietySection = ({ formData, styles }: TravelAnxietySectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 10 - Travel Anxiety</Text>
      
      {formData.travelAnxiety?.hasAnxiety ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>10.1 Symptoms</Text>
            {formData.travelAnxiety.symptoms && formData.travelAnxiety.symptoms.length > 0 ? (
              <View>
                {formData.travelAnxiety.symptoms.map((symptom, index) => (
                  <Text key={index} style={styles.fieldValue}>• {symptom}</Text>
                ))}
              </View>
            ) : (
              <Text style={styles.fieldValue}>No specific travel anxiety symptoms reported.</Text>
            )}
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>10.2 Severity and Progress</Text>
            <Text style={styles.fieldValue}>
              The claimant reported travel anxiety with an initial severity of {formData.travelAnxiety.initialSeverity.toLowerCase()}. 
              The current severity is {formData.travelAnxiety.currentSeverity.toLowerCase()}.
              {formData.travelAnxiety.resolveDays 
                ? ` The anxiety resolved after approximately ${formData.travelAnxiety.resolveDays} days.` 
                : ""}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>10.3 Impact on Driving</Text>
            <Text style={styles.fieldValue}>
              The claimant is currently {formData.travelAnxiety.currentlyDriving || "not specified"} driving.
              {formData.travelAnxiety.duration && ` Duration of driving restrictions: ${formData.travelAnxiety.duration}.`}
              {formData.travelAnxiety.pastHistory && ` Additional notes: ${formData.travelAnxiety.pastHistory}`}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>The claimant did not report any significant travel anxiety following the accident.</Text>
      )}
    </View>
  );
};
