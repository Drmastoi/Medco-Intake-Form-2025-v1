
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
      
      {/* Acknowledgment statement at the beginning */}
      <Text style={[styles.text, { marginBottom: 12, marginTop: 5, fontStyle: 'italic' }]}>
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
