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
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerCell: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  cell: {
    padding: 5,
    fontSize: 8,
  },
  dateCell: {
    width: '20%',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  treatmentCell: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  providerCell: {
    width: '30%',
  },
});

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.title}>Treatment Details</Text>
    
    {/* GP Visits Table */}
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.dateCell]}>Date</Text>
        <Text style={[styles.headerCell, styles.treatmentCell]}>Treatment</Text>
        <Text style={[styles.headerCell, styles.providerCell]}>Provider</Text>
      </View>
      {formData.wentToWalkInGP === "1" && (
        <View style={styles.row}>
          <Text style={[styles.cell, styles.dateCell]}>{formData.daysBeforeGPVisit ? `${formData.daysBeforeGPVisit} days after accident` : '_______'}</Text>
          <Text style={[styles.cell, styles.treatmentCell]}>{formData.currentTreatment || '_______'}</Text>
          <Text style={[styles.cell, styles.providerCell]}>GP/Walk-in Centre</Text>
        </View>
      )}
    </View>

    {/* Hospital Visits Table */}
    <View style={[styles.table, { marginTop: 10 }]}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.dateCell]}>Date</Text>
        <Text style={[styles.headerCell, styles.treatmentCell]}>Treatment</Text>
        <Text style={[styles.headerCell, styles.providerCell]}>Hospital</Text>
      </View>
      {formData.wentToAE === "1" && (
        <View style={styles.row}>
          <Text style={[styles.cell, styles.dateCell]}>Day of accident</Text>
          <Text style={[styles.cell, styles.treatmentCell]}>
            {formData.hospitalTreatment === "1" ? "None" :
             formData.hospitalTreatment === "2" ? "X-ray" :
             formData.hospitalTreatment === "3" ? "CT Scan" :
             formData.hospitalTreatment === "4" ? "Bandage" :
             formData.hospitalTreatment === "5" ? "Neck Collar" : "_______"}
          </Text>
          <Text style={[styles.cell, styles.providerCell]}>{formData.hospitalName || '_______'}</Text>
        </View>
      )}
    </View>
  </View>
);