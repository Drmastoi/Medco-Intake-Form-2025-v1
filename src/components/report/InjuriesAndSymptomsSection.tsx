
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
          treatment="Pain management: Over-the-counter pain medication and ice therapy recommended"
          prognosis={`From the date of accident: ${formData.neckPainCurrentSeverity === "4" ? 
            `${formData.neckPainResolveDays} DAYS` : 
            formData.neckPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.neckPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.neckPainCurrentSeverity === "3" ? "9 MONTHS (Prolonged prognosis is due to severity of symptoms)" : "6 MONTHS"}`}
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
          treatment="Pain management: Over-the-counter pain medication and ice therapy recommended"
          prognosis={`From the date of accident: ${formData.shoulderPainCurrentSeverity === "4" ? 
            `${formData.shoulderPainResolveDays} DAYS` : 
            formData.shoulderPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.shoulderPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.shoulderPainCurrentSeverity === "3" ? "9 MONTHS (Prolonged prognosis is due to severity of symptoms)" : "6 MONTHS"}`}
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
          treatment="Pain management: Over-the-counter pain medication and ice therapy recommended"
          prognosis={`From the date of accident: ${formData.backPainCurrentSeverity === "4" ? 
            `${formData.backPainResolveDays} DAYS` : 
            formData.backPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.backPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.backPainCurrentSeverity === "3" ? "9 MONTHS (Prolonged prognosis is due to severity of symptoms)" : "6 MONTHS"}`}
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
          treatment="Pain killers as and when required"
          prognosis={`From the date of accident: ${formData.headacheCurrentSeverity === "4" ? 
            `${formData.headacheResolveDays} DAYS` : 
            formData.headacheCurrentSeverity === "1" ? "3 MONTHS" :
            formData.headacheCurrentSeverity === "2" ? "6 MONTHS" :
            formData.headacheCurrentSeverity === "3" ? "9 MONTHS (Prolonged prognosis is due to severity of symptoms)" : "6 MONTHS"}`}
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
          treatment="Self-help measures including gradual exposure, relaxation techniques, and breathing exercises."
          prognosis={`From the date of accident: ${formData.anxietyCurrentSeverity === "4" ? 
            `${formData.anxietyResolveDays} DAYS` : 
            formData.anxietyCurrentSeverity === "1" ? "3 MONTHS" :
            formData.anxietyCurrentSeverity === "2" ? "6 MONTHS" :
            formData.anxietyCurrentSeverity === "3" ? "9 MONTHS (Prolonged prognosis is due to severity of symptoms)" : "6 MONTHS"}`}
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
          treatment="Self-resolving. Cold compresses and pain management recommended initially."
          prognosis={`From the date of accident: ${
            formData.bruisingCurrentSeverity === "4" ? 
              `${formData.bruisingResolveDays} DAYS` : 
            formData.hasVisibleScar === "1" ? 
              "PERMANENT SCARRING VISIBLE" :
            formData.bruisingCurrentSeverity === "1" ? 
              "3 MONTHS" :
            formData.bruisingCurrentSeverity === "2" ? 
              "6 MONTHS" :
            formData.bruisingCurrentSeverity === "3" ? 
              "9 MONTHS (Prolonged prognosis is due to severity of symptoms)" : 
              "6 MONTHS"
          }`}
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
