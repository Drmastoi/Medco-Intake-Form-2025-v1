import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 24,
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
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  treatmentCell: {
    width: '50%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  providerCell: {
    width: '30%',
    padding: 5,
  },
  headerText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  cellText: {
    fontSize: 8,
  },
});

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.title}>Treatment Details</Text>
    
    <View>
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
      
      {formData.wentToWalkInGP === "1" && (
        <View style={styles.tableRow}>
          <View style={styles.dateCell}>
            <Text style={styles.cellText}>{formData.daysBeforeGPVisit ? `${formData.daysBeforeGPVisit} days after accident` : '_______'}</Text>
          </View>
          <View style={styles.treatmentCell}>
            <Text style={styles.cellText}>{formData.currentTreatment || '_______'}</Text>
          </View>
          <View style={styles.providerCell}>
            <Text style={styles.cellText}>GP/Walk-in Centre</Text>
          </View>
        </View>
      )}
      
      {formData.wentToAE === "1" && (
        <View style={styles.tableRow}>
          <View style={styles.dateCell}>
            <Text style={styles.cellText}>Day of accident</Text>
          </View>
          <View style={styles.treatmentCell}>
            <Text style={styles.cellText}>
              {formData.hospitalTreatment === "1" ? "None" :
               formData.hospitalTreatment === "2" ? "X-ray" :
               formData.hospitalTreatment === "3" ? "CT Scan" :
               formData.hospitalTreatment === "4" ? "Bandage" :
               formData.hospitalTreatment === "5" ? "Neck Collar" : "_______"}
            </Text>
          </View>
          <View style={styles.providerCell}>
            <Text style={styles.cellText}>{formData.hospitalName || '_______'}</Text>
          </View>
        </View>
      )}
    </View>
  </View>
);