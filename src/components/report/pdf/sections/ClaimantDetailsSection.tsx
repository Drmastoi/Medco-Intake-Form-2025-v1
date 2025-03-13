
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '@/utils/dateUtils';
import { ReportData } from '@/types/reportTypes';

interface ClaimantDetailsSectionProps {
  formData: ReportData;
  styles: any;
}

export const ClaimantDetailsSection = ({ formData, styles }: ClaimantDetailsSectionProps) => {
  // Calculate claimant's age based on DOB
  const getAge = (dateString: string) => {
    if (!dateString || dateString === 'Not Specified') return 'Not Specified';
    try {
      const birthDate = new Date(dateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age + ' Years';
    } catch (e) {
      return 'Not Specified';
    }
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
          <Text style={styles.fieldLabel}>Name:</Text>
          <Text style={styles.fieldValue}>{formData.personal.fullName}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Date of Birth:</Text>
          <Text style={styles.fieldValue}>
            {formData.personal.dateOfBirth !== "Not Specified" 
              ? formatDate(formData.personal.dateOfBirth) 
              : "Not Specified"}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Address:</Text>
          <Text style={styles.fieldValue}>{formData.personal.address}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Gender:</Text>
          <Text style={styles.fieldValue}>{formData.personal.gender}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Age (At Incident):</Text>
          <Text style={styles.fieldValue}>{getAge(formData.personal.dateOfBirth)}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Date of Accident:</Text>
          <Text style={styles.fieldValue}>
            {formData.accident.accidentDate !== "Not Specified" 
              ? formatDate(formData.accident.accidentDate) 
              : "Not Specified"}
          </Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Identification:</Text>
          <Text style={styles.fieldValue}>{getIdType(formData.personal.idType || "")}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Accompanied by:</Text>
          <Text style={styles.fieldValue}>{formData.prefilled.accompaniedBy || "Unaccompanied"}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Interpreter:</Text>
          <Text style={styles.fieldValue}>Not Required</Text>
        </View>
      </View>
    </View>
  );
};
