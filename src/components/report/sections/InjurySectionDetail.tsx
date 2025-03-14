
import { Text, View } from '@react-pdf/renderer';
import { getPrognosis, getMechanismOfInjury, getOpinion, getOICTariff, getExaminationFindings, getTreatmentRecommendation } from '../utils/injuryClassification';

interface InjurySectionDetailProps {
  title: string;
  injuryType: string;
  location?: string;
  formData: any;
  styles: any;
  sectionCount: number;
}

const InjurySectionDetail = ({ 
  title, 
  injuryType, 
  location, 
  formData, 
  styles, 
  sectionCount 
}: InjurySectionDetailProps) => {
  // Determine which data fields to use based on injury type
  const getDataPrefix = () => {
    switch(injuryType) {
      case 'Neck': return 'neck';
      case 'Back': return 'back';
      case 'Shoulder': return 'shoulder';
      case 'Headache': return 'headache';
      case 'Travel Anxiety': return 'anxiety';
      default: return 'neck';
    }
  };

  const prefix = getDataPrefix();
  const painStart = formData[`${prefix}PainStart`] || formData[`${prefix}Start`];
  const initialSeverity = formData[`${prefix}InitialSeverity`];
  const currentSeverity = formData[`${prefix}CurrentSeverity`];
  const resolveDays = formData[`${prefix}ResolveDays`];

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.injuriesSectionTitle}>6.{sectionCount} Expert Medical Assessment - {title}</Text>
      
      {/* Add General Physical Examination section before the first injury */}
      {sectionCount === 1 && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.injuryTypeHeader}>General Physical Examination:</Text>
          <Text style={styles.text}>
            In my observation, the Claimant was not tearful, not agitated, maintained good eye contact, established good rapport, 
            demonstrated clear time and place orientation, and showed no signs of psychotic features, delusional ideas, or thought disorder. 
            Communication was normal and appropriate throughout the examination.
          </Text>
        </View>
      )}
      
      <Text style={styles.injuryTypeHeader}>
        {title}
        {injuryType === 'Back' && location && (
          ` (${location === "1" ? "Upper" : 
               location === "2" ? "Middle" : 
               location === "3" ? "Lower" : "All over"})`
        )}
        {injuryType === 'Shoulder' && location && (
          ` (${location === "1" ? "Left" : 
               location === "2" ? "Right" : "Both"})`
        )}
      </Text>
      
      <View style={styles.injuryTable}>
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Symptoms</Text>
          <Text style={styles.injuryValue}>
            {injuryType === 'Travel Anxiety' 
              ? 'Anxiety, fear of travel, and panic when traveling in a vehicle.' 
              : 'Pain, Stiffness and Discomfort.'}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Onset</Text>
          <Text style={styles.injuryValue}>
            The Claimant recalls the symptoms beginning 
            {painStart === "1" ? " immediately after" :
             painStart === "2" ? " the day after" :
             painStart === "3" ? " a few days after" : 
             painStart === "4" ? " within 1 days of" : " sometime after"} 
            the accident/incident.
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Initial Severity</Text>
          <Text style={styles.injuryValue}>
            The symptoms were 
            {initialSeverity === "1" ? " mild." :
             initialSeverity === "2" ? " moderate." :
             initialSeverity === "3" ? 
              ` severe. They were severe for a period of ${injuryType === 'Back' ? '7' : injuryType === 'Shoulder' ? '3' : '2'} days.` : 
              "."}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Current Status and Severity</Text>
          <Text style={styles.injuryValue}>
            {currentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
             currentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
             currentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
             currentSeverity === "4" ? `Resolved within ${resolveDays || "1"} days (from the date of accident / incident)` : 
             "Current status not specified."}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Mechanism of Injury</Text>
          <Text style={styles.injuryValue}>
            {injuryType === 'Travel Anxiety' ? 
              "Psychological Impact. The traumatic experience of the accident has led to anxiety when traveling in vehicles." :
              getMechanismOfInjury(injuryType, location)}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Examination Findings</Text>
          <Text style={styles.injuryValue}>
            {injuryType === 'Travel Anxiety' ? 
              "Normal mood, good eye contact, no signs of acute distress during examination. The patient reports anxiety specifically when traveling in vehicles." :
              getExaminationFindings(injuryType, currentSeverity)}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Opinion</Text>
          <Text style={styles.injuryValue}>
            {injuryType === 'Travel Anxiety' ? 
              "The reported travel anxiety is directly attributed to the index accident. The symptoms are consistent with the history provided and the nature of the accident." :
              getOpinion(injuryType, location)}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Similar symptoms</Text>
          <Text style={styles.injuryValue}>
            {injuryType === 'Travel Anxiety' && formData.hasAnxietyHistory === "yes" ?
              `The Claimant reported a prior history of anxiety: ${formData.anxietyPastHistory || "details not specified"}. The current travel anxiety symptoms are distinctly related to this specific accident.` :
              "The Claimant reported no prior similar symptoms before the index accident, indicating that there were no pre-existing symptoms that could have been exacerbated by the accident."}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Additional Report</Text>
          <Text style={styles.injuryValue}>No additional reports are required.</Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>OIC Tariff</Text>
          <Text style={styles.injuryValue}>{injuryType === 'Travel Anxiety' ? 
            "This psychological symptom is not directly included in the OIC Tariff but can be considered alongside the primary injuries." :
            getOICTariff(injuryType, location)}</Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Prognosis</Text>
          <Text style={styles.injuryValue}>
            {injuryType === 'Travel Anxiety' ?
              (currentSeverity === "4" ? 
                `Resolved within ${resolveDays || "1"} days from the date of accident.` :
                currentSeverity === "1" ? 
                  "3 months from the date of accident." :
                currentSeverity === "2" ? 
                  "6 months from the date of accident." :
                currentSeverity === "3" ? 
                  "9 months from the date of accident. (The extended prognosis is due to the severity of the symptoms.)" :
                "6 months from the date of accident.") :
              getPrognosis(currentSeverity)
            }
            {currentSeverity === "3" && injuryType !== 'Travel Anxiety' && " - The extended prognosis is due to the severity of the symptoms."}
          </Text>
        </View>
        
        <View style={styles.injuryRow}>
          <Text style={styles.injuryLabel}>Treatment Recommendation</Text>
          <Text style={styles.injuryValue}>
            {injuryType === 'Travel Anxiety' ? 
              "Self-help measures including gradual exposure to travel situations, relaxation techniques, and breathing exercises. If symptoms persist or worsen, referral for brief psychological intervention may be beneficial." :
              getTreatmentRecommendation(currentSeverity, injuryType)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InjurySectionDetail;
