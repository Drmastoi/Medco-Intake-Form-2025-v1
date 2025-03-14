
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
      return " (Prolonged prognosis is due to severity of symptoms)";
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
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.1 Neck Pain</Text>
        
        {formData.injuries.neckPain.hasInjury ? (
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
        ) : (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fieldValue}>Claimant has not reported any injuries related to neck pain.</Text>
          </View>
        )}
      </View>
      
      {/* 8.2 Shoulder Pain */}
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.2 Shoulder Pain</Text>
        
        {formData.injuries.shoulderPain.hasInjury ? (
          <View style={{ marginLeft: 10, marginBottom: 5 }}>
            {/* Grid-like layout with two columns */}
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Symptoms:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Pain, stiffness and restricted movement in the {formData.injuries.shoulderPain.side.toLowerCase()} shoulder</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Onset:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getFormattedOnsetText(formData.injuries.shoulderPain.painStart)}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Initial Severity:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.initialSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Current Status:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.currentSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Affected Side:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.side}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Mechanism of Injury:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Whiplash injury with referred pain to shoulder</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Examination:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getExaminationText(formData.injuries.shoulderPain.currentSeverity)}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Opinion:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>On the balance of probabilities, the shoulder pain is attributable to the index accident. The symptoms are consistent with a whiplash-related shoulder injury.</Text>
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
                  From the date of accident: {getPrognosis(formData.injuries.shoulderPain.currentSeverity, formData.injuries.shoulderPain.resolveDays)}
                  {getPrognosisNotes(formData.injuries.shoulderPain.currentSeverity, getPrognosis(formData.injuries.shoulderPain.currentSeverity, formData.injuries.shoulderPain.resolveDays))}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fieldValue}>Claimant has not reported any injuries related to shoulder pain.</Text>
          </View>
        )}
      </View>
      
      {/* 8.3 Back Pain */}
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.3 Back Pain</Text>
        
        {formData.injuries.backPain.hasInjury ? (
          <View style={{ marginLeft: 10, marginBottom: 5 }}>
            {/* Grid-like layout with two columns */}
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Symptoms:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Pain, stiffness and discomfort in the {formData.injuries.backPain.location.toLowerCase()} back</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Onset:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getFormattedOnsetText(formData.injuries.backPain.painStart)}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Initial Severity:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.backPain.initialSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Current Status:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.backPain.currentSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Affected Area:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.backPain.location} Back</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Mechanism of Injury:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Acceleration/deceleration forces during the accident causing soft tissue injury</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Examination:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getExaminationText(formData.injuries.backPain.currentSeverity)}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Opinion:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>On the balance of probabilities, the back pain is attributable to the index accident. The symptoms are consistent with a soft tissue injury caused by the impact.</Text>
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
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Treatment Recommendation:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Physiotherapy and painkillers as needed. The required number of physiotherapy sessions to be determined by the Physiotherapist.</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Prognosis:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  From the date of accident: {getPrognosis(formData.injuries.backPain.currentSeverity, formData.injuries.backPain.resolveDays)}
                  {getPrognosisNotes(formData.injuries.backPain.currentSeverity, getPrognosis(formData.injuries.backPain.currentSeverity, formData.injuries.backPain.resolveDays))}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fieldValue}>Claimant has not reported any injuries related to back pain.</Text>
          </View>
        )}
      </View>
      
      {/* 8.4 Headache */}
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.4 Headache</Text>
        
        {formData.injuries.headache.hasInjury ? (
          <View style={{ marginLeft: 10, marginBottom: 5 }}>
            {/* Grid-like layout with two columns */}
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Symptoms:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Headache</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Onset:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getFormattedOnsetText(formData.injuries.headache.start)}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Initial Severity:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.headache.initialSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Current Status:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.injuries.headache.currentSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Mechanism of Injury:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Due to sudden jolt of the head during the accident</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Examination:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Observation is normal. Vision normal, No Neurovascular Deficit</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Opinion:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>On the balance of probabilities, they are attributable to the index accident. In my opinion, the Claimant's symptoms are due to Whiplash associated referred pain.</Text>
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
                  {formData.injuries.headache.pastHistory && formData.injuries.headache.pastHistory !== 'None' 
                    ? `The Claimant reported having similar symptoms before the index accident: ${formData.injuries.headache.pastHistory}`
                    : "The Claimant reported no prior similar symptoms before the index accident."}
                </Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Treatment Recommendation:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Pain killers as and when required.</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Prognosis:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  From the date of accident: {getPrognosis(formData.injuries.headache.currentSeverity, formData.injuries.headache.resolveDays)}
                  {getPrognosisNotes(formData.injuries.headache.currentSeverity, getPrognosis(formData.injuries.headache.currentSeverity, formData.injuries.headache.resolveDays))}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fieldValue}>Claimant has not reported any injuries related to headache.</Text>
          </View>
        )}
      </View>
      
      {/* 8.5 Bruising */}
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.5 Bruising</Text>
        
        {formData.other?.bruising?.hasBruising ? (
          <View style={{ marginLeft: 10, marginBottom: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Location:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.other.bruising.location || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Onset:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getFormattedOnsetText(formData.other.bruising.noticed || "")}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Initial Severity:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.other.bruising.initialSeverity || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Current Status:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.other.bruising.currentSeverity || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Visible Scar:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.other.bruising.hasVisibleScar === true ? "Yes" : "No"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Mechanism of Injury:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Direct impact trauma during the collision</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Treatment Recommendation:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Self-resolving. Cold compresses and pain management recommended initially.</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Prognosis:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  {formData.other.bruising.currentSeverity === "Resolved" 
                    ? `Resolved after ${formData.other.bruising.resolveDays || "unspecified number of"} days` 
                    : formData.other.bruising.hasVisibleScar 
                      ? "Permanent scarring visible" 
                      : `From the date of accident: ${getPrognosis(formData.other.bruising.currentSeverity || "", formData.other.bruising.resolveDays)}`}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fieldValue}>Claimant has not reported any bruising or scarring issues.</Text>
          </View>
        )}
      </View>
      
      {/* 8.6 Other Injuries */}
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.6 Other Injuries</Text>
        
        {formData.other?.otherInjuries?.hasOtherInjury ? (
          <View style={{ marginLeft: 10, marginBottom: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Injury:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.other.otherInjuries.name || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Onset:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{getFormattedOnsetText(formData.other.otherInjuries.start || "")}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Initial Severity:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.other.otherInjuries.initialSeverity || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Current Status:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.other.otherInjuries.currentSeverity || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Treatment Recommendation:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Treatment as advised by specialist.</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Prognosis:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  {formData.other.otherInjuries.currentSeverity === "Resolved" 
                    ? `Resolved after ${formData.other.otherInjuries.resolveDays || "unspecified number of"} days` 
                    : `From the date of accident: ${getPrognosis(formData.other.otherInjuries.currentSeverity || "", formData.other.otherInjuries.resolveDays)}`}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fieldValue}>Claimant has not reported any other injuries.</Text>
          </View>
        )}
      </View>
      
      {/* 8.7 Travel Anxiety */}
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.fieldLabel, { fontSize: 12, marginBottom: 5, marginTop: 8 }]}>8.7 Travel Anxiety</Text>
        
        {formData.travelAnxiety.hasAnxiety ? (
          <View style={{ marginLeft: 10, marginBottom: 5 }}>
            {/* Grid-like layout with two columns */}
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Symptoms:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  {formData.travelAnxiety.symptoms.length > 0 
                    ? formData.travelAnxiety.symptoms.join(", ") 
                    : "Travel anxiety and nervousness while traveling in vehicles"
                  }
                </Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Initial Severity:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.travelAnxiety.initialSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Current Status:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.travelAnxiety.currentSeverity} Restrictions</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Currently Driving:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>{formData.travelAnxiety.currentlyDriving || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Mechanism of Injury:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Psychological response to the traumatic experience of the accident</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Opinion:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>On the balance of probabilities, the travel anxiety is attributable to the index accident. The symptoms are consistent with a psychological response to a traumatic road traffic incident.</Text>
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
                  {formData.travelAnxiety.hasHistory === "yes" 
                    ? `The Claimant reported having similar symptoms before the index accident: ${formData.travelAnxiety.pastHistory}`
                    : "The Claimant reported no prior similar symptoms before the index accident."}
                </Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Treatment Recommendation:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>Cognitive behavioral therapy (CBT) and gradual exposure techniques are recommended.</Text>
              </View>
            </View>
            
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <View style={{ width: '30%' }}>
                <Text style={[styles.fieldLabel, { fontSize: 10 }]}>Prognosis:</Text>
              </View>
              <View style={{ width: '70%' }}>
                <Text style={styles.fieldValue}>
                  From the date of accident: {getPrognosis(formData.travelAnxiety.currentSeverity, formData.travelAnxiety.resolveDays)}
                  {getPrognosisNotes(formData.travelAnxiety.currentSeverity, getPrognosis(formData.travelAnxiety.currentSeverity, formData.travelAnxiety.resolveDays))}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fieldValue}>Claimant has not reported any issues related to travel anxiety.</Text>
          </View>
        )}
      </View>
    </View>
  );
};
