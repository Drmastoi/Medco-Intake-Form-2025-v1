
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '@/utils/dateUtils';
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
          <Text style={styles.fieldLabel}>Date:</Text>
          <Text style={styles.fieldValue}>
            {formData.accident.accidentDate !== "Not Specified" 
              ? formatDate(formData.accident.accidentDate) 
              : "Not Specified"}
          </Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Time:</Text>
          <Text style={styles.fieldValue}>{formData.accident.accidentTime}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Vehicle Position:</Text>
          <Text style={styles.fieldValue}>{formData.accident.vehiclePosition}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Status:</Text>
          <Text style={styles.fieldValue}>{formData.accident.vehicleStatus}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Location:</Text>
          <Text style={styles.fieldValue}>{formData.accident.vehicleLocation}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Damage:</Text>
          <Text style={styles.fieldValue}>{formData.accident.vehicleDamage}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Vehicle:</Text>
          <Text style={styles.fieldValue}>{formData.accident.claimantVehicle}</Text>
        </View>
      </View>
    </View>
  );
};
