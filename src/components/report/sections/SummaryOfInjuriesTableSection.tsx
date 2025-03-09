
import { Text, View } from '@react-pdf/renderer';

interface SummaryOfInjuriesTableSectionProps {
  formData: any;
  styles: any;
}

const getInjuryClassification = (injuryType: string, location?: string) => {
  if (['Neck', 'Shoulder'].includes(injuryType)) {
    return 'Whiplash';
  } else if (injuryType === 'Back') {
    return 'Whiplash';
  } else if (['Headache', 'Dizziness'].includes(injuryType)) {
    return 'Whiplash Associated';
  } else {
    return 'Non-whiplash Injury';
  }
};

const getTreatmentRecommendation = (severity: string) => {
  if (severity === "4") {
    return 'None - Resolved';
  } else if (severity === "3") {
    return 'Physiotherapy (8-10 sessions), Pain medication';
  } else if (severity === "2") {
    return 'Physiotherapy (4-6 sessions), Rest, Pain medication PRN';
  } else {
    return 'Rest, Over-the-counter pain medication PRN';
  }
};

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 6 - Summary of Injuries</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Injuries</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Prognosis</Text>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Treatment</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Classification</Text>
        </View>
        
        {formData.neckPain === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Neck (Pain, Stiffness, Discomfort)</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.neckPainCurrentSeverity === "4" ? `${formData.neckPainResolveDays || "Unknown"} Days` : "3 Months"}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.neckPainCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification('Neck')}
            </Text>
          </View>
        )}
        
        {formData.shoulderPain === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              Shoulder ({formData.shoulderSide === "1" ? "Left" : formData.shoulderSide === "2" ? "Right" : "Both"}) (Pain, Stiffness)
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.shoulderPainCurrentSeverity === "4" ? `${formData.shoulderPainResolveDays || "Unknown"} Days` : "3 Months"}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.shoulderPainCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification('Shoulder')}
            </Text>
          </View>
        )}
        
        {formData.backPain === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              Back ({formData.backLocation === "1" ? "Upper" : formData.backLocation === "2" ? "Middle" : formData.backLocation === "3" ? "Lower" : "Full"}) (Pain, Stiffness, Discomfort)
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.backPainCurrentSeverity === "4" ? `${formData.backPainResolveDays || "Unknown"} Days` : "4 Months"}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.backPainCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification('Back', formData.backLocation)}
            </Text>
          </View>
        )}
        
        {formData.headache === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Headaches</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.headacheCurrentSeverity === "4" ? `${formData.headacheResolveDays || "Unknown"} Days` : "2 Months"}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.headacheCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification('Headache')}
            </Text>
          </View>
        )}
        
        {formData.travelAnxiety === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Anxiety</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{formData.anxietyDuration || "60"} Days</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {formData.anxietyCurrentSeverity === "4" ? "None - Resolved" : "Reassurance, Relaxation techniques"}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification('Anxiety')}
            </Text>
          </View>
        )}
        
        {formData.dizziness === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Dizziness</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.dizzinessCurrentSeverity === "4" ? `${formData.dizzinessResolveDays || "Unknown"} Days` : "6 Weeks"}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.dizzinessCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification('Dizziness')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
