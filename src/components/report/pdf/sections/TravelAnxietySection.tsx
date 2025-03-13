
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TravelAnxietySectionProps {
  formData: ReportData;
  styles: any;
}

export const TravelAnxietySection = ({ formData, styles }: TravelAnxietySectionProps) => {
  const { travelAnxiety } = formData;
  
  if (!travelAnxiety.hasAnxiety) {
    return (
      <View style={styles.subsection}>
        <Text style={styles.sectionHeader}>Section 7 - Travel Anxiety</Text>
        <Text style={styles.fieldValue}>Claimant reported no travel anxiety following the accident.</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 7 - Travel Anxiety</Text>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Travel Anxiety Present:</Text>
          <Text style={styles.fieldValue}>Yes</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Currently Driving:</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.currentlyDriving}</Text>
        </View>
      </View>
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Initial Severity:</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.initialSeverity}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Current Severity:</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.currentSeverity}</Text>
        </View>
      </View>
      
      {travelAnxiety.currentSeverity === "Resolved" && (
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Resolved After:</Text>
            <Text style={styles.fieldValue}>{travelAnxiety.resolveDays || "Not specified"} days</Text>
          </View>
        </View>
      )}
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Duration:</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.duration || "Not specified"}</Text>
        </View>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Past History:</Text>
          <Text style={styles.fieldValue}>{travelAnxiety.hasHistory === "yes" ? "Yes" : "No"}</Text>
        </View>
      </View>
      
      {travelAnxiety.pastHistory && (
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>History Details:</Text>
            <Text style={styles.fieldValue}>{travelAnxiety.pastHistory}</Text>
          </View>
        </View>
      )}
      
      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <Text style={styles.fieldLabel}>Symptoms:</Text>
          <Text style={styles.fieldValue}>
            {travelAnxiety.symptoms.length > 0 
              ? travelAnxiety.symptoms.join(", ") 
              : "None reported"}
          </Text>
        </View>
      </View>
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        The claimant reports experiencing travel anxiety following the accident 
        with {travelAnxiety.initialSeverity.toLowerCase()} initial symptoms 
        that are currently {travelAnxiety.currentSeverity.toLowerCase()}. 
        {travelAnxiety.symptoms.length > 0 
          ? ` Symptoms include ${travelAnxiety.symptoms.join(", ")}.` 
          : " No specific symptoms were reported."} 
        {travelAnxiety.hasHistory === "yes" 
          ? " The claimant had a history of travel anxiety prior to the accident." 
          : " The claimant had no history of travel anxiety prior to the accident."}
        {travelAnxiety.currentSeverity === "Resolved" 
          ? ` The anxiety resolved after ${travelAnxiety.resolveDays || "an unspecified number of"} days.` 
          : ""}
      </Text>
    </View>
  );
};
