
import { Text, View } from '@react-pdf/renderer';

interface MedicalRecordsReviewSectionProps {
  styles: any;
}

export const MedicalRecordsReviewSection = ({ styles }: MedicalRecordsReviewSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 9 - Medical Records Review</Text>
      
      <View style={styles.fieldRow}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>9.1 Review Status</Text>
          <Text style={styles.fieldValue}>
            A medical records review has not been undertaken in this case. I do not consider that a medical records
            review is required as it should not influence my opinion and prognosis given in this assessment.
          </Text>
        </View>
      </View>
      
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fieldLabel}>9.2 Re-examination Recommendation</Text>
        <Text style={styles.fieldValue}>
          If the claimant does not recover within the anticipated recovery timescale then I would recommend a
          re-examination by orthopedic doctor.
        </Text>
      </View>
      
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fieldLabel}>9.3 Employment Prospects</Text>
        <Text style={styles.fieldValue}>
          Employment prospects in the open job market would be unaffected because of the injuries.
        </Text>
      </View>
    </View>
  );
};
