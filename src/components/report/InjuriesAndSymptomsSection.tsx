
import { Text, View } from '@react-pdf/renderer';
import { styles } from './reportStyles';

const EntryGroup = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.compactGroup}>
    <Text style={styles.boldLabel}>{label}: </Text>
    <Text style={styles.normalText}>{value}</Text>
  </View>
);

const ExaminationGroup = ({ title, items }: { title: string; items: { label: string; value: string }[] }) => (
  <View>
    <Text style={styles.boldLabel}>{title}</Text>
    <View style={styles.indentedGroup}>
      {items.map((item, index) => (
        <View key={index} style={styles.compactGroup}>
          <Text style={styles.boldLabel}>{item.label}: </Text>
          <Text style={styles.normalText}>{item.value}</Text>
        </View>
      ))}
    </View>
  </View>
);

const getOnsetText = (onset: string) => {
  switch (onset) {
    case "1": return "Same day";
    case "2": return "Next Day";
    case "3": return "Few days Later";
    default: return "Not specified";
  }
};

const getSeverityText = (severity: string) => {
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
  }
};

const getImpactMechanism = (vehiclePosition: string) => {
  switch (vehiclePosition) {
    case "1": return "jolted forward and backward";
    case "2": return "jolted sideways";
    case "3": return "jolted backwards and then forward";
    default: return "experienced impact";
  }
};

const renderInjurySection = (
  title: string,
  injuryNumber: number,
  {
    onset,
    initialSeverity,
    currentSeverity,
    classification,
    mechanism,
    palpation,
    rangeOfMotion,
    neurologicalAssessment,
    treatment,
    prognosis
  }: {
    onset: string;
    initialSeverity: string;
    currentSeverity: string;
    classification: string;
    mechanism: string;
    palpation: string;
    rangeOfMotion: string;
    neurologicalAssessment: string;
    treatment: string;
    prognosis: string;
  }
) => (
  <View style={styles.section}>
    <Text style={styles.mainTitle}>{injuryNumber}. {title}</Text>
    
    <EntryGroup label="Onset" value={onset} />
    <EntryGroup label="Initial Severity" value={initialSeverity} />
    <EntryGroup label="Current Severity" value={currentSeverity} />
    <EntryGroup label="Classification" value={classification} />
    <EntryGroup label="Causation/Mechanism" value={mechanism} />

    <View style={styles.sectionGap}>
      <ExaminationGroup 
        title="Examination"
        items={[
          { label: "Palpation", value: palpation },
          { label: "Range of Motion", value: rangeOfMotion },
          { label: "Neurological Assessment", value: neurologicalAssessment }
        ]}
      />
    </View>

    <View style={styles.sectionGap}>
      <Text style={styles.boldLabel}>Treatment and Prognosis</Text>
      <View style={styles.indentedGroup}>
        <Text style={styles.boldLabel}>Treatment</Text>
        <Text style={styles.normalText}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
        <Text style={styles.boldLabel}>Physiotherapy Recommended</Text>
        <Text style={styles.normalText}>Number of sessions to be decided by the referred expert</Text>
        <Text style={styles.boldLabel}>Prognosis</Text>
        <Text style={styles.normalText}>{prognosis}</Text>
      </View>
    </View>
  </View>
);

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  let injuryCount = 0;

  return (
    <View>
      {formData.neckPain === "1" && renderInjurySection(
        "NECK PAIN",
        ++injuryCount,
        {
          onset: getOnsetText(formData.neckPainStart),
          initialSeverity: getSeverityText(formData.neckPainInitialSeverity),
          currentSeverity: getSeverityText(formData.neckPainCurrentSeverity),
          classification: "Whiplash injury",
          mechanism: getImpactMechanism(formData.vehiclePosition),
          palpation: `${getSeverityText(formData.neckPainCurrentSeverity)} tenderness in affected area`,
          rangeOfMotion: "Limited due to pain",
          neurologicalAssessment: "normal",
          treatment: "Pain management: Over-the-counter pain medication and ice therapy recommended",
          prognosis: `From the date of accident: ${formData.neckPainCurrentSeverity === "4" ? 
            `${formData.neckPainResolveDays} DAYS` : 
            formData.neckPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.neckPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.neckPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}

      {formData.shoulderPain === "1" && renderInjurySection(
        "SHOULDER PAIN",
        ++injuryCount,
        {
          onset: getOnsetText(formData.shoulderPainStart),
          initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
          currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
          classification: "Whiplash injury",
          mechanism: getImpactMechanism(formData.vehiclePosition),
          palpation: `${getSeverityText(formData.shoulderPainCurrentSeverity)} tenderness in affected area`,
          rangeOfMotion: "Limited due to pain",
          neurologicalAssessment: "normal",
          treatment: "Pain management: Over-the-counter pain medication and ice therapy recommended",
          prognosis: `From the date of accident: ${formData.shoulderPainCurrentSeverity === "4" ? 
            `${formData.shoulderPainResolveDays} DAYS` : 
            formData.shoulderPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.shoulderPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.shoulderPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}

      {formData.backPain === "1" && renderInjurySection(
        "BACK PAIN",
        ++injuryCount,
        {
          onset: getOnsetText(formData.backPainStart),
          initialSeverity: getSeverityText(formData.backPainInitialSeverity),
          currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
          classification: "Whiplash injury",
          mechanism: getImpactMechanism(formData.vehiclePosition),
          palpation: `${getSeverityText(formData.backPainCurrentSeverity)} tenderness in affected area`,
          rangeOfMotion: "Limited due to pain",
          neurologicalAssessment: "normal",
          treatment: "Pain management: Over-the-counter pain medication and ice therapy recommended",
          prognosis: `From the date of accident: ${formData.backPainCurrentSeverity === "4" ? 
            `${formData.backPainResolveDays} DAYS` : 
            formData.backPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.backPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.backPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}

      {formData.headache === "1" && renderInjurySection(
        "HEADACHE",
        ++injuryCount,
        {
          onset: getOnsetText(formData.headacheStart),
          initialSeverity: getSeverityText(formData.headacheInitialSeverity),
          currentSeverity: getSeverityText(formData.headacheCurrentSeverity),
          classification: "Non-whiplash injury",
          mechanism: "It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018.",
          palpation: "Not applicable",
          rangeOfMotion: "Not applicable",
          neurologicalAssessment: "normal",
          treatment: "Self-Resolving condition. Take simple pain killers as and when required",
          prognosis: `From the date of accident: ${formData.headacheCurrentSeverity === "4" ? 
            `${formData.headacheResolveDays} DAYS` : 
            formData.headacheCurrentSeverity === "1" ? "3 MONTHS" :
            formData.headacheCurrentSeverity === "2" ? "6 MONTHS" :
            formData.headacheCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}

      {formData.travelAnxiety === "1" && renderInjurySection(
        "TRAVEL ANXIETY",
        ++injuryCount,
        {
          onset: getOnsetText(formData.anxietyStart),
          initialSeverity: getSeverityText(formData.anxietyInitialSeverity),
          currentSeverity: getSeverityText(formData.anxietyCurrentSeverity),
          classification: "Non-whiplash injury",
          mechanism: "It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018.",
          palpation: "Not applicable",
          rangeOfMotion: "Not applicable",
          neurologicalAssessment: "normal",
          treatment: "Self-Resolving condition",
          prognosis: `From the date of accident: ${formData.anxietyCurrentSeverity === "4" ? 
            `${formData.anxietyResolveDays} DAYS` : 
            formData.anxietyCurrentSeverity === "1" ? "3 MONTHS" :
            formData.anxietyCurrentSeverity === "2" ? "6 MONTHS" :
            formData.anxietyCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}
    </View>
  );
};
