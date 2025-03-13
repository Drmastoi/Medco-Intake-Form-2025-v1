
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface MedicalHistorySectionProps {
  formData: ReportData;
  styles: any;
}

export const MedicalHistorySection = ({ formData, styles }: MedicalHistorySectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 15 - Past Medical History</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>15.1 Previous Road Traffic Accidents</Text>
        <Text style={styles.fieldValue}>
          {formData.medicalHistory.previousAccident === "Yes"
            ? `The claimant has been involved in a previous road traffic accident on ${formData.medicalHistory.previousAccidentDate || "an unspecified date"}. 
              ${formData.medicalHistory.previousAccidentRecovery === "Yes" 
                ? `Complete recovery was achieved within ${formData.medicalHistory.previousAccidentRecoveryDuration || "an unspecified"} days.` 
                : "Complete recovery was not achieved."}`
            : "The claimant reports no previous road traffic accidents."}
          {formData.medicalHistory.previousAccidentResidualSymptoms && 
            ` Residual symptoms: ${formData.medicalHistory.previousAccidentResidualSymptoms}.`}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>15.2 Pre-existing Injuries Made Worse</Text>
        <Text style={styles.fieldValue}>
          {formData.medicalHistory.previousInjuriesWorse === "Yes"
            ? `The claimant reports that the accident made pre-existing injuries worse. 
              ${formData.medicalHistory.previousInjuriesDetails || "No specific details provided."} 
              Original injury date: ${formData.medicalHistory.previousInjuriesDate || "not specified"}. 
              Treatment received: ${formData.medicalHistory.previousInjuriesTreatment || "not specified"}.`
            : "The claimant reports no pre-existing injuries that were made worse by the accident."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>15.3 Medical Conditions</Text>
        <Text style={styles.fieldValue}>
          {formData.medicalHistory.previousConditionWorse
            ? `The accident exacerbated the following pre-existing medical condition: ${formData.medicalHistory.previousConditionWorse}. 
              ${formData.medicalHistory.previousConditionDetails || "No specific details provided."} 
              Duration of condition: ${formData.medicalHistory.previousConditionDuration || "not specified"}. 
              Current treatment: ${formData.medicalHistory.previousConditionTreatment || "not specified"}.`
            : "The claimant reports no pre-existing medical conditions that were made worse by the accident."}
        </Text>
      </View>
    </View>
  );
};
