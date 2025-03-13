
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TreatmentSectionProps {
  formData: ReportData;
  styles: any;
}

export const TreatmentSection = ({ formData, styles }: TreatmentSectionProps) => {
  const { other } = formData;
  const { treatment } = other;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 9 - Treatment</Text>
      
      {treatment.hasTreatment ? (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Treatment Received:</Text>
              <Text style={styles.fieldValue}>Yes</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Type:</Text>
              <Text style={styles.fieldValue}>
                {treatment.type && treatment.type.length > 0 
                  ? treatment.type.join(", ") 
                  : "Not specified"}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Frequency:</Text>
              <Text style={styles.fieldValue}>{treatment.frequency || "Not specified"}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration:</Text>
              <Text style={styles.fieldValue}>{treatment.duration || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Treatment Ongoing:</Text>
              <Text style={styles.fieldValue}>{treatment.ongoing ? "Yes" : "No"}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No treatment has been received for injuries related to this accident.</Text>
      )}
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        {treatment.hasTreatment 
          ? `The claimant has received treatment consisting of ${
              treatment.type && treatment.type.length > 0 
                ? treatment.type.join(", ") 
                : "unspecified treatments"
            }${treatment.frequency ? ` at a frequency of ${treatment.frequency}` : ""}${
              treatment.duration ? ` for a duration of ${treatment.duration}` : ""
            }. Treatment is ${treatment.ongoing ? "ongoing" : "no longer ongoing"}.`
          : "The claimant has not received any treatment for injuries sustained in this accident."
        }
      </Text>
    </View>
  );
};
