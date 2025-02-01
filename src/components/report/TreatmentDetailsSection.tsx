import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    width: '100%',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 24,
    padding: 5,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  dateCell: {
    width: '20%',
    padding: 5,
  },
  treatmentCell: {
    width: '50%',
    padding: 5,
  },
  providerCell: {
    width: '30%',
    padding: 5,
  },
  text: {
    fontSize: 10,
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.title}>Treatment Details</Text>
    
    {/* Scene of Accident Treatment */}
    {formData.sceneOfAccidentTreatment === "1" && (
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <View style={styles.dateCell}>
            <Text style={styles.headerText}>Date</Text>
          </View>
          <View style={styles.treatmentCell}>
            <Text style={styles.headerText}>Treatment</Text>
          </View>
          <View style={styles.providerCell}>
            <Text style={styles.headerText}>Provider</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.dateCell}>
            <Text style={styles.text}>{formatDate(formData.accidentDate)}</Text>
          </View>
          <View style={styles.treatmentCell}>
            <Text style={styles.text}>{formData.sceneOfAccidentTreatmentDetails || "_______"}</Text>
          </View>
          <View style={styles.providerCell}>
            <Text style={styles.text}>Paramedics/First Responders</Text>
          </View>
        </View>
      </View>
    )}

    {/* A&E Treatment */}
    {formData.wentToAE === "1" && (
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.dateCell}>
            <Text style={styles.text}>{formatDate(formData.accidentDate)}</Text>
          </View>
          <View style={styles.treatmentCell}>
            <Text style={styles.text}>
              {formData.hospitalTreatment === "1" ? "None" :
               formData.hospitalTreatment === "2" ? "X-ray" :
               formData.hospitalTreatment === "3" ? "CT Scan" :
               formData.hospitalTreatment === "4" ? "Bandage" :
               formData.hospitalTreatment === "5" ? "Neck Collar" : "_______"}
            </Text>
          </View>
          <View style={styles.providerCell}>
            <Text style={styles.text}>{formData.hospitalName || "_______"}</Text>
          </View>
        </View>
      </View>
    )}

    {/* GP/Walk-in Treatment */}
    {formData.wentToWalkInGP === "1" && (
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.dateCell}>
            <Text style={styles.text}>
              {formData.daysBeforeGPVisit ? 
                `${formData.daysBeforeGPVisit} days after accident` : 
                "_______"}
            </Text>
          </View>
          <View style={styles.treatmentCell}>
            <Text style={styles.text}>
              {formData.currentTreatment === "1" ? "Paracetamol" :
               formData.currentTreatment === "2" ? "Ibuprofen, Naproxen" :
               formData.currentTreatment === "3" ? "Codeine" :
               formData.currentTreatment === "4" ? "Other prescribed medicines" : "_______"}
            </Text>
          </View>
          <View style={styles.providerCell}>
            <Text style={styles.text}>GP/Walk-in Centre</Text>
          </View>
        </View>
      </View>
    )}

    {/* Physiotherapy */}
    {formData.physiotherapySessions && parseInt(formData.physiotherapySessions) > 0 && (
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.dateCell}>
            <Text style={styles.text}>Ongoing</Text>
          </View>
          <View style={styles.treatmentCell}>
            <Text style={styles.text}>
              {`${formData.physiotherapySessions} sessions completed`}
            </Text>
          </View>
          <View style={styles.providerCell}>
            <Text style={styles.text}>Physiotherapist</Text>
          </View>
        </View>
      </View>
    )}
  </View>
);