
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
});

export const MedicalRecordsSection = () => (
  <View style={styles.section}>
    <Text style={styles.heading}>9. MEDICAL RECORDS REVIEW</Text>
    <Text style={styles.text}>
      A medical records review has not been undertaken in this case. I do not consider that a medical records
      Review is required as it should not influence my opinion and prognosis given in this assessment.
    </Text>
    
    <Text style={styles.heading}>9.2 RE-EXAMINATION</Text>
    <Text style={styles.text}>
      If the claimant does not recover within the anticipated recovery timescale, then I would recommend a re-examination by GP.
    </Text>
  </View>
);
