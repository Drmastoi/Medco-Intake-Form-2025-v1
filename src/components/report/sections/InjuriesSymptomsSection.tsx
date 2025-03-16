
import { Text, View } from '@react-pdf/renderer';
import InjurySectionDetail from './InjurySectionDetail';

interface InjuriesSymptomsSectionProps {
  formData: any;
  styles: any;
}

export const InjuriesSymptomsSection = ({ formData, styles }: InjuriesSymptomsSectionProps) => {
  let sectionCount = 0;
  
  return (
    <View>
      <Text style={[styles.sectionHeader, { marginBottom: 8 }]}>Section 6 - Injuries / Symptoms</Text>
      
      {/* Compact accident summary */}
      <View style={{ marginBottom: 8 }}>
        <Text style={[styles.text, { fontWeight: 'bold', fontSize: 10 }]}>
          Accident Summary:
        </Text>
        <Text style={[styles.text, { fontSize: 9, marginBottom: 6 }]}>
          {formData.accidentSummary || 
            `The accident occurred on ${formData.accidentDate ? new Date(formData.accidentDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}) : '[date not specified]'}. ${formData.impactLocation === "1" ? "The vehicle was hit from behind" : formData.impactLocation === "2" ? "The vehicle was hit from the front" : formData.impactLocation === "3" ? "The vehicle was hit on the passenger side" : formData.impactLocation === "4" ? "The vehicle was hit on the driver side" : "The vehicle was impacted"}.`
          }
        </Text>
      </View>
      
      {/* Compact acknowledgment statement */}
      <Text style={[styles.text, { marginBottom: 8, fontStyle: 'italic', fontSize: 9 }]}>
        I have acknowledged the Letter of Instruction and confirm there were no other injuries suffered by the claimant as told to me during the examination after direct questioning.
      </Text>
      
      {/* Neck Injury */}
      {formData.neckPain === "1" && (
        <InjurySectionDetail
          title="Neck"
          injuryType="Neck"
          formData={formData}
          styles={styles}
          sectionCount={++sectionCount}
        />
      )}
      
      {/* Display prior neck pain information if applicable */}
      {formData.neckPain === "1" && formData.hadPriorNeckPain === "1" && (
        <View style={{ marginBottom: 8 }}>
          <Text style={[styles.text, { fontSize: 9 }]}>
            <Text style={{ fontWeight: 'bold' }}>Prior Neck Pain: </Text>
            {formData.accidentNeckPainPercentage && formData.priorNeckPainPercentage 
              ? `Attribution: ${formData.accidentNeckPainPercentage}% to this accident, ${formData.priorNeckPainPercentage}% to previous condition.`
              : "The patient reported experiencing neck pain before this accident."}
          </Text>
        </View>
      )}
      
      {/* Back Injury */}
      {formData.backPain === "1" && (
        <InjurySectionDetail
          title="Back"
          injuryType="Back"
          location={formData.backLocation}
          formData={formData}
          styles={styles}
          sectionCount={++sectionCount}
        />
      )}
      
      {/* Shoulder Injury */}
      {formData.shoulderPain === "1" && (
        <InjurySectionDetail
          title="Shoulder"
          injuryType="Shoulder"
          location={formData.shoulderSide}
          formData={formData}
          styles={styles}
          sectionCount={++sectionCount}
        />
      )}
      
      {/* Headache */}
      {formData.headache === "1" && (
        <InjurySectionDetail
          title="Headache"
          injuryType="Headache"
          formData={formData}
          styles={styles}
          sectionCount={++sectionCount}
        />
      )}
      
      {/* Travel Anxiety */}
      {formData.travelAnxiety === "1" && (
        <InjurySectionDetail
          title="Travel Anxiety"
          injuryType="Travel Anxiety"
          formData={formData}
          styles={styles}
          sectionCount={++sectionCount}
        />
      )}
    </View>
  );
};
