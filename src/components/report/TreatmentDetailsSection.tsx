
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: '45%',
  }
});

const formatList = (items: string[] = [], otherText?: string) => {
  if (!items.length) return 'None';
  const mainItems = items.filter(item => item !== 'other');
  const formattedList = mainItems.join(', ');
  return otherText ? `${formattedList}${mainItems.length ? ', and ' : ''}${otherText}` : formattedList;
};

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>9.1 TREATMENT DETAILS</Text>
    
    <View style={styles.grid}>
      <View style={styles.column}>
        {/* Scene of Accident Treatment */}
        <Text style={styles.text}>
          {formData.sceneOfAccidentTreatment === "1" ? 
            `The claimant received treatment at the scene of the accident. Treatment included: ${
              formData.sceneOfAccidentTreatmentTypes ? formatList(formData.sceneOfAccidentTreatmentTypes) : "first aid"
            }.` :
            "The claimant did not receive any treatment at the scene of the accident."}
        </Text>
        
        {/* Hospital Attendance */}
        <Text style={styles.text}>
          {formData.wentToAE === "1" ? 
            `The claimant attended ${formData.hospitalName || "hospital A&E"} following the accident. Treatment received: ${
              formData.hospitalTreatment ? formatList(formData.hospitalTreatment) : "examination and advice"
            }.` :
            "The claimant did not attend hospital A&E after the accident."}
        </Text>
        
        {/* GP Attendance */}
        <Text style={styles.text}>
          {formData.wentToWalkInGP === "1" ? 
            `The claimant visited their GP/Walk-in center ${formData.daysBeforeGPVisit ? `${formData.daysBeforeGPVisit} days` : "some time"} after the accident.` :
            "The claimant did not visit their GP or a Walk-in center after the accident."}
        </Text>
      </View>
      
      <View style={styles.column}>
        {/* Current Treatment - Pain Management */}
        <Text style={styles.text}>
          {formData.currentTreatment ? 
            `Current pain management includes: ${
              formData.currentTreatment === "1" ? "Paracetamol" :
              formData.currentTreatment === "2" ? "Ibuprofen, Naproxen" :
              formData.currentTreatment === "3" ? "Codeine" :
              formData.currentTreatment === "4" ? "Other prescribed medicines" : "Over-the-counter medication"
            }.` :
            "No current pain medication reported."}
        </Text>
        
        {/* Physiotherapy */}
        <Text style={styles.text}>
          {formData.physiotherapySessions ? 
            `The claimant has attended ${formData.physiotherapySessions} physiotherapy sessions.` :
            "The claimant has not received physiotherapy treatment."}
        </Text>
        
        {/* Bruising if present */}
        {formData.bruising === "1" && (
          <Text style={styles.text}>
            The claimant experienced bruising following the accident.
            {formData.bruisingLocation ? ` Location: ${formData.bruisingLocation}.` : ''}
            {formData.bruisingDuration ? ` Duration: ${formData.bruisingDuration} days.` : ''}
            {formData.bruisingNotes ? ` Notes: ${formData.bruisingNotes}` : ''}
          </Text>
        )}
      </View>
    </View>
  </View>
);
