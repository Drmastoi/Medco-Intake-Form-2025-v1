
import { Text, View } from '@react-pdf/renderer';
import { styles } from './reportStyles';

interface Injury {
  injury: string;
  onset: string;
  initialSeverity: string;
  currentSeverity: string;
  treatment: string;
  prognosis: string;
}

interface InjuriesTableProps {
  title: string;
  injuries: Injury[];
  classification: (injury: Injury) => string;
}

export const InjuriesTable = ({ title, injuries, classification }: InjuriesTableProps) => (
  <>
    <Text style={styles.subTitle}>{title}</Text>
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
    
    {injuries.map((injury, index) => (
      <View key={index} style={styles.tableRow}>
        <View style={styles.indexCell}><Text>{index + 1}</Text></View>
        <View style={styles.cell}><Text>{injury.injury}</Text></View>
        <View style={styles.cell}><Text>{injury.onset}</Text></View>
        <View style={styles.cell}><Text>{injury.initialSeverity}</Text></View>
        <View style={styles.cell}><Text>{injury.currentSeverity}</Text></View>
        <View style={styles.cell}><Text>{injury.treatment}</Text></View>
        <View style={styles.cell}><Text>{injury.prognosis}</Text></View>
        <View style={styles.classificationCell}>
          <Text>{classification(injury)}</Text>
        </View>
      </View>
    ))}
  </>
);
