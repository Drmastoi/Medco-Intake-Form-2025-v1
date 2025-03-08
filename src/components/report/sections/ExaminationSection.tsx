
import { Text, View } from '@react-pdf/renderer';

interface ExaminationSectionProps {
  formData: any;
  styles: any;
}

export const ExaminationSection = ({ formData, styles }: ExaminationSectionProps) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>Section 14 - Examination</Text>
      
      <View style={styles.grayBackground}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>14.1 General Physical Examination</Text>
      </View>
      
      <Text style={styles.text}>
        In my observation, the Claimant was not tearful, not agitated, good eye contact, good rapport, 
        time and place orientation, and showed signs of no psychotic features, no delusional ideas, 
        and no thought disorder. Communication was normal. Claimant was not using any walking aids.
      </Text>
      <Text style={styles.text}>Dominant Hand - {formData.dominantHand || 'Right'}</Text>
      
      {formData.neckPain === "1" && (
        <>
          <View style={styles.grayBackground}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}>14.2 Physical Examination</Text>
          </View>
          
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Neck</Text>
          <View style={styles.grayBackground}>
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Examination</Text>
                <Text style={styles.text}>
                  On examination, there was no visible bruising or swelling. There was mild tenderness 
                  on palpation of the cervical spine and paravertebral muscles. Range of movement was 
                  slightly restricted in all directions. There was no neurological deficit detected.
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
