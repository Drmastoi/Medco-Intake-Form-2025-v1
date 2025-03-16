
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface ClaimantDetailsSectionProps {
  formData: ReportData;
  styles: any;
}

export const ClaimantDetailsSection = ({ formData, styles }: ClaimantDetailsSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 1 - Claimant Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.1 Name</Text>
          <Text style={styles.fieldValue}>{formData.personal?.fullName || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.2 Date of Birth</Text>
          <Text style={styles.fieldValue}>{formData.personal?.dateOfBirth || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.3 Gender</Text>
          <Text style={styles.fieldValue}>{formData.personal?.gender || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.4 Address</Text>
          <Text style={styles.fieldValue}>{formData.personal?.address || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.5 Occupation</Text>
          <Text style={styles.fieldValue}>{formData.personal?.occupation || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>1.6 Work Type</Text>
          <Text style={styles.fieldValue}>{formData.personal?.workType || 'Not provided'}</Text>
        </View>
      </View>
    </View>
  );
};
