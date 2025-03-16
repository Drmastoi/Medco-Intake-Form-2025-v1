import { View, Text } from '@react-pdf/renderer';
import { InjurySection } from './injuryReport/InjurySection';
import { getOnsetText, getSeverityText, getImpactMechanism } from '../../utils/injuryTextUtils';
import { getTravelAnxietySymptomLabel } from '../../utils/reportConverters';

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  let injuryCount = 0;

  // Format travel anxiety symptoms for display
  const formatAnxietySymptoms = (symptoms: string[] = []) => {
    if (!symptoms || symptoms.length === 0) return "No specific symptoms reported";
    
    const symptomsList = symptoms.map(symptom => 
      getTravelAnxietySymptomLabel(symptom)
    ).join(", ");
    
    return symptomsList;
  };

  // Helper function to determine bruising mechanism
  const getBruisingMechanism = () => {
    if (formData.vehicleStatus === "1") {
      return "Impact against seat belt during collision";
    } else if (formData.vehicleStatus === "2") {
      return "Impact against vehicle interior during collision";
    } else if (formData.vehicleStatus === "3") {
      return "Deployment of airbag during collision";
    } else {
      return "Direct impact trauma during the collision";
    }
  };
  
  // Helper function to get appropriate prognosis text
  const getPrognosisText = (severity: string, resolveDays?: string) => {
    if (severity === "4" && resolveDays) {
      return `${resolveDays} DAYS`;
    } else if (severity === "1") {
      return "3 MONTHS FROM DATE OF ACCIDENT";
    } else if (severity === "2") {
      return "6 MONTHS FROM DATE OF ACCIDENT";
    } else if (severity === "3") {
      return "9 MONTHS FROM DATE OF ACCIDENT (Prolonged prognosis is due to severity of symptoms)";
    } else {
      return "6 MONTHS FROM DATE OF ACCIDENT";
    }
  };
  
  // Helper function to get treatment recommendation
  const getTreatmentText = (severity: string) => {
    if (severity === "4") {
      return "Pain killers if required";
    } else {
      return "Physiotherapy recommended. Number of sessions to be determined by the physiotherapist";
    }
  };

  return (
    <View>
      {formData.neckPain === "1" ? (
        <InjurySection
          title="NECK PAIN"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.neckPainStart)}
          initialSeverity={getSeverityText(formData.neckPainInitialSeverity)}
          currentSeverity={getSeverityText(formData.neckPainCurrentSeverity)}
          classification="Whiplash injury"
          mechanism={getImpactMechanism(formData.vehiclePosition)}
          palpation={`${getSeverityText(formData.neckPainCurrentSeverity)} tenderness in affected area`}
          rangeOfMotion="Limited due to pain"
          neurologicalAssessment="normal"
          treatment={getTreatmentText(formData.neckPainCurrentSeverity)}
          prognosis={getPrognosisText(formData.neckPainCurrentSeverity, formData.neckPainResolveDays)}
        />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>NECK PAIN</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>Claimant has not reported any injuries related to neck pain.</Text>
        </View>
      )}

      {formData.shoulderPain === "1" ? (
        <InjurySection
          title="SHOULDER PAIN"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.shoulderPainStart)}
          initialSeverity={getSeverityText(formData.shoulderPainInitialSeverity)}
          currentSeverity={getSeverityText(formData.shoulderPainCurrentSeverity)}
          classification="Whiplash injury"
          mechanism={getImpactMechanism(formData.vehiclePosition)}
          palpation={`${getSeverityText(formData.shoulderPainCurrentSeverity)} tenderness in affected area`}
          rangeOfMotion="Limited due to pain"
          neurologicalAssessment="normal"
          treatment={getTreatmentText(formData.shoulderPainCurrentSeverity)}
          prognosis={getPrognosisText(formData.shoulderPainCurrentSeverity, formData.shoulderPainResolveDays)}
        />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>SHOULDER PAIN</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>Claimant has not reported any injuries related to shoulder pain.</Text>
        </View>
      )}

      {formData.backPain === "1" ? (
        <InjurySection
          title="BACK PAIN"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.backPainStart)}
          initialSeverity={getSeverityText(formData.backPainInitialSeverity)}
          currentSeverity={getSeverityText(formData.backPainCurrentSeverity)}
          classification="Whiplash injury"
          mechanism={getImpactMechanism(formData.vehiclePosition)}
          palpation={`${getSeverityText(formData.backPainCurrentSeverity)} tenderness in affected area`}
          rangeOfMotion="Limited due to pain"
          neurologicalAssessment="normal"
          treatment={getTreatmentText(formData.backPainCurrentSeverity)}
          prognosis={getPrognosisText(formData.backPainCurrentSeverity, formData.backPainResolveDays)}
        />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>BACK PAIN</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>Claimant has not reported any injuries related to back pain.</Text>
        </View>
      )}

      {formData.headache === "1" ? (
        <InjurySection
          title="HEADACHE"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.headacheStart)}
          initialSeverity={getSeverityText(formData.headacheInitialSeverity)}
          currentSeverity={getSeverityText(formData.headacheCurrentSeverity)}
          classification="Non-whiplash injury"
          mechanism="Due to sudden jolt of the head during the accident"
          palpation="Observation is normal. Vision normal, No Neurovascular Deficit"
          rangeOfMotion="Not applicable"
          neurologicalAssessment="normal"
          treatment={getTreatmentText(formData.headacheCurrentSeverity)}
          prognosis={getPrognosisText(formData.headacheCurrentSeverity, formData.headacheResolveDays)}
        />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>HEADACHE</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>Claimant has not reported any injuries related to headache.</Text>
        </View>
      )}

      {formData.travelAnxiety === "1" ? (
        <InjurySection
          title="TRAVEL ANXIETY"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.anxietyStart)}
          initialSeverity={getSeverityText(formData.anxietyInitialSeverity)}
          currentSeverity={getSeverityText(formData.anxietyCurrentSeverity)}
          classification="Non-whiplash injury"
          mechanism="Psychological Impact. The traumatic experience of the accident has led to anxiety when traveling in vehicles."
          palpation={`Normal mood, good eye contact, no signs of acute distress during examination. ${
            formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0 
              ? `Reported symptoms include: ${formatAnxietySymptoms(formData.travelAnxietySymptoms)}.` 
              : ""
          }`}
          rangeOfMotion="Not applicable"
          neurologicalAssessment="normal"
          treatment={formData.anxietyCurrentSeverity === "4" 
            ? "Pain killers if required" 
            : "Self-help measures including gradual exposure, relaxation techniques, and breathing exercises"}
          prognosis={getPrognosisText(formData.anxietyCurrentSeverity, formData.anxietyResolveDays)}
        />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>TRAVEL ANXIETY</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>Claimant has not reported any issues related to travel anxiety.</Text>
        </View>
      )}

      {formData.hasBruising === "1" ? (
        <InjurySection
          title="BRUISING"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.bruisingNoticed)}
          initialSeverity={getSeverityText(formData.bruisingInitialSeverity)}
          currentSeverity={getSeverityText(formData.bruisingCurrentSeverity)}
          classification="Physical injury"
          mechanism={getBruisingMechanism()}
          palpation={`${formData.bruisingLocation ? `Located at ${formData.bruisingLocation}. ` : ''}${
            formData.hasVisibleScar === "1" ? "Visible scarring present. " : "No visible scarring. "
          }${getSeverityText(formData.bruisingCurrentSeverity)} tenderness in affected area.`}
          rangeOfMotion="Not applicable"
          neurologicalAssessment="normal"
          treatment={getTreatmentText(formData.bruisingCurrentSeverity)}
          prognosis={getPrognosisText(formData.bruisingCurrentSeverity, formData.bruisingResolveDays)}
        />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>BRUISING</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>Claimant has not reported any issues related to bruising or scarring.</Text>
        </View>
      )}
    </View>
  );
};
