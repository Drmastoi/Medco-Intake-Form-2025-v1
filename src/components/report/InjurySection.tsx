
import { Text, View } from '@react-pdf/renderer';
import { styles } from './reportStyles';
import { EntryGroup } from './EntryGroup';
import { ExaminationGroup } from './ExaminationGroup';

interface InjurySectionProps {
  title: string;
  onset: string;
  initialSeverity: string;
  currentSeverity: string;
  classification: string;
  mechanism: string;
  palpation: string;
  rangeOfMotion: string;
  neurologicalAssessment: string;
  treatment: string;
  prognosis: string;
}

export const InjurySection = ({
  title,
  onset,
  initialSeverity,
  currentSeverity,
  classification,
  mechanism,
  palpation,
  rangeOfMotion,
  neurologicalAssessment,
  treatment,
  prognosis
}: InjurySectionProps) => (
  <View style={{ ...styles.section, marginBottom: 8 }}>
    <Text style={{ ...styles.mainTitle, fontSize: 10, marginBottom: 4 }}>{title}</Text>
    
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
      <View style={{ flex: 1, minWidth: '45%' }}>
        <EntryGroup label="Onset" value={onset} />
        <EntryGroup label="Initial Severity" value={initialSeverity} />
        <EntryGroup label="Current Severity" value={currentSeverity} />
        <EntryGroup label="Classification" value={classification} />
      </View>
      
      <View style={{ flex: 1, minWidth: '45%' }}>
        <EntryGroup label="Mechanism" value={mechanism} />
        <ExaminationGroup 
          title="Examination"
          items={[
            { label: "Palpation", value: palpation },
            { label: "Range of Motion", value: rangeOfMotion },
            { label: "Neurological", value: neurologicalAssessment }
          ]}
        />
      </View>
    </View>

    <View style={{ marginTop: 4 }}>
      <Text style={{ ...styles.boldLabel, fontSize: 9 }}>Treatment and Prognosis</Text>
      <View style={{ ...styles.indentedGroup, marginLeft: 8 }}>
        <Text style={{ ...styles.normalText, fontSize: 9 }}>Pain management: {treatment}</Text>
        <Text style={{ ...styles.boldLabel, fontSize: 9, marginTop: 2 }}>Prognosis: </Text>
        <Text style={{ ...styles.normalText, fontSize: 9 }}>{prognosis}</Text>
      </View>
    </View>
  </View>
);
