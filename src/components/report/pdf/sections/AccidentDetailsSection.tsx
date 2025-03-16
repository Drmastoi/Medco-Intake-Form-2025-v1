
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface AccidentDetailsSectionProps {
  formData: ReportData;
  styles: any;
}

export const AccidentDetailsSection = ({ formData, styles }: AccidentDetailsSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 5 - Accident Details</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.1 Date</Text>
          <Text style={styles.fieldValue}>{formData.accident?.accidentDate || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.2 Time</Text>
          <Text style={styles.fieldValue}>{formData.accident?.accidentTime || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.3 Vehicle Type (Claimant)</Text>
          <Text style={styles.fieldValue}>{formData.accident?.claimantVehicle || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.4 Vehicle Type (Other)</Text>
          <Text style={styles.fieldValue}>{formData.accident?.otherVehicle || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.5 Claimant Position</Text>
          <Text style={styles.fieldValue}>{formData.accident?.claimantPosition || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.6 Impact Location</Text>
          <Text style={styles.fieldValue}>{formData.accident?.impactLocation || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.7 Vehicle Status</Text>
          <Text style={styles.fieldValue}>{formData.accident?.vehicleStatus || 'Not provided'}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>5.8 Vehicle Damage</Text>
          <Text style={styles.fieldValue}>{formData.accident?.vehicleDamage || 'Not provided'}</Text>
        </View>
      </View>
      
      <View style={{ marginTop: 10 }}>
        <Text style={styles.fieldLabel}>5.9 Accident Description</Text>
        <Text style={styles.fieldValue}>{formData.accident?.accidentSummary || 'No detailed description provided.'}</Text>
      </View>
    </View>
  );
};
