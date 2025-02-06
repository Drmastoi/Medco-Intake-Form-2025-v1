
import { View } from '@react-pdf/renderer';
import { InjurySection } from './InjurySection';
import { getOnsetText, getSeverityText, getImpactMechanism } from '../../utils/injuryTextUtils';

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  return (
    <View>
      {formData.neckPain === "1" && (
        <InjurySection
          title="NECK PAIN"
          onset={getOnsetText(formData.neckPainStart)}
          initialSeverity={getSeverityText(formData.neckPainInitialSeverity)}
          currentSeverity={getSeverityText(formData.neckPainCurrentSeverity)}
          classification="Whiplash injury"
          mechanism={getImpactMechanism(formData.vehiclePosition)}
          palpation={`${getSeverityText(formData.neckPainCurrentSeverity)} tenderness in affected area`}
          rangeOfMotion="Limited due to pain"
          neurologicalAssessment="normal"
          treatment="Over-the-counter pain medication and ice therapy recommended"
          prognosis={`From the date of accident: ${formData.neckPainCurrentSeverity === "4" ? 
            `${formData.neckPainResolveDays} DAYS` : 
            formData.neckPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.neckPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.neckPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`}
        />
      )}

      {formData.shoulderPain === "1" && (
        <InjurySection
          title="SHOULDER PAIN"
          onset={getOnsetText(formData.shoulderPainStart)}
          initialSeverity={getSeverityText(formData.shoulderPainInitialSeverity)}
          currentSeverity={getSeverityText(formData.shoulderPainCurrentSeverity)}
          classification="Whiplash injury"
          mechanism={getImpactMechanism(formData.vehiclePosition)}
          palpation={`${getSeverityText(formData.shoulderPainCurrentSeverity)} tenderness in affected area`}
          rangeOfMotion="Limited due to pain"
          neurologicalAssessment="normal"
          treatment="Over-the-counter pain medication and ice therapy recommended"
          prognosis={`From the date of accident: ${formData.shoulderPainCurrentSeverity === "4" ? 
            `${formData.shoulderPainResolveDays} DAYS` : 
            formData.shoulderPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.shoulderPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.shoulderPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`}
        />
      )}

      {formData.backPain === "1" && (
        <InjurySection
          title="BACK PAIN"
          onset={getOnsetText(formData.backPainStart)}
          initialSeverity={getSeverityText(formData.backPainInitialSeverity)}
          currentSeverity={getSeverityText(formData.backPainCurrentSeverity)}
          classification="Whiplash injury"
          mechanism={getImpactMechanism(formData.vehiclePosition)}
          palpation={`${getSeverityText(formData.backPainCurrentSeverity)} tenderness in affected area`}
          rangeOfMotion="Limited due to pain"
          neurologicalAssessment="normal"
          treatment="Over-the-counter pain medication and ice therapy recommended"
          prognosis={`From the date of accident: ${formData.backPainCurrentSeverity === "4" ? 
            `${formData.backPainResolveDays} DAYS` : 
            formData.backPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.backPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.backPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`}
        />
      )}

      {formData.headache === "1" && (
        <InjurySection
          title="HEADACHE"
          onset={getOnsetText(formData.headacheStart)}
          initialSeverity={getSeverityText(formData.headacheInitialSeverity)}
          currentSeverity={getSeverityText(formData.headacheCurrentSeverity)}
          classification="Non-whiplash injury"
          mechanism="It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018."
          palpation="Not applicable"
          rangeOfMotion="Not applicable"
          neurologicalAssessment="normal"
          treatment="Self-Resolving condition. Take simple pain killers as and when required"
          prognosis={`From the date of accident: ${formData.headacheCurrentSeverity === "4" ? 
            `${formData.headacheResolveDays} DAYS` : 
            formData.headacheCurrentSeverity === "1" ? "3 MONTHS" :
            formData.headacheCurrentSeverity === "2" ? "6 MONTHS" :
            formData.headacheCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`}
        />
      )}

      {formData.travelAnxiety === "1" && (
        <InjurySection
          title="TRAVEL ANXIETY"
          onset={getOnsetText(formData.anxietyStart)}
          initialSeverity={getSeverityText(formData.anxietyInitialSeverity)}
          currentSeverity={getSeverityText(formData.anxietyCurrentSeverity)}
          classification="Non-whiplash injury"
          mechanism="It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018."
          palpation="Not applicable"
          rangeOfMotion="Not applicable"
          neurologicalAssessment="normal"
          treatment="Self-Resolving condition"
          prognosis={`From the date of accident: ${formData.anxietyCurrentSeverity === "4" ? 
            `${formData.anxietyResolveDays} DAYS` : 
            formData.anxietyCurrentSeverity === "1" ? "3 MONTHS" :
            formData.anxietyCurrentSeverity === "2" ? "6 MONTHS" :
            formData.anxietyCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`}
        />
      )}
    </View>
  );
};
