
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../../reportStyles';

interface BruisingSectionProps {
  formData: any;
  styles: any;
}

export const BruisingSection = ({ formData, styles }: BruisingSectionProps) => {
  if (formData.other?.bruising?.hasBruising) {
    const bruisingNoticed = {
      "1": "Same day",
      "2": "Next day",
      "3": "Few days later"
    }[formData.other.bruising.noticed] || "Not specified";

    const initialSeverity = formData.other.bruising.initialSeverity || "Not specified";
    const currentSeverity = formData.other.bruising.currentSeverity || "Not specified";
    const location = formData.other.bruising.location || "Not specified";
    
    // Get the hasVisibleScar value from the correct location in formData
    // Check both places it might be stored
    const hasVisibleScar = (formData.other.bruising.hasVisibleScar === "1" || formData.hasVisibleScar === "1") 
      ? "Yes" 
      : "No";

    return (
      <View>
        <Text style={styles.sectionHeader}>Bruising Information</Text>
        
        <View style={styles.subsection}>
          <Text style={styles.fieldLabel}>Location:</Text>
          <Text style={styles.fieldValue}>{location}</Text>
        </View>
        
        <View style={styles.subsection}>
          <Text style={styles.fieldLabel}>When noticed:</Text>
          <Text style={styles.fieldValue}>{bruisingNoticed}</Text>
        </View>
        
        <View style={styles.subsection}>
          <Text style={styles.fieldLabel}>Initial Severity:</Text>
          <Text style={styles.fieldValue}>{initialSeverity}</Text>
        </View>
        
        <View style={styles.subsection}>
          <Text style={styles.fieldLabel}>Current Severity:</Text>
          <Text style={styles.fieldValue}>{currentSeverity}</Text>
        </View>
        
        {formData.other.bruising.currentSeverity === "Resolved" && (
          <View style={styles.subsection}>
            <Text style={styles.fieldLabel}>Resolved After:</Text>
            <Text style={styles.fieldValue}>{formData.other.bruising.resolveDays || "Not specified"} days</Text>
          </View>
        )}
        
        <View style={styles.subsection}>
          <Text style={styles.fieldLabel}>Visible Scar:</Text>
          <Text style={styles.fieldValue}>{hasVisibleScar}</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View>
      <Text style={styles.sectionHeader}>Bruising Information</Text>
      <Text style={styles.fieldValue}>Claimant has not reported any issues related to bruising or scarring.</Text>
    </View>
  );
};
