
import { View, Text } from '@react-pdf/renderer';
import { InjurySection } from './injuryReport/InjurySection';
import { getOnsetText, getSeverityText, getImpactMechanism } from '../../utils/injuryTextUtils';

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  let injuryCount = 0;

  // Helper function to check if the prognosis is 9 months or more
  const isLongTermPrognosis = (severityValue: string) => {
    return severityValue === "3"; // Severity 3 corresponds to 9 months prognosis
  };

  // Helper function to get prognosis text with additional note for long-term cases
  const getPrognosisText = (severityValue: string, resolveDays?: string) => {
    let prognosis = "";
    
    if (severityValue === "4" && resolveDays) {
      prognosis = `${resolveDays} DAYS`;
    } else if (severityValue === "1") {
      prognosis = "3 MONTHS";
    } else if (severityValue === "2") {
      prognosis = "6 MONTHS";
    } else if (severityValue === "3") {
      prognosis = "9 MONTHS";
    } else {
      prognosis = "6 MONTHS";
    }
    
    return prognosis;
  };

  return (
    <View>
      {formData.neckPain === "1" && (
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
          prognosis={`From the date of accident: ${getPrognosisText(formData.neckPainCurrentSeverity, formData.neckPainResolveDays)}`}
          isLongTerm={isLongTermPrognosis(formData.neckPainCurrentSeverity)}
        />
      )}

      {formData.shoulderPain === "1" && (
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
          prognosis={`From the date of accident: ${getPrognosisText(formData.shoulderPainCurrentSeverity, formData.shoulderPainResolveDays)}`}
          isLongTerm={isLongTermPrognosis(formData.shoulderPainCurrentSeverity)}
        />
      )}

      {formData.backPain === "1" && (
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
          prognosis={`From the date of accident: ${getPrognosisText(formData.backPainCurrentSeverity, formData.backPainResolveDays)}`}
          isLongTerm={isLongTermPrognosis(formData.backPainCurrentSeverity)}
        />
      )}

      {formData.headache === "1" && (
        <InjurySection
          title="HEADACHE"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.headacheStart)}
          initialSeverity={getSeverityText(formData.headacheInitialSeverity)}
          currentSeverity={getSeverityText(formData.headacheCurrentSeverity)}
          classification="Non-whiplash injury"
          mechanism="It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018."
          palpation="Not applicable"
          rangeOfMotion="Not applicable"
          neurologicalAssessment="normal"
          treatment="Self-Resolving condition. Take simple pain killers as and when required"
          prognosis={`From the date of accident: ${getPrognosisText(formData.headacheCurrentSeverity, formData.headacheResolveDays)}`}
          isLongTerm={isLongTermPrognosis(formData.headacheCurrentSeverity)}
        />
      )}

      {formData.travelAnxiety === "1" && (
        <InjurySection
          title="TRAVEL ANXIETY"
          injuryNumber={++injuryCount}
          onset={getOnsetText(formData.anxietyStart)}
          initialSeverity={getSeverityText(formData.anxietyInitialSeverity)}
          currentSeverity={getSeverityText(formData.anxietyCurrentSeverity)}
          classification="Non-whiplash injury"
          mechanism="It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018."
          palpation="Not applicable"
          rangeOfMotion="Not applicable"
          neurologicalAssessment="normal"
          treatment="Self-Resolving condition"
          prognosis={`From the date of accident: ${getPrognosisText(formData.anxietyCurrentSeverity, formData.anxietyResolveDays)}`}
          isLongTerm={isLongTermPrognosis(formData.anxietyCurrentSeverity)}
        />
      )}
      
      <Text style={{ fontSize: 10, fontStyle: 'italic', marginTop: 15, marginBottom: 5 }}>
        I have acknowledged the Letter of Instruction and I confirm there were no other injuries suffered by the client as told to me during the examination after direct questioning.
      </Text>
    </View>
  );
};
