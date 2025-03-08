
import { Text, View } from '@react-pdf/renderer';

interface SummaryOfInjuriesTableSectionProps {
  formData: any;
  styles: any;
}

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 6 - Summary of Injuries</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Injuries</Text>
          <Text style={styles.tableHeaderCell}>Prognosis</Text>
        </View>
        
        {formData.neckPain === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Neck (Pain, Stiffness, Discomfort)</Text>
            <Text style={styles.tableCell}>
              {formData.neckPainCurrentSeverity === "4" ? `${formData.neckPainResolveDays || "Unknown"} Days` : "3 Months"}
            </Text>
          </View>
        )}
        
        {formData.shoulderPain === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              Shoulder ({formData.shoulderSide === "1" ? "Left" : formData.shoulderSide === "2" ? "Right" : "Both"}) (Pain, Stiffness)
            </Text>
            <Text style={styles.tableCell}>
              {formData.shoulderPainCurrentSeverity === "4" ? `${formData.shoulderPainResolveDays || "Unknown"} Days` : "3 Months"}
            </Text>
          </View>
        )}
        
        {formData.backPain === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              Back ({formData.backLocation === "1" ? "Upper" : formData.backLocation === "2" ? "Middle" : formData.backLocation === "3" ? "Lower" : "Full"}) (Pain, Stiffness, Discomfort)
            </Text>
            <Text style={styles.tableCell}>
              {formData.backPainCurrentSeverity === "4" ? `${formData.backPainResolveDays || "Unknown"} Days` : "4 Months"}
            </Text>
          </View>
        )}
        
        {formData.travelAnxiety === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Anxiety</Text>
            <Text style={styles.tableCell}>{formData.anxietyDuration || "60"} Days</Text>
          </View>
        )}
      </View>
    </View>
  );
};
