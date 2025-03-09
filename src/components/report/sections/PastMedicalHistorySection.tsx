
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/dateUtils';

interface PastMedicalHistorySectionProps {
  formData: any;
  styles: any;
}

export const PastMedicalHistorySection = ({ formData, styles }: PastMedicalHistorySectionProps) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>Section 7 - Past Medical History</Text>
      
      <View style={styles.grayBackground}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>7.1 Medical and Psychological</Text>
      </View>
      
      <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Medical and Psychological</Text>
      <View style={styles.grayBackground}>
        {formData.previousConditionWorse ? (
          <>
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Date</Text>
                <Text style={styles.text}>{formData.previousConditionDate ? formatDate(formData.previousConditionDate) : 'Not provided'}</Text>
              </View>
            </View>
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Injuries / Problem</Text>
                <Text style={styles.text}>{formData.previousConditionWorse}</Text>
              </View>
            </View>
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Current Status</Text>
                <Text style={styles.text}>{formData.previousConditionCurrent || 'Ongoing'}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.text}>No relevant medical history reported</Text>
        )}
      </View>
      
      <View style={{ marginTop: 20 }}>
        <View style={styles.grayBackground}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>7.2 RTA</Text>
        </View>
        
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>RTA</Text>
        <View style={styles.grayBackground}>
          {formData.previousAccident === "1" ? (
            <>
              <View style={styles.fieldRow}>
                <View style={styles.fieldColumn}>
                  <Text style={styles.fieldLabel}>Date</Text>
                  <Text style={styles.text}>{formData.previousAccidentDate ? formatDate(formData.previousAccidentDate) : 'Not provided'}</Text>
                </View>
              </View>
              <View style={styles.fieldRow}>
                <View style={styles.fieldColumn}>
                  <Text style={styles.fieldLabel}>Injuries / Problem</Text>
                  <Text style={styles.text}>{formData.previousAccidentInjuries || 'Not specified'}</Text>
                </View>
              </View>
              <View style={styles.fieldRow}>
                <View style={styles.fieldColumn}>
                  <Text style={styles.fieldLabel}>Current Status</Text>
                  <Text style={styles.text}>{formData.previousAccidentRecovery === "1" ? 'Resolved' : 'Ongoing'}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.text}>No previous RTA reported</Text>
          )}
        </View>
      </View>
    </View>
  );
};
