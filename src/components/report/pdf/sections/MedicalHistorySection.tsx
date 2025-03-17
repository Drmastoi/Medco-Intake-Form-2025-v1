
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface MedicalHistorySectionProps {
  formData: ReportData;
  styles: any;
}

export const MedicalHistorySection = ({ formData, styles }: MedicalHistorySectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 10 - Past Medical History</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.1 Previous Road Traffic Accidents</Text>
        <Text style={styles.fieldValue}>
          {formData.history?.previousAccident === "1"
            ? `The claimant reports having a previous road traffic accident. ${
                formData.history.previousAccidentRecovery === "1" 
                  ? "They made a complete recovery from that accident." 
                  : "They did not make a complete recovery from that accident."
              }`
            : "The claimant denies any history of previous road traffic accidents."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.2 Pre-existing Medical Conditions</Text>
        <Text style={styles.fieldValue}>
          {formData.history?.previousConditionWorse
            ? `The claimant reports pre-existing medical conditions that have been worsened by this accident: ${formData.history.previousConditionWorse}.`
            : "The claimant denies any pre-existing medical conditions that have been worsened by this accident."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.3 Exceptional Circumstances</Text>
        <Text style={styles.fieldValue}>
          {formData.other?.medicalHistory?.exceptionalInjuries === "1"
            ? formData.other.medicalHistory.exceptionalInjuriesDetails || "Exceptional circumstances noted but no details provided."
            : "No exceptional circumstances or injuries were noted in this case."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.4 Expert Opinion</Text>
        <Text style={styles.fieldValue}>
          I was able to obtain a good history. Claimant's injuries and recovery period were entirely consistent with the account of the accident. The treatment provided for the claimant has been appropriate. The problems reported in home life are consistent and reasonable. In my opinion, the time taken off work by the claimant is reasonable. Claimant is currently fit for working.
        </Text>
      </View>
    </View>
  );
};
