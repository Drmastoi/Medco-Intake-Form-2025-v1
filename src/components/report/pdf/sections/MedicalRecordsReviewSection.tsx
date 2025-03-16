
import { Text, View } from '@react-pdf/renderer';

interface MedicalRecordsReviewSectionProps {
  styles: any;
}

export const MedicalRecordsReviewSection = ({ styles }: MedicalRecordsReviewSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Medical Records Review</Text>
      
      <View style={styles.fieldRow}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldValue}>
            A medical records review has not been undertaken in this case. I do not consider that a medical records
            review is required as it should not influence my opinion and prognosis given in this assessment.
          </Text>
        </View>
      </View>
      
      <View style={{ marginTop: 15 }}>
        <Text style={styles.sectionHeader}>PROSPECTS ON THE OPEN JOB MARKET</Text>
        <Text style={styles.fieldValue}>
          Employment prospects in the open job market would be unaffected because of the injuries.
        </Text>
      </View>
    </View>
  );
};
