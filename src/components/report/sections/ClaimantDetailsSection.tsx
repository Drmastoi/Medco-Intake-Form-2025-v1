
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/dateUtils';

interface ClaimantDetailsSectionProps {
  formData: any;
  styles: any;
}

export const ClaimantDetailsSection = ({ formData, styles }: ClaimantDetailsSectionProps) => {
  // Calculate claimant's age based on DOB
  const getAge = (dateString: string) => {
    if (!dateString) return 'Not provided';
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age + ' Years';
  };

  // Format identification type
  const getIdType = (idType: string) => {
    switch (idType) {
      case "1": return "Driving License";
      case "2": return "Passport";
      case "3": return "ID Card";
      default: return "Not specified";
    }
  };

  return (
    <View>
      <Text style={styles.sectionHeader}>Section 1 - Claimant Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.1 Claimant's Name</Text>
          <Text style={styles.fieldValue}>{formData.fullName || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.2 Date of Birth</Text>
          <Text style={styles.fieldValue}>{formData.dateOfBirth ? formatDate(formData.dateOfBirth) : 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.3 Address</Text>
          <Text style={styles.fieldValue}>{formData.address || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.4 Gender</Text>
          <Text style={styles.fieldValue}>{formData.gender || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.5 Age (At the time of the Incident)</Text>
          <Text style={styles.fieldValue}>{getAge(formData.dateOfBirth)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.6 Date of Accident</Text>
          <Text style={styles.fieldValue}>{formData.accidentDate ? formatDate(formData.accidentDate) : 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.7 Identification</Text>
          <Text style={styles.fieldValue}>{getIdType(formData.idType)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.8 Accompanied by</Text>
          <Text style={styles.fieldValue}>The claimant attended the appointment unaccompanied.</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.9 Interpreter</Text>
          <Text style={styles.fieldValue}>Not Required</Text>
        </View>
      </View>
    </View>
  );
};
