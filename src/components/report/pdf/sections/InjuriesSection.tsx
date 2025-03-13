
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { getOnsetText } from '@/utils/injuryTextUtils';

interface InjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const InjuriesSection = ({ formData, styles }: InjuriesSectionProps) => {
  // Helper function to determine prognosis based on severity and resolve days
  const getPrognosis = (severity: string, resolveDays?: string) => {
    if (severity === "Resolved" && resolveDays) {
      return `${resolveDays} days`;
    } else if (severity === "Mild") {
      return "3 Months";
    } else if (severity === "Moderate") {
      return "6 Months";
    } else if (severity === "Severe") {
      return "9 Months";
    }
    return "6 Months"; // Default
  };

  // Helper function to get examination text based on severity
  const getExaminationText = (severity: string) => {
    const restrictionLevel = severity === "Mild" ? "mildly" : 
                            severity === "Moderate" ? "moderately" : 
                            severity === "Severe" ? "severely" : "mildly";
    
    return `Observation is normal. Flexion extension Movements are ${restrictionLevel} restricted. ${severity} muscular tenderness is present on extreme movements, ${severity.toLowerCase()} muscular spasm is present. No Neurovascular Deficit`;
  };

  // Helper for prognosis notes
  const getPrognosisNotes = (severity: string, prognosis: string) => {
    if (severity === "Severe" || (prognosis.includes("Month") && parseInt(prognosis) >= 8)) {
      return " Prolonged prognosis is due to severity of symptoms.";
    }
    return "";
  };

  // Helper function to get formatted onset text from numeric code
  const getFormattedOnsetText = (onset: string) => {
    return getOnsetText(onset);
  };

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 8 - Injuries and Symptoms</Text>
      
      {/* 8.1 Neck Pain */}
      {formData.injuries.neckPain.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.1 Neck Pain</Text>
          
          <View style={{ marginLeft: 10, marginBottom: 5 }}>
            {/* Grid-like layout with two columns */}
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Symptoms:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Pain, stiffness and discomfort</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Onset:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getFormattedOnsetText(formData.injuries.neckPain.painStart)}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Initial Severity:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.neckPain.initialSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Current Status:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.neckPain.currentSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Mechanism of Injury:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Whiplash injury</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Examination:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getExaminationText(formData.injuries.neckPain.currentSeverity)}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Opinion:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>On the balance of probabilities, they are attributable to the index accident. In my opinion, the Claimant's symptoms are due to a whiplash injury.</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Additional Report:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Not Required</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>History:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  {formData.injuries.neckPain.hadPrior 
                    ? "The Claimant reported having similar symptoms before the index accident."
                    : "The Claimant reported no prior similar symptoms before the index accident."}
                </Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Treatment Recommendation:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Physiotherapy, the required number of sessions to be determined by the Physiotherapist.</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Prognosis:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  From the date of accident: {getPrognosis(formData.injuries.neckPain.currentSeverity, formData.injuries.neckPain.resolveDays)}
                  {getPrognosisNotes(formData.injuries.neckPain.currentSeverity, getPrognosis(formData.injuries.neckPain.currentSeverity, formData.injuries.neckPain.resolveDays))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      
      {/* 8.2 Shoulder Pain */}
      {formData.injuries.shoulderPain.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.2 Shoulder Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported pain in the {formData.injuries.shoulderPain.side.toLowerCase()} shoulder. 
            The pain started {getFormattedOnsetText(formData.injuries.shoulderPain.painStart).toLowerCase()}. 
            The initial severity was {formData.injuries.shoulderPain.initialSeverity.toLowerCase()}. 
            {formData.injuries.shoulderPain.currentSeverity === "Resolved" 
              ? ` The shoulder pain has now resolved after ${formData.injuries.shoulderPain.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.shoulderPain.currentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* 8.3 Back Pain */}
      {formData.injuries.backPain.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.3 Back Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported pain in the {formData.injuries.backPain.location.toLowerCase()} back. 
            The pain started {getFormattedOnsetText(formData.injuries.backPain.painStart).toLowerCase()}. 
            The initial severity was {formData.injuries.backPain.initialSeverity.toLowerCase()}. 
            {formData.injuries.backPain.currentSeverity === "Resolved" 
              ? ` The back pain has now resolved after ${formData.injuries.backPain.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.backPain.currentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* 8.4 Headache */}
      {formData.injuries.headache.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.4 Headache</Text>
          <Text style={styles.fieldValue}>
            The claimant reported headaches following the accident. 
            The headaches started {getFormattedOnsetText(formData.injuries.headache.start).toLowerCase()}. 
            The initial severity was {formData.injuries.headache.initialSeverity.toLowerCase()}. 
            {formData.injuries.headache.currentSeverity === "Resolved" 
              ? ` The headaches have now resolved after ${formData.injuries.headache.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.headache.currentSeverity.toLowerCase()}.`}
            {formData.injuries.headache.pastHistory && ` Additional information: ${formData.injuries.headache.pastHistory}`}
          </Text>
        </View>
      )}
      
      {/* 8.5 Travel Anxiety */}
      {formData.travelAnxiety.hasAnxiety && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.5 Travel Anxiety</Text>
          <Text style={styles.fieldValue}>
            The claimant reported travel anxiety following the accident. 
            The initial severity was {formData.travelAnxiety.initialSeverity.toLowerCase()}. 
            {formData.travelAnxiety.currentSeverity === "Resolved" 
              ? ` The anxiety has now resolved after ${formData.travelAnxiety.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.travelAnxiety.currentSeverity.toLowerCase()}.`}
            {formData.travelAnxiety.symptoms && formData.travelAnxiety.symptoms.length > 0 && 
              ` Symptoms include: ${formData.travelAnxiety.symptoms.join(", ")}.`}
          </Text>
        </View>
      )}
      
      {/* 8.6 Bruising */}
      {formData.other?.bruising?.hasBruising && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.6 Bruising</Text>
          <Text style={styles.fieldValue}>
            The claimant reported bruising following the accident.
            {formData.other.bruising.location && ` The bruising was located at ${formData.other.bruising.location}.`}
            {formData.other.bruising.initialSeverity && ` Initial severity was ${formData.other.bruising.initialSeverity.toLowerCase()}.`}
            {formData.other.bruising.currentSeverity === "Resolved" 
              ? ` The bruising has now resolved after ${formData.other.bruising.resolveDays || "an unspecified number of"} days.` 
              : formData.other.bruising.currentSeverity && ` The current severity is ${formData.other.bruising.currentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* 8.7 Other Injuries */}
      {formData.other?.otherInjuries?.hasOtherInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.7 Other Injuries</Text>
          <Text style={styles.fieldValue}>
            The claimant reported other injuries following the accident: 
            {formData.other.otherInjuries.name && ` ${formData.other.otherInjuries.name}.`}
            {formData.other.otherInjuries.initialSeverity && ` Initial severity was ${formData.other.otherInjuries.initialSeverity.toLowerCase()}.`}
            {formData.other.otherInjuries.currentSeverity === "Resolved" 
              ? ` The injury has now resolved after ${formData.other.otherInjuries.resolveDays || "an unspecified number of"} days.` 
              : formData.other.otherInjuries.currentSeverity && ` The current severity is ${formData.other.otherInjuries.currentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* Display a message if no injuries reported */}
      {!formData.injuries.neckPain.hasInjury && 
       !formData.injuries.shoulderPain.hasInjury && 
       !formData.injuries.backPain.hasInjury && 
       !formData.injuries.headache.hasInjury && 
       !formData.travelAnxiety.hasAnxiety && 
       !formData.other?.bruising?.hasBruising && 
       !formData.other?.otherInjuries?.hasOtherInjury && (
        <Text style={styles.fieldValue}>No significant injuries were reported by the claimant.</Text>
      )}
    </View>
  );
};
