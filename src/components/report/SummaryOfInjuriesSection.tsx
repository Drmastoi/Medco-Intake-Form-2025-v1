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

const getOnsetText = (onset: string) => {
  switch (onset) {
    case "1": return "Same day";
    case "2": return "Next Day";
    case "3": return "Few days Later";
    default: return "Not specified";
  }
};

const getSeverityText = (severity: string) => {
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
  }
};

const getPrognosis = (severity: string) => {
  switch (severity) {
    case "1": return "3 MONTHS";
    case "2": return "6 MONTHS";
    case "3": return "9 MONTHS";
    default: return "6 MONTHS";
  }
};

export const SummaryOfInjuriesSection = ({ formData }: { formData: any }) => {
  // Prepare whiplash injuries data
  const whiplashInjuries = [];
  
  if (formData.neckPain === "1") {
    whiplashInjuries.push({
      injury: "Neck Pain",
      onset: getOnsetText(formData.neckPainStart),
      initialSeverity: getSeverityText(formData.neckPainInitialSeverity),
      currentSeverity: getSeverityText(formData.neckPainCurrentSeverity),
      treatment: "Physiotherapy and pain management",
      prognosis: getPrognosis(formData.neckPainCurrentSeverity),
    });
  }

  if (formData.shoulderPain === "1") {
    whiplashInjuries.push({
      injury: "Shoulder Pain",
      onset: getOnsetText(formData.shoulderPainStart),
      initialSeverity: getSeverityText(formData.shoulderPainInitialSeverity),
      currentSeverity: getSeverityText(formData.shoulderPainCurrentSeverity),
      treatment: "Physiotherapy and pain management",
      prognosis: getPrognosis(formData.shoulderPainCurrentSeverity),
    });
  }

  if (formData.backPain === "1") {
    whiplashInjuries.push({
      injury: "Back Pain",
      onset: getOnsetText(formData.backPainStart),
      initialSeverity: getSeverityText(formData.backPainInitialSeverity),
      currentSeverity: getSeverityText(formData.backPainCurrentSeverity),
      treatment: "Physiotherapy and pain management",
      prognosis: getPrognosis(formData.backPainCurrentSeverity),
    });
  }

  // Prepare non-whiplash injuries data
  const nonWhiplashInjuries = [];
  
  if (formData.headache === "1") {
    nonWhiplashInjuries.push({
      injury: "Headache",
      onset: getOnsetText(formData.headacheStart),
      initialSeverity: getSeverityText(formData.headacheInitialSeverity),
      currentSeverity: getSeverityText(formData.headacheCurrentSeverity),
      treatment: "Pain management",
      prognosis: getPrognosis(formData.headacheCurrentSeverity),
    });
  }

  if (formData.travelAnxiety === "1") {
    nonWhiplashInjuries.push({
      injury: "Travel Anxiety",
      onset: getOnsetText(formData.anxietyStart),
      initialSeverity: getSeverityText(formData.anxietyInitialSeverity),
      currentSeverity: getSeverityText(formData.anxietyCurrentSeverity),
      treatment: "Self-management techniques",
      prognosis: getPrognosis(formData.anxietyCurrentSeverity),
    });
  }

  return (
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
        
        {whiplashInjuries.map((injury, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.indexCell}><Text>{index + 1}</Text></View>
            <View style={styles.cell}><Text>{injury.injury}</Text></View>
            <View style={styles.cell}><Text>{injury.onset}</Text></View>
            <View style={styles.cell}><Text>{injury.initialSeverity}</Text></View>
            <View style={styles.cell}><Text>{injury.currentSeverity}</Text></View>
            <View style={styles.cell}><Text>{injury.treatment}</Text></View>
            <View style={styles.cell}><Text>{injury.prognosis}</Text></View>
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
        
        {nonWhiplashInjuries.map((injury, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.indexCell}><Text>{index + 1}</Text></View>
            <View style={styles.cell}><Text>{injury.injury}</Text></View>
            <View style={styles.cell}><Text>{injury.onset}</Text></View>
            <View style={styles.cell}><Text>{injury.initialSeverity}</Text></View>
            <View style={styles.cell}><Text>{injury.currentSeverity}</Text></View>
            <View style={styles.cell}><Text>{injury.treatment}</Text></View>
            <View style={styles.cell}><Text>{injury.prognosis}</Text></View>
            <View style={styles.classificationCell}>
              <Text>{injury.injury === "Headache" ? "WAD" : "Psychological"}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};