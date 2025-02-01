import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
  },
  emptyValue: {
    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 2,
  },
});

export const PersonalDetailsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{formData.fullName || '_________________'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{formData.dateOfBirth ? formatDate(formData.dateOfBirth) : '_________________'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{formData.address || '_________________'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Occupation:</Text>
        <Text style={styles.value}>{formData.occupation || '_________________'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date of Accident:</Text>
        <Text style={styles.value}>{formData.accidentDate ? formatDate(formData.accidentDate) : '_________________'}</Text>
      </View>
    </View>
  </View>
);