
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TreatmentSectionProps {
  formData: ReportData;
  styles: any;
}

export const TreatmentSection = ({ formData, styles }: TreatmentSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 9 - Treatment</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>9.1 Type of Treatment</Text>
        <Text style={styles.fieldValue}>
          {formData.other?.treatment?.hasTreatment 
            ? `The claimant has received the following treatment(s): ${formData.other.treatment.type?.join(", ") || "Not specified"}.`
            : "The claimant has not received any formal treatment for the injuries."}
        </Text>
      </View>
      
      {formData.other?.treatment?.hasTreatment && (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.2 Frequency</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.frequency || "The frequency of treatment was not specified."}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.3 Duration</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.duration || "The duration of treatment was not specified."}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.4 Treatment Status</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.ongoing
                ? "The claimant is continuing to receive treatment."
                : "The claimant has completed the course of treatment."}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};
