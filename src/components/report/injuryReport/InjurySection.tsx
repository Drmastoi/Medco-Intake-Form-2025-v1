
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../reportStyles';
import { EntryGroup } from './EntryGroup';
import { ExaminationGroup } from './ExaminationGroup';

interface InjurySectionProps {
  title: string;
  injuryNumber: number;
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
  injuryNumber,
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
  <View style={styles.section}>
    <Text style={styles.mainTitle}>{injuryNumber}. {title}</Text>
    
    <EntryGroup label="Onset" value={onset} />
    <EntryGroup label="Initial Severity" value={initialSeverity} />
    <EntryGroup label="Current Severity" value={currentSeverity} />
    <EntryGroup label="Classification" value={classification} />
    <EntryGroup label="Causation/Mechanism" value={mechanism} />

    <View style={styles.sectionGap}>
      <ExaminationGroup 
        title="Examination"
        items={[
          { label: "Palpation", value: palpation },
          { label: "Range of Motion", value: rangeOfMotion },
          { label: "Neurological Assessment", value: neurologicalAssessment }
        ]}
      />
    </View>

    <View style={styles.sectionGap}>
      <Text style={styles.boldLabel}>Treatment and Prognosis</Text>
      <View style={styles.indentedGroup}>
        <Text style={styles.boldLabel}>Treatment</Text>
        <Text style={styles.normalText}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
        <Text style={styles.boldLabel}>Physiotherapy Recommended</Text>
        <Text style={styles.normalText}>Number of sessions to be decided by the referred expert</Text>
        <Text style={styles.boldLabel}>Prognosis</Text>
        <Text style={styles.normalText}>{prognosis}</Text>
      </View>
    </View>
  </View>
);
