
import { Text, View } from '@react-pdf/renderer';
import InjurySectionDetail from './InjurySectionDetail';
import { getTreatmentRecommendation } from '../utils/injuryClassification';

interface InjuriesSymptomsSectionProps {
  formData: any;
  styles: any;
}

export const InjuriesSymptomsSection = ({ formData, styles }: InjuriesSymptomsSectionProps) => {
  let sectionCount = 0;
  
  return (
    <View>
      <Text style={styles.sectionHeader}>Section 6 - Injuries / Symptoms</Text>
      
      {/* Accident Information Summary at the beginning */}
      <View style={{ marginBottom: 12, marginTop: 5 }}>
        <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 4 }]}>
          Accident Information Summary:
        </Text>
        <Text style={[styles.text, { marginBottom: 8 }]}>
          {formData.accidentSummary || 
            `The accident occurred on ${formData.accidentDate ? new Date(formData.accidentDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}) : '[date not specified]'} in a ${formData.claimantVehicle === "1" ? "car" : formData.claimantVehicle === "2" ? "van" : formData.claimantVehicle === "3" ? "bus" : "vehicle"}. ${formData.impactLocation === "1" ? "The vehicle was hit from behind" : formData.impactLocation === "2" ? "The vehicle was hit from the front" : formData.impactLocation === "3" ? "The vehicle was hit on the passenger side" : formData.impactLocation === "4" ? "The vehicle was hit on the driver side" : "The vehicle was impacted"}.`
          }
        </Text>
      </View>
      
      {/* Acknowledgment statement after accident summary */}
      <Text style={[styles.text, { marginBottom: 12, fontStyle: 'italic' }]}>
        I have acknowledged the Letter of Instruction and I confirm there were no other injuries suffered by the claimant as told to me during the examination after direct questioning
      </Text>
      
      {/* Neck Injury - Only show if selected */}
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
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Prior Neck Pain History: </Text>
            The patient reported experiencing neck pain before this accident. 
            {formData.accidentNeckPainPercentage && formData.priorNeckPainPercentage && (
              ` They attribute approximately ${formData.accidentNeckPainPercentage}% of their current neck pain to this accident and ${formData.priorNeckPainPercentage}% to their previous condition.`
            )}
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
