
import { Text, View } from '@react-pdf/renderer';

interface InjuriesSymptomsSectionProps {
  formData: any;
  styles: any;
}

export const InjuriesSymptomsSection = ({ formData, styles }: InjuriesSymptomsSectionProps) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>Section 9 - Injuries / Symptoms</Text>
      
      {/* Neck */}
      {formData.neckPain === "1" && (
        <>
          <View style={styles.grayBackground}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>9.1 Physical</Text>
          </View>
          
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Neck</Text>
          <View style={styles.grayBackground}>
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Symptoms</Text>
                <Text style={styles.text}>Pain, Stiffness and Discomfort.</Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Onset</Text>
                <Text style={styles.text}>
                  The Claimant recalls the symptoms beginning 
                  {formData.neckPainStart === "1" ? " immediately after" :
                   formData.neckPainStart === "2" ? " the day after" :
                   formData.neckPainStart === "3" ? " a few days after" : " sometime after"} 
                  the accident/incident.
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Initial Severity</Text>
                <Text style={styles.text}>
                  The symptoms were 
                  {formData.neckPainInitialSeverity === "1" ? " mild" :
                   formData.neckPainInitialSeverity === "2" ? " moderate" :
                   formData.neckPainInitialSeverity === "3" ? " severe" : ""}.
                  {formData.neckPainInitialSeverity === "3" ? " They were severe for a period of 2 days." : ""}
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Current Status and Severity</Text>
                <Text style={styles.text}>
                  {formData.neckPainCurrentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
                   formData.neckPainCurrentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
                   formData.neckPainCurrentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
                   formData.neckPainCurrentSeverity === "4" ? `Resolved within ${formData.neckPainResolveDays || "unknown"} days (from the date of accident / incident)` : 
                   "Current status not specified."}
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Similar symptoms</Text>
                <Text style={styles.text}>
                  The Claimant reported no prior similar symptoms before the index accident, 
                  indicating that there were no pre-existing symptoms that could have been 
                  exacerbated by the accident.
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Opinion</Text>
                <Text style={styles.text}>
                  In my opinion, the Claimant's symptoms are due to a Whiplash Injury. On the 
                  balance of probabilities, they are attributable to the index accident.
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Mechanism of Injury</Text>
                <Text style={styles.text}>
                  The injury is caused by acceleration-deceleration mechanism of energy transfer to the neck.
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Additional Report</Text>
                <Text style={styles.text}>No additional reports are required.</Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>OIC Tariff</Text>
                <Text style={styles.text}>Yes</Text>
              </View>
            </View>
            
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Exacerbation and Apportioning</Text>
                <Text style={styles.text}>
                  In my opinion, On the balance of probabilities, the symptoms are not 
                  exacerbated by the index accident.
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
      
      {/* Only show more sections if we have room, otherwise continue on next page */}
      {formData.backPain === "1" && (
        <>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 15, marginBottom: 5 }}>9.2 Physical</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5, marginBottom: 5 }}>Back ({formData.backLocation === "1" ? "Upper" : formData.backLocation === "2" ? "Middle" : formData.backLocation === "3" ? "Lower" : "All over"})</Text>
        </>
      )}
    </View>
  );
};
