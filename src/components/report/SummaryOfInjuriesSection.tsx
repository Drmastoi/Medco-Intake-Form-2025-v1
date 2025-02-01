import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  tableTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  subTitle: {
    fontSize: 10,
    color: '#0066cc',
    marginBottom: 8,
    fontFamily: 'Helvetica',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
    minHeight: 25,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
    fontFamily: 'Helvetica-Bold',
  },
  indexCell: {
    width: '5%',
    padding: 4,
    fontSize: 9,
    borderRight: 1,
    borderColor: '#000',
    fontFamily: 'Helvetica',
  },
  cell: {
    flex: 1,
    padding: 4,
    fontSize: 9,
    borderRight: 1,
    borderColor: '#000',
    fontFamily: 'Helvetica',
  },
  classificationCell: {
    width: '15%',
    padding: 4,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
});

export const SummaryOfInjuriesSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <View style={styles.table}>
      <Text style={styles.tableTitle}>SUMMARY OF INJURIES:</Text>
      
      {/* Whiplash Injuries Table */}
      <Text style={styles.subTitle}>Whiplash Injuries:</Text>
      <View style={styles.tableHeader}>
        <View style={styles.indexCell}><Text>#</Text></View>
        <View style={styles.cell}><Text>INJURY</Text></View>
        <View style={styles.cell}><Text>ONSET</Text></View>
        <View style={styles.cell}><Text>INITIAL SEVERITY</Text></View>
        <View style={styles.cell}><Text>CURRENT SEVERITY</Text></View>
        <View style={styles.cell}><Text>TREATMENT RECOMMENDATIONS</Text></View>
        <View style={styles.cell}><Text>PROGNOSIS</Text></View>
        <View style={styles.classificationCell}><Text>CLASSIFICATION</Text></View>
      </View>
      
      {[1, 2, 3].map((index) => (
        <View key={index} style={styles.tableRow}>
          <View style={styles.indexCell}><Text>{index}</Text></View>
          <View style={styles.cell}><Text>{formData[`whiplashInjury${index}`] || '_______'}</Text></View>
          <View style={styles.cell}><Text>{formData[`whiplashOnset${index}`] || '_______'}</Text></View>
          <View style={styles.cell}><Text>{formData[`whiplashInitialSeverity${index}`] || '_______'}</Text></View>
          <View style={styles.cell}><Text>{formData[`whiplashCurrentSeverity${index}`] || '_______'}</Text></View>
          <View style={styles.cell}><Text>{formData[`whiplashTreatment${index}`] || '_______'}</Text></View>
          <View style={styles.cell}><Text>{formData[`whiplashPrognosis${index}`] || '_______'}</Text></View>
          <View style={styles.classificationCell}><Text>Whiplash</Text></View>
        </View>
      ))}

      {/* Non-Whiplash Injuries Table */}
      <Text style={[styles.subTitle, { marginTop: 15 }]}>Non-Whiplash Injuries:</Text>
      <View style={styles.tableHeader}>
        <View style={styles.indexCell}><Text>#</Text></View>
        <View style={styles.cell}><Text>INJURY</Text></View>
        <View style={styles.cell}><Text>ONSET</Text></View>
        <View style={styles.cell}><Text>INITIAL SEVERITY</Text></View>
        <View style={styles.cell}><Text>CURRENT SEVERITY</Text></View>
        <View style={styles.cell}><Text>TREATMENT RECOMMENDATIONS</Text></View>
        <View style={styles.cell}><Text>PROGNOSIS</Text></View>
        <View style={styles.classificationCell}><Text>CLASSIFICATION</Text></View>
      </View>
      
      <View style={styles.tableRow}>
        <View style={styles.indexCell}><Text>1</Text></View>
        <View style={styles.cell}><Text>{formData.nonWhiplashInjury || '_______'}</Text></View>
        <View style={styles.cell}><Text>{formData.nonWhiplashOnset || '_______'}</Text></View>
        <View style={styles.cell}><Text>{formData.nonWhiplashInitialSeverity || '_______'}</Text></View>
        <View style={styles.cell}><Text>{formData.nonWhiplashCurrentSeverity || '_______'}</Text></View>
        <View style={styles.cell}><Text>{formData.nonWhiplashTreatment || '_______'}</Text></View>
        <View style={styles.cell}><Text>{formData.nonWhiplashPrognosis || '_______'}</Text></View>
        <View style={styles.classificationCell}><Text>Non Whiplash</Text></View>
      </View>
    </View>
  </View>
);