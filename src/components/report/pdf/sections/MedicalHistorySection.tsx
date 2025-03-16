
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface MedicalHistorySectionProps {
  formData: ReportData;
  styles: any;
}

export const MedicalHistorySection = ({ formData, styles }: MedicalHistorySectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 12 - Past Medical History</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>12.1 Previous Related Conditions</Text>
        <Text style={styles.fieldValue}>
          {formData.injuries.neckPain.hadPrior
            ? "The claimant reports having previous neck pain/issues prior to this accident."
            : "The claimant reports no significant pre-existing injuries or conditions that are relevant to the current injuries."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>12.2 Exceptional Circumstances</Text>
        <Text style={styles.fieldValue}>
          {formData.other?.medicalHistory?.exceptionalInjuries
            ? formData.other.medicalHistory.exceptionalInjuriesDetails || "Exceptional circumstances noted but no details provided."
            : "No exceptional circumstances or injuries were noted in this case."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>12.3 Expert Agreement on Exceptional Circumstances</Text>
        <Text style={styles.fieldValue}>
          Claimant has not claimed for any exceptional physical or psychological circumstances and injuries. I
          agree with it considering history, examination and prognosis of the current injuries.
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>12.4 General Medical History</Text>
        <Text style={styles.fieldValue}>
          The claimant's general medical history is unremarkable with respect to the current injuries. No significant pre-existing conditions that would have contributed to or exacerbated the injuries sustained in this accident were reported.
        </Text>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldValue}>
          I was able to obtain a good history. Claimant's injuries and recovery period were entirely consistent with the account of the accident. The treatment provided for the claimant has been appropriate. The problems reported in home life are consistent and reasonable. In my opinion, the time taken off work by the claimant is reasonable. Claimant is currently fit for working.
        </Text>
      </View>
    </View>
  );
};
