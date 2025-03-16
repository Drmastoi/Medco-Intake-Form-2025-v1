import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
  },
});

export const PersonalInfoSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Personal Information</Text>
    <Text style={styles.text}>Full Name: {formData.fullName}</Text>
    <Text style={styles.text}>Date of Birth: {formatDate(formData.dateOfBirth)}</Text>
    <Text style={styles.text}>ID Type: {
      formData.idType === "1" ? "Driving License" :
      formData.idType === "2" ? "Passport" :
      formData.idType === "3" ? "ID Card" : "Claimant has not specified ID type"
    }</Text>
    <Text style={styles.text}>Email: {formData.email || 'Claimant has not provided email'}</Text>
    <Text style={styles.text}>Address: {formData.address || 'Claimant has not provided address'}</Text>
    <Text style={styles.text}>Occupation: {formData.occupation || 'Claimant has not provided occupation'}</Text>
    <Text style={styles.text}>Work Type: {
      formData.workType === "1" ? "Full Time" :
      formData.workType === "2" ? "Part Time" : "Claimant has not specified work type"
    }</Text>
    <Text style={styles.text}>Living With: {
      formData.livingWith === "1" ? "Wife" :
      formData.livingWith === "2" ? "Husband" :
      formData.livingWith === "3" ? "Partner" :
      formData.livingWith === "4" ? "Parents" :
      formData.livingWith === "5" ? "Alone" : "Claimant has not specified living arrangement"
    }</Text>
    <Text style={styles.text}>Number of Children at Home: {formData.childrenCount || 'Claimant has not specified number of children'}</Text>
  </View>
);
