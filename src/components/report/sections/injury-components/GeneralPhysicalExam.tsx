
import { Text, View } from '@react-pdf/renderer';

interface GeneralPhysicalExamProps {
  styles: any;
}

export const GeneralPhysicalExam = ({ styles }: GeneralPhysicalExamProps) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.injuryTypeHeader}>General Physical Examination:</Text>
      <Text style={styles.text}>
        In my observation, the Claimant was not tearful, not agitated, maintained good eye contact, established good rapport, 
        demonstrated clear time and place orientation, and showed no signs of psychotic features, delusional ideas, or thought disorder. 
        Communication was normal and appropriate throughout the examination.
      </Text>
    </View>
  );
};
