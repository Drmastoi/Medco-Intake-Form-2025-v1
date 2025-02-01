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
  signature: {
    marginTop: 20,
    fontFamily: 'Helvetica',
  }
});

export const DeclarationSection = () => (
  <View style={styles.section}>
    <Text style={styles.text}>
      I fully appreciate the time pressures associated with civil litigation, the limitations of expertise, and the imperative for independent, balanced consideration when instructing solicitors. I am fully registered with the General Medical Council. My professional affiliation is with the British Medical Association. In addition, I am a member of the Medical Protection Society.
    </Text>

    <Text style={styles.heading}>4. MEDICAL EXPERT'S CURRICULUM VITAE</Text>

    <Text style={styles.heading}>5. EXPERIENCE</Text>
    <Text style={styles.text}>
      With 20 years of clinical experience in orthopaedics, medicine, surgery, emergency medicine, general practice, and occupational medicine. I completed medical-legal reports on time for over 1500 clients in the last 4 years. My experience includes whiplash injuries from road traffic accidents, injuries due to occupational hazards, fitness to work assessments, and pre-employment screening.
    </Text>

    <Text style={styles.heading}>6. PROFESSIONAL REGISTRATION DETAILS</Text>
    <Text style={styles.text}>
      Dr. Awais Iqbal{"\n"}
      Qualification: MBBS, Pgc OccuMed, PgC Cvd & Diabetes{"\n"}
      GMC: 6138189- ICO registration:ZA526555{"\n"}
      Medco Reg: DME 8094{"\n"}
      Member Society of occupational Medicine, MDDUS, BMA Member.{"\n"}
      Member independent doctor's Federation
    </Text>

    <View style={styles.signature}>
      <Text style={styles.text}>Signature: _______________________</Text>
      <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
    </View>
  </View>
);