
import { Text, View } from '@react-pdf/renderer';

interface InjuriesSymptomsSectionProps {
  formData: any;
  styles: any;
}

const getPrognosis = (severity: string) => {
  if (severity === "1") return "3 months post accident";
  if (severity === "2") return "6 months post accident";
  if (severity === "3") return "9 months post accident";
  if (severity === "4") return "Resolved";
  return "Unknown";
};

const getMechanismOfInjury = (injuryType: string, location?: string) => {
  if (injuryType === 'Neck' || (injuryType === 'Back' && location === "3")) {
    return "The injury is caused by acceleration-deceleration mechanism of energy transfer to the neck.";
  } else if (injuryType === 'Shoulder' || (injuryType === 'Back' && location !== "3")) {
    return "The injury is caused by a direct trauma to the vehicle interior.";
  } else if (['Headache', 'Dizziness'].includes(injuryType)) {
    return "It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018.";
  } else if (['Anxiety', 'Travel Anxiety'].includes(injuryType)) {
    return "It is classified as non-whiplash injury and falls within subsection 1.3 of the civil liability act 2018.";
  } else {
    return "The injury is caused by a direct impact during the accident.";
  }
};

const getOpinion = (injuryType: string, location?: string) => {
  if (['Neck', 'Shoulder'].includes(injuryType) || (injuryType === 'Back' && location === "3")) {
    return "In my opinion, the Claimant's symptoms are due to a Whiplash Injury. On the balance of probabilities, they are attributable to the index accident.";
  } else if (injuryType === 'Back' && location !== "3") {
    return "In my opinion, the Claimant's symptoms are due to a Soft Tissue Injury. On the balance of probabilities, they are attributable to the index accident. The injury falls within subsection 1.3 of the Civil Liability Act 2018.";
  } else if (['Headache', 'Dizziness'].includes(injuryType)) {
    return "In my opinion, the Claimant's symptoms are due to a Whiplash Associated Injury. On the balance of probabilities, they are attributable to the index accident. The injury falls within subsection 1.3 of the Civil Liability Act 2018.";
  } else if (['Anxiety', 'Travel Anxiety'].includes(injuryType)) {
    return "In my opinion, the Claimant's symptoms are due to a Psychological Impact. On the balance of probabilities, they are attributable to the index accident. The injury falls within subsection 1.3 of the Civil Liability Act 2018.";
  } else {
    return "In my opinion, the Claimant's symptoms are due to a Non-whiplash Injury. On the balance of probabilities, they are attributable to the index accident. The injury falls within subsection 1.3 of the Civil Liability Act 2018.";
  }
};

const getOICTariff = (injuryType: string, location?: string) => {
  if (injuryType === 'Neck' || (injuryType === 'Back' && location === "3")) {
    return "Yes";
  } else {
    return "No";
  }
};

const getExaminationFindings = (injuryType: string, severity: string) => {
  if (['Anxiety', 'Travel Anxiety', 'Headache', 'Dizziness'].includes(injuryType)) {
    return "Not applicable for this type of injury.";
  }
  
  let baseText = "Observation Normal\n";
  
  if (severity === "1") {
    baseText += "Mild - as per claimant's entry. ";
  } else if (severity === "2") {
    baseText += "Moderate - as per claimant's entry. ";
  } else if (severity === "3") {
    baseText += "Severe - as per claimant's entry. ";
  }
  
  baseText += "Movements Flexion, Extension Mild Restriction | Extremes mild Painful\n";
  baseText += "Left Lateral Flexion, Right Lateral Flexion | Left side | Normal\n";
  baseText += "No neurovascular deficits noted.";
  
  return baseText;
};

export const InjuriesSymptomsSection = ({ formData, styles }: InjuriesSymptomsSectionProps) => {
  let sectionCount = 0;
  
  return (
    <View>
      <Text style={styles.sectionHeader}>Section 9 - Injuries / Symptoms</Text>
      
      {/* Acknowledgment statement at the beginning */}
      <Text style={[styles.text, { marginBottom: 12, marginTop: 5, fontStyle: 'italic' }]}>
        I have acknowledged the Letter of Instruction and I confirm there were no other injuries suffered by the claimant as told to me during the examination after direct questioning
      </Text>
      
      {/* Neck Injury */}
      {formData.neckPain === "1" && (
        <>
          <Text style={styles.injuriesSectionTitle}>9.{++sectionCount} Physical</Text>
          
          <Text style={styles.injuryTypeHeader}>Neck</Text>
          <View style={styles.injuryTable}>
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Symptoms</Text>
              <Text style={styles.injuryValue}>Pain, Stiffness and Discomfort.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Onset</Text>
              <Text style={styles.injuryValue}>
                The Claimant recalls the symptoms beginning 
                {formData.neckPainStart === "1" ? " immediately after" :
                 formData.neckPainStart === "2" ? " the day after" :
                 formData.neckPainStart === "3" ? " a few days after" : 
                 formData.neckPainStart === "4" ? " within 1 days of" : " sometime after"} 
                the accident/incident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Initial Severity</Text>
              <Text style={styles.injuryValue}>
                The symptoms were 
                {formData.neckPainInitialSeverity === "1" ? " mild." :
                 formData.neckPainInitialSeverity === "2" ? " moderate." :
                 formData.neckPainInitialSeverity === "3" ? " severe. They were severe for a period of 2 days." : "."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Current Status and Severity</Text>
              <Text style={styles.injuryValue}>
                {formData.neckPainCurrentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
                 formData.neckPainCurrentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
                 formData.neckPainCurrentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
                 formData.neckPainCurrentSeverity === "4" ? `Resolved within ${formData.neckPainResolveDays || "1"} days (from the date of accident / incident)` : 
                 "Current status not specified."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Mechanism of Injury</Text>
              <Text style={styles.injuryValue}>
                {getMechanismOfInjury('Neck')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Examination Findings</Text>
              <Text style={styles.injuryValue}>
                {getExaminationFindings('Neck', formData.neckPainCurrentSeverity)}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Opinion</Text>
              <Text style={styles.injuryValue}>
                {getOpinion('Neck')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Similar symptoms</Text>
              <Text style={styles.injuryValue}>
                The Claimant reported no prior similar symptoms before the index accident,
                indicating that there were no pre-existing symptoms that could have been
                exacerbated by the accident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Additional Report</Text>
              <Text style={styles.injuryValue}>No additional reports are required.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>OIC Tariff</Text>
              <Text style={styles.injuryValue}>{getOICTariff('Neck')}</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Prognosis</Text>
              <Text style={styles.injuryValue}>
                {getPrognosis(formData.neckPainCurrentSeverity)}
                {formData.neckPainCurrentSeverity === "3" && " - The extended prognosis is due to the severity of the symptoms."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Treatment Recommendation</Text>
              <Text style={styles.injuryValue}>
                Physiotherapy - The required number of sessions to be determined by the Physiotherapist
              </Text>
            </View>
          </View>
        </>
      )}
      
      {/* Back Injury */}
      {formData.backPain === "1" && (
        <>
          <Text style={styles.injuriesSectionTitle}>9.{++sectionCount} Physical</Text>
          
          <Text style={styles.injuryTypeHeader}>
            Back ({formData.backLocation === "1" ? "Upper" : 
                  formData.backLocation === "2" ? "Middle" : 
                  formData.backLocation === "3" ? "Lower" : "All over"})
          </Text>
          
          <View style={styles.injuryTable}>
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Symptoms</Text>
              <Text style={styles.injuryValue}>Pain, Stiffness and Discomfort.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Onset</Text>
              <Text style={styles.injuryValue}>
                The Claimant recalls the symptoms beginning 
                {formData.backPainStart === "1" ? " immediately after" :
                 formData.backPainStart === "2" ? " the day after" :
                 formData.backPainStart === "3" ? " a few days after" : 
                 formData.backPainStart === "4" ? " within 1 days of" : " sometime after"} 
                the accident/incident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Initial Severity</Text>
              <Text style={styles.injuryValue}>
                The symptoms were 
                {formData.backPainInitialSeverity === "1" ? " mild." :
                 formData.backPainInitialSeverity === "2" ? " moderate." :
                 formData.backPainInitialSeverity === "3" ? " severe. They were severe for a period of 7 days." : "."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Current Status and Severity</Text>
              <Text style={styles.injuryValue}>
                {formData.backPainCurrentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
                 formData.backPainCurrentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
                 formData.backPainCurrentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
                 formData.backPainCurrentSeverity === "4" ? `Resolved within ${formData.backPainResolveDays || "1"} days (from the date of accident / incident)` : 
                 "Current status not specified."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Mechanism of Injury</Text>
              <Text style={styles.injuryValue}>
                {getMechanismOfInjury('Back', formData.backLocation)}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Examination Findings</Text>
              <Text style={styles.injuryValue}>
                {getExaminationFindings('Back', formData.backPainCurrentSeverity)}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Opinion</Text>
              <Text style={styles.injuryValue}>
                {getOpinion('Back', formData.backLocation)}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Similar symptoms</Text>
              <Text style={styles.injuryValue}>
                The Claimant reported no prior similar symptoms before the index accident,
                indicating that there were no pre-existing symptoms that could have been
                exacerbated by the accident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Additional Report</Text>
              <Text style={styles.injuryValue}>No additional reports are required.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>OIC Tariff</Text>
              <Text style={styles.injuryValue}>
                {getOICTariff('Back', formData.backLocation)}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Prognosis</Text>
              <Text style={styles.injuryValue}>
                {getPrognosis(formData.backPainCurrentSeverity)}
                {formData.backPainCurrentSeverity === "3" && " - The extended prognosis is due to the severity of the symptoms."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Treatment Recommendation</Text>
              <Text style={styles.injuryValue}>
                Physiotherapy - The required number of sessions to be determined by the Physiotherapist
              </Text>
            </View>
          </View>
        </>
      )}
      
      {/* Shoulder Injury */}
      {formData.shoulderPain === "1" && (
        <>
          <Text style={styles.injuriesSectionTitle}>9.{++sectionCount} Physical</Text>
          
          <Text style={styles.injuryTypeHeader}>
            Shoulder ({formData.shoulderSide === "1" ? "Left" : 
                      formData.shoulderSide === "2" ? "Right" : "Both"})
          </Text>
          
          <View style={styles.injuryTable}>
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Symptoms</Text>
              <Text style={styles.injuryValue}>Pain, Stiffness and Discomfort.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Onset</Text>
              <Text style={styles.injuryValue}>
                The Claimant recalls the symptoms beginning 
                {formData.shoulderPainStart === "1" ? " immediately after" :
                 formData.shoulderPainStart === "2" ? " the day after" :
                 formData.shoulderPainStart === "3" ? " a few days after" : 
                 formData.shoulderPainStart === "4" ? " within 1 days of" : " sometime after"} 
                the accident/incident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Initial Severity</Text>
              <Text style={styles.injuryValue}>
                The symptoms were 
                {formData.shoulderPainInitialSeverity === "1" ? " mild." :
                 formData.shoulderPainInitialSeverity === "2" ? " moderate." :
                 formData.shoulderPainInitialSeverity === "3" ? " severe. They were severe for a period of 3 days." : "."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Current Status and Severity</Text>
              <Text style={styles.injuryValue}>
                {formData.shoulderPainCurrentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
                 formData.shoulderPainCurrentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
                 formData.shoulderPainCurrentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
                 formData.shoulderPainCurrentSeverity === "4" ? `Resolved within ${formData.shoulderPainResolveDays || "1"} days (from the date of accident / incident)` : 
                 "Current status not specified."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Mechanism of Injury</Text>
              <Text style={styles.injuryValue}>
                {getMechanismOfInjury('Shoulder')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Examination Findings</Text>
              <Text style={styles.injuryValue}>
                {getExaminationFindings('Shoulder', formData.shoulderPainCurrentSeverity)}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Opinion</Text>
              <Text style={styles.injuryValue}>
                {getOpinion('Shoulder')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Similar symptoms</Text>
              <Text style={styles.injuryValue}>
                The Claimant reported no prior similar symptoms before the index accident,
                indicating that there were no pre-existing symptoms that could have been
                exacerbated by the accident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Additional Report</Text>
              <Text style={styles.injuryValue}>No additional reports are required.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>OIC Tariff</Text>
              <Text style={styles.injuryValue}>{getOICTariff('Shoulder')}</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Prognosis</Text>
              <Text style={styles.injuryValue}>
                {getPrognosis(formData.shoulderPainCurrentSeverity)}
                {formData.shoulderPainCurrentSeverity === "3" && " - The extended prognosis is due to the severity of the symptoms."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Treatment Recommendation</Text>
              <Text style={styles.injuryValue}>
                Physiotherapy - The required number of sessions to be determined by the Physiotherapist
              </Text>
            </View>
          </View>
        </>
      )}
      
      {/* Headache */}
      {formData.headache === "1" && (
        <>
          <Text style={styles.injuriesSectionTitle}>9.{++sectionCount} Physical</Text>
          
          <Text style={styles.injuryTypeHeader}>Headache</Text>
          
          <View style={styles.injuryTable}>
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Symptoms</Text>
              <Text style={styles.injuryValue}>Headache and Pain.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Onset</Text>
              <Text style={styles.injuryValue}>
                The Claimant recalls the symptoms beginning 
                {formData.headacheStart === "1" ? " immediately after" :
                 formData.headacheStart === "2" ? " the day after" :
                 formData.headacheStart === "3" ? " a few days after" : 
                 formData.headacheStart === "4" ? " within 1 days of" : " sometime after"} 
                the accident/incident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Initial Severity</Text>
              <Text style={styles.injuryValue}>
                The symptoms were 
                {formData.headacheInitialSeverity === "1" ? " mild." :
                 formData.headacheInitialSeverity === "2" ? " moderate." :
                 formData.headacheInitialSeverity === "3" ? " severe. They were severe for a period of 2 days." : "."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Current Status and Severity</Text>
              <Text style={styles.injuryValue}>
                {formData.headacheCurrentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
                 formData.headacheCurrentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
                 formData.headacheCurrentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
                 formData.headacheCurrentSeverity === "4" ? `Resolved within ${formData.headacheResolveDays || "1"} days (from the date of accident / incident)` : 
                 "Current status not specified."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Mechanism of Injury</Text>
              <Text style={styles.injuryValue}>
                {getMechanismOfInjury('Headache')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Examination Findings</Text>
              <Text style={styles.injuryValue}>
                Not applicable for this type of injury.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Opinion</Text>
              <Text style={styles.injuryValue}>
                {getOpinion('Headache')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Similar symptoms</Text>
              <Text style={styles.injuryValue}>
                The Claimant reported no prior similar symptoms before the index accident,
                indicating that there were no pre-existing symptoms that could have been
                exacerbated by the accident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Additional Report</Text>
              <Text style={styles.injuryValue}>No additional reports are required.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>OIC Tariff</Text>
              <Text style={styles.injuryValue}>{getOICTariff('Headache')}</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Prognosis</Text>
              <Text style={styles.injuryValue}>
                {getPrognosis(formData.headacheCurrentSeverity)}
                {formData.headacheCurrentSeverity === "3" && " - The extended prognosis is due to the severity of the symptoms."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Treatment Recommendation</Text>
              <Text style={styles.injuryValue}>
                Physiotherapy - The required number of sessions to be determined by the Physiotherapist
              </Text>
            </View>
          </View>
        </>
      )}
      
      {/* Travel Anxiety */}
      {formData.travelAnxiety === "1" && (
        <>
          <Text style={styles.injuriesSectionTitle}>9.{++sectionCount} Psychological</Text>
          
          <Text style={styles.injuryTypeHeader}>Travel Anxiety</Text>
          
          <View style={styles.injuryTable}>
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Symptoms</Text>
              <Text style={styles.injuryValue}>Anxiety, fear of travel, and panic.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Onset</Text>
              <Text style={styles.injuryValue}>
                The Claimant recalls the symptoms beginning 
                {formData.anxietyStart === "1" ? " immediately after" :
                 formData.anxietyStart === "2" ? " the day after" :
                 formData.anxietyStart === "3" ? " a few days after" : 
                 formData.anxietyStart === "4" ? " within 1 days of" : " sometime after"} 
                the accident/incident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Initial Severity</Text>
              <Text style={styles.injuryValue}>
                The symptoms were 
                {formData.anxietyInitialSeverity === "1" ? " mild." :
                 formData.anxietyInitialSeverity === "2" ? " moderate." :
                 formData.anxietyInitialSeverity === "3" ? " severe. They were severe for a period of 2 days." : "."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Current Status and Severity</Text>
              <Text style={styles.injuryValue}>
                {formData.anxietyCurrentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
                 formData.anxietyCurrentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
                 formData.anxietyCurrentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
                 formData.anxietyCurrentSeverity === "4" ? `Resolved within ${formData.anxietyResolveDays || "1"} days (from the date of accident / incident)` : 
                 "Current status not specified."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Mechanism of Injury</Text>
              <Text style={styles.injuryValue}>
                {getMechanismOfInjury('Travel Anxiety')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Examination Findings</Text>
              <Text style={styles.injuryValue}>
                Not applicable for this type of injury.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Opinion</Text>
              <Text style={styles.injuryValue}>
                {getOpinion('Travel Anxiety')}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Similar symptoms</Text>
              <Text style={styles.injuryValue}>
                The Claimant reported no prior similar symptoms before the index accident,
                indicating that there were no pre-existing symptoms that could have been
                exacerbated by the accident.
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Additional Report</Text>
              <Text style={styles.injuryValue}>No additional reports are required.</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>OIC Tariff</Text>
              <Text style={styles.injuryValue}>{getOICTariff('Travel Anxiety')}</Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Prognosis</Text>
              <Text style={styles.injuryValue}>
                {getPrognosis(formData.anxietyCurrentSeverity)}
                {formData.anxietyCurrentSeverity === "3" && " - The extended prognosis is due to the severity of the symptoms."}
              </Text>
            </View>
            
            <View style={styles.injuryRow}>
              <Text style={styles.injuryLabel}>Treatment Recommendation</Text>
              <Text style={styles.injuryValue}>
                {formData.anxietyCurrentSeverity === "4" ? "None - Resolved" : "Reassurance, Relaxation techniques"}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
