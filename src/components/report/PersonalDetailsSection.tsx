import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
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
});

export const PersonalDetailsSection = ({ formData }: { formData: any }) => {
  const getIdType = (idType: string) => {
    switch(idType) {
      case "1": return "Driving License";
      case "2": return "Passport";
      case "3": return "ID Card";
      default: return "_________________";
    }
  };

  const today = new Date();
  const examinationDate = today.toISOString().split('T')[0];
  const reportDate = today.toISOString().split('T')[0];

  return (
    <View style={styles.section}>
      <View>
        <View style={styles.row}>
          <Text style={styles.label}>Claimant's Full Name:</Text>
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
          <Text style={styles.label}>ID Checked:</Text>
          <Text style={styles.value}>{getIdType(formData.idType)}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Occupation:</Text>
          <Text style={styles.value}>{formData.occupation || '_________________'}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Accompanied By:</Text>
          <Text style={styles.value}>_________________</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Date of Accident:</Text>
          <Text style={styles.value}>{formData.accidentDate ? formatDate(formData.accidentDate) : '_________________'}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Name of Referring Party:</Text>
          <Text style={styles.value}>_________________</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Reference Number:</Text>
          <Text style={styles.value}>_________________</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Name of Solicitor:</Text>
          <Text style={styles.value}>_________________</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Solicitor Reference:</Text>
          <Text style={styles.value}>_________________</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Time Spent With Claimant:</Text>
          <Text style={styles.value}>15 minutes</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Medco Ref:</Text>
          <Text style={styles.value}>_________________</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Examination Location:</Text>
          <Text style={styles.value}>_________________</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Date of Examination:</Text>
          <Text style={styles.value}>{formatDate(examinationDate)}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Date of Report:</Text>
          <Text style={styles.value}>{formatDate(reportDate)}</Text>
        </View>
      </View>
    </View>
  );
};