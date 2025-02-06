import { Text, View } from '@react-pdf/renderer';
import { styles } from './reportStyles';

const EntryGroup = ({ label, value }: { label: string; value: string }) => (
  <View style={{ ...styles.compactGroup, marginBottom: 2 }}>
    <Text style={{ ...styles.boldLabel, fontSize: 9 }}>{label}: </Text>
    <Text style={{ ...styles.normalText, fontSize: 9 }}>{value}</Text>
  </View>
);

const ExaminationGroup = ({ title, items }: { title: string; items: { label: string; value: string }[] }) => (
  <View style={{ marginBottom: 5 }}>
    <Text style={{ ...styles.boldLabel, fontSize: 9, marginBottom: 2 }}>{title}</Text>
    <View style={{ ...styles.indentedGroup, marginLeft: 8 }}>
      {items.map((item, index) => (
        <View key={index} style={{ ...styles.compactGroup, marginBottom: 1 }}>
          <Text style={{ ...styles.boldLabel, fontSize: 9 }}>{item.label}: </Text>
          <Text style={{ ...styles.normalText, fontSize: 9 }}>{item.value}</Text>
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
  <View style={{ ...styles.section, marginBottom: 8 }}>
    <Text style={{ ...styles.mainTitle, fontSize: 10, marginBottom: 4 }}>{title}</Text>
    
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
      <View style={{ flex: 1, minWidth: '45%' }}>
        <EntryGroup label="Onset" value={onset} />
        <EntryGroup label="Initial Severity" value={initialSeverity} />
        <EntryGroup label="Current Severity" value={currentSeverity} />
        <EntryGroup label="Classification" value={classification} />
      </View>
      
      <View style={{ flex: 1, minWidth: '45%' }}>
        <EntryGroup label="Mechanism" value={mechanism} />
        <ExaminationGroup 
          title="Examination"
          items={[
            { label: "Palpation", value: palpation },
            { label: "Range of Motion", value: rangeOfMotion },
            { label: "Neurological", value: neurologicalAssessment }
          ]}
        />
      </View>
    </View>

    <View style={{ marginTop: 4 }}>
      <Text style={{ ...styles.boldLabel, fontSize: 9 }}>Treatment and Prognosis</Text>
      <View style={{ ...styles.indentedGroup, marginLeft: 8 }}>
        <Text style={{ ...styles.normalText, fontSize: 9 }}>Pain management: {treatment}</Text>
        <Text style={{ ...styles.boldLabel, fontSize: 9, marginTop: 2 }}>Prognosis: </Text>
        <Text style={{ ...styles.normalText, fontSize: 9 }}>{prognosis}</Text>
      </View>
    </View>
  </View>
);

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  return (
    <View>
      {formData.neckPain === "1" && renderInjurySection(
        "NECK PAIN",
        {
          onset: getOnsetText(formData.neckPainStart),
          initialSeverity: getSeverityText(formData.neckPainInitialSeverity),
          currentSeverity: getSeverityText(formData.neckPainCurrentSeverity),
          classification: "Whiplash injury",
          mechanism: getImpactMechanism(formData.vehiclePosition),
          palpation: `${getSeverityText(formData.neckPainCurrentSeverity)} tenderness in affected area`,
          rangeOfMotion: "Limited due to pain",
          neurologicalAssessment: "normal",
          treatment: "Over-the-counter pain medication and ice therapy recommended",
          prognosis: `From the date of accident: ${formData.neckPainCurrentSeverity === "4" ? 
            `${formData.neckPainResolveDays} DAYS` : 
            formData.neckPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.neckPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.neckPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}

      {formData.shoulderPain === "1" && renderInjurySection(
        "SHOULDER PAIN",
        {
          onset: getOnsetText(formData.shoulderPainStart),
          initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
          currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
          classification: "Whiplash injury",
          mechanism: getImpactMechanism(formData.vehiclePosition),
          palpation: `${getSeverityText(formData.shoulderPainCurrentSeverity)} tenderness in affected area`,
          rangeOfMotion: "Limited due to pain",
          neurologicalAssessment: "normal",
          treatment: "Over-the-counter pain medication and ice therapy recommended",
          prognosis: `From the date of accident: ${formData.shoulderPainCurrentSeverity === "4" ? 
            `${formData.shoulderPainResolveDays} DAYS` : 
            formData.shoulderPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.shoulderPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.shoulderPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}

      {formData.backPain === "1" && renderInjurySection(
        "BACK PAIN",
        {
          onset: getOnsetText(formData.backPainStart),
          initialSeverity: getSeverityText(formData.backPainInitialSeverity),
          currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
          classification: "Whiplash injury",
          mechanism: getImpactMechanism(formData.vehiclePosition),
          palpation: `${getSeverityText(formData.backPainCurrentSeverity)} tenderness in affected area`,
          rangeOfMotion: "Limited due to pain",
          neurologicalAssessment: "normal",
          treatment: "Over-the-counter pain medication and ice therapy recommended",
          prognosis: `From the date of accident: ${formData.backPainCurrentSeverity === "4" ? 
            `${formData.backPainResolveDays} DAYS` : 
            formData.backPainCurrentSeverity === "1" ? "3 MONTHS" :
            formData.backPainCurrentSeverity === "2" ? "6 MONTHS" :
            formData.backPainCurrentSeverity === "3" ? "9 MONTHS" : "6 MONTHS"}`
        }
      )}

      {formData.headache === "1" && renderInjurySection(
        "HEADACHE",
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
