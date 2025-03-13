
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface MedicalHistorySectionProps {
  formData: ReportData;
  styles: any;
}

export const MedicalHistorySection = ({ formData, styles }: MedicalHistorySectionProps) => {
  const { other } = formData;
  const { medicalHistory } = other;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 11 - Medical History</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Exceptional Circumstances:</Text>
          <Text style={styles.fieldValue}>{medicalHistory.exceptionalInjuries ? "Yes" : "No"}</Text>
        </View>
      </View>
      
      {medicalHistory.exceptionalInjuries && (
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Details:</Text>
            <Text style={styles.fieldValue}>{medicalHistory.exceptionalInjuriesDetails || "Not specified"}</Text>
          </View>
        </View>
      )}
      
      {/* Additional Medical History Information */}
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Prior Neck Pain:</Text>
          <Text style={styles.fieldValue}>
            {formData.injuries.neckPain.hadPrior ? "Yes" : "No"}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Prior Headaches:</Text>
          <Text style={styles.fieldValue}>
            {formData.injuries.headache.pastHistory ? "Yes" : "No"}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Prior Travel Anxiety:</Text>
          <Text style={styles.fieldValue}>
            {formData.travelAnxiety.hasHistory === "yes" ? "Yes" : "No"}
          </Text>
        </View>
      </View>
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        The claimant 
        {medicalHistory.exceptionalInjuries 
          ? `reports exceptional circumstances: ${medicalHistory.exceptionalInjuriesDetails || "Not specified"}.` 
          : "reports no exceptional circumstances in their medical history."} 
        Prior relevant medical history includes 
        {formData.injuries.neckPain.hadPrior ? " history of neck pain" : ""}
        {formData.injuries.headache.pastHistory 
          ? (formData.injuries.neckPain.hadPrior ? ", " : "") + "history of headaches" 
          : ""}
        {formData.travelAnxiety.hasHistory === "yes" 
          ? (formData.injuries.neckPain.hadPrior || formData.injuries.headache.pastHistory ? ", and " : "") + 
            "history of travel anxiety" 
          : ""}
        {!formData.injuries.neckPain.hadPrior && !formData.injuries.headache.pastHistory && 
         formData.travelAnxiety.hasHistory !== "yes"
          ? "no significant prior conditions relevant to the current injuries" 
          : ""}.
      </Text>
    </View>
  );
};
