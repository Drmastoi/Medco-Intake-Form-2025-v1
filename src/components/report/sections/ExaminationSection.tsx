
import { Text, View } from '@react-pdf/renderer';

interface ExaminationSectionProps {
  formData: any;
  styles: any;
}

const getPrognosis = (severity: string) => {
  if (severity === "1") return "3 months post accident";
  if (severity === "2") return "6 months post accident";
  if (severity === "3") return "9 months post accident";
  return "Unknown";
};

const getExaminationDetails = (injuryType: string, severity: string) => {
  let observation = "Normal";
  let movementRestriction = "";
  
  if (severity === "1") {
    observation = "Mild";
    movementRestriction = "Mild Restriction | Extremes mild Painful";
  } else if (severity === "2") {
    observation = "Moderate";
    movementRestriction = "Moderate Restriction | Extremes moderate Painful";
  } else if (severity === "3") {
    observation = "Severe";
    movementRestriction = "Severe Restriction | Extremes severe Painful";
  }
  
  return {
    observation,
    movementRestriction
  };
};

export const ExaminationSection = ({ formData, styles }: ExaminationSectionProps) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>Section 14 - Examination</Text>
      
      <View style={styles.grayBackground}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>14.1 General Physical Examination</Text>
      </View>
      
      <Text style={styles.text}>
        In my observation, the Claimant was not tearful, not agitated, good eye contact, good rapport, 
        time and place orientation, and showed signs of no psychotic features, no delusional ideas, 
        and no thought disorder. Communication was normal. Claimant was not using any walking aids.
      </Text>
      <Text style={styles.text}>Dominant Hand - {formData.dominantHand || 'Right'}</Text>
      
      {formData.neckPain === "1" && (
        <>
          <View style={styles.grayBackground}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}>14.2 Physical Examination</Text>
          </View>
          
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Neck</Text>
          <View style={styles.rtaTable}>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Examination:</Text>
              <Text style={styles.rtaValue}>Observation {getExaminationDetails("neck", formData.neckPainCurrentSeverity).observation}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Movements:</Text>
              <Text style={styles.rtaValue}>Flexion, Extension {getExaminationDetails("neck", formData.neckPainCurrentSeverity).movementRestriction}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>Left Lateral Flexion, Right Lateral Flexion | Left side | Normal</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>No neurovascular deficits noted.</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Prognosis:</Text>
              <Text style={styles.rtaValue}>{getPrognosis(formData.neckPainCurrentSeverity)}</Text>
            </View>
            {formData.neckPainCurrentSeverity === "3" && (
              <View style={styles.rtaRow}>
                <Text style={styles.rtaLabel}></Text>
                <Text style={styles.rtaValue}>The extended prognosis is due to the severity of the symptoms.</Text>
              </View>
            )}
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Treatment Recommendation:</Text>
              <Text style={styles.rtaValue}>Physiotherapy - The required number of sessions to be determined by the Physiotherapist</Text>
            </View>
          </View>
        </>
      )}

      {formData.shoulderPain === "1" && (
        <>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Shoulder</Text>
          <View style={styles.rtaTable}>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Examination:</Text>
              <Text style={styles.rtaValue}>Observation {getExaminationDetails("shoulder", formData.shoulderPainCurrentSeverity).observation}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Movements:</Text>
              <Text style={styles.rtaValue}>Flexion, Extension {getExaminationDetails("shoulder", formData.shoulderPainCurrentSeverity).movementRestriction}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>Left Lateral Flexion, Right Lateral Flexion | Left side | Normal</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>No neurovascular deficits noted.</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Prognosis:</Text>
              <Text style={styles.rtaValue}>{getPrognosis(formData.shoulderPainCurrentSeverity)}</Text>
            </View>
            {formData.shoulderPainCurrentSeverity === "3" && (
              <View style={styles.rtaRow}>
                <Text style={styles.rtaLabel}></Text>
                <Text style={styles.rtaValue}>The extended prognosis is due to the severity of the symptoms.</Text>
              </View>
            )}
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Treatment Recommendation:</Text>
              <Text style={styles.rtaValue}>Physiotherapy - The required number of sessions to be determined by the Physiotherapist</Text>
            </View>
          </View>
        </>
      )}

      {formData.backPain === "1" && (
        <>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Back</Text>
          <View style={styles.rtaTable}>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Examination:</Text>
              <Text style={styles.rtaValue}>Observation {getExaminationDetails("back", formData.backPainCurrentSeverity).observation}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Movements:</Text>
              <Text style={styles.rtaValue}>Flexion, Extension {getExaminationDetails("back", formData.backPainCurrentSeverity).movementRestriction}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>Left Lateral Flexion, Right Lateral Flexion | Left side | Normal</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>No neurovascular deficits noted.</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Prognosis:</Text>
              <Text style={styles.rtaValue}>{getPrognosis(formData.backPainCurrentSeverity)}</Text>
            </View>
            {formData.backPainCurrentSeverity === "3" && (
              <View style={styles.rtaRow}>
                <Text style={styles.rtaLabel}></Text>
                <Text style={styles.rtaValue}>The extended prognosis is due to the severity of the symptoms.</Text>
              </View>
            )}
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Treatment Recommendation:</Text>
              <Text style={styles.rtaValue}>Physiotherapy - The required number of sessions to be determined by the Physiotherapist</Text>
            </View>
          </View>
        </>
      )}

      {formData.headache === "1" && (
        <>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Headache</Text>
          <View style={styles.grayBackground}>
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Examination</Text>
                <Text style={styles.text}>
                  On examination, there was no visible bruising or swelling. There was mild tenderness 
                  on palpation. No neurological deficit detected.
                </Text>
              </View>
            </View>
          </View>
        </>
      )}

      {formData.hasOtherInjury === "1" && (
        <>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>{formData.injuryName || "Other Injury"}</Text>
          <View style={styles.rtaTable}>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Examination:</Text>
              <Text style={styles.rtaValue}>Observation {getExaminationDetails("other", formData.injuryCurrentSeverity).observation}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Movements:</Text>
              <Text style={styles.rtaValue}>Flexion, Extension {getExaminationDetails("other", formData.injuryCurrentSeverity).movementRestriction}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>Left Lateral Flexion, Right Lateral Flexion | Left side | Normal</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>No neurovascular deficits noted.</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Prognosis:</Text>
              <Text style={styles.rtaValue}>{getPrognosis(formData.injuryCurrentSeverity)}</Text>
            </View>
            {formData.injuryCurrentSeverity === "3" && (
              <View style={styles.rtaRow}>
                <Text style={styles.rtaLabel}></Text>
                <Text style={styles.rtaValue}>The extended prognosis is due to the severity of the symptoms.</Text>
              </View>
            )}
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Treatment Recommendation:</Text>
              <Text style={styles.rtaValue}>Physiotherapy - The required number of sessions to be determined by the Physiotherapist</Text>
            </View>
          </View>
        </>
      )}

      {formData.hasBruising === "1" && (
        <>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Bruising/Scarring</Text>
          <View style={styles.rtaTable}>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Examination:</Text>
              <Text style={styles.rtaValue}>Observation {getExaminationDetails("bruising", formData.bruisingCurrentSeverity).observation}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Location:</Text>
              <Text style={styles.rtaValue}>{formData.bruisingLocation || "Not specified"}</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}></Text>
              <Text style={styles.rtaValue}>No neurovascular deficits noted.</Text>
            </View>
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Prognosis:</Text>
              <Text style={styles.rtaValue}>{getPrognosis(formData.bruisingCurrentSeverity)}</Text>
            </View>
            {formData.bruisingCurrentSeverity === "3" && (
              <View style={styles.rtaRow}>
                <Text style={styles.rtaLabel}></Text>
                <Text style={styles.rtaValue}>The extended prognosis is due to the severity of the symptoms.</Text>
              </View>
            )}
            <View style={styles.rtaRow}>
              <Text style={styles.rtaLabel}>Treatment Recommendation:</Text>
              <Text style={styles.rtaValue}>Physiotherapy - The required number of sessions to be determined by the Physiotherapist</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
