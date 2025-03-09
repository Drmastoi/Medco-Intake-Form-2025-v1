
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
  } else if (['Anxiety', 'Travel Anxiety', 'Panic', 'Fear of Travel'].includes(injuryType)) {
    return 'Psychological Impact';
  } else {
    return 'Non-whiplash Injury';
  }
};

const getPrognosis = (severity: string) => {
  if (severity === "1") return "3 Months";
  if (severity === "2") return "6 Months";
  if (severity === "3") return "9 Months";
  if (severity === "4") return "Resolved";
  return "Unknown";
};

const getTreatmentRecommendation = (severity: string) => {
  if (severity === "4") {
    return 'None - Resolved';
  } else {
    return 'Physiotherapy - The required number of sessions to be determined by the Physiotherapist';
  }
};

// Helper function to determine if exceptional criteria are met
const hasExceptionalCircumstances = (formData: any) => {
  // Check if any symptoms are still severe (severity level 3) or have lasted more than 8 months
  if (
    (formData.neckPain === "1" && formData.neckPainCurrentSeverity === "3") ||
    (formData.shoulderPain === "1" && formData.shoulderPainCurrentSeverity === "3") ||
    (formData.backPain === "1" && formData.backPainCurrentSeverity === "3") ||
    (formData.headache === "1" && formData.headacheCurrentSeverity === "3") ||
    (formData.travelAnxiety === "1" && formData.anxietyCurrentSeverity === "3")
  ) {
    return true;
  }
  
  // Check for duration of symptoms (assuming 240 days = ~8 months)
  // This is an approximation as we don't have direct duration data for all symptoms
  if (
    (formData.neckPainResolveDays && parseInt(formData.neckPainResolveDays) > 240) ||
    (formData.shoulderPainResolveDays && parseInt(formData.shoulderPainResolveDays) > 240) ||
    (formData.backPainResolveDays && parseInt(formData.backPainResolveDays) > 240) ||
    (formData.headacheResolveDays && parseInt(formData.headacheResolveDays) > 240) ||
    (formData.anxietyDuration && parseInt(formData.anxietyDuration) > 240)
  ) {
    return true;
  }
  
  return false;
};

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  const isExceptional = hasExceptionalCircumstances(formData);
  
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
              {formData.neckPainCurrentSeverity === "4" ? `${formData.neckPainResolveDays || "Unknown"} Days` : getPrognosis(formData.neckPainCurrentSeverity)}
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
              {formData.shoulderPainCurrentSeverity === "4" ? `${formData.shoulderPainResolveDays || "Unknown"} Days` : getPrognosis(formData.shoulderPainCurrentSeverity)}
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
              {formData.backPainCurrentSeverity === "4" ? `${formData.backPainResolveDays || "Unknown"} Days` : getPrognosis(formData.backPainCurrentSeverity)}
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
              {formData.headacheCurrentSeverity === "4" ? `${formData.headacheResolveDays || "Unknown"} Days` : getPrognosis(formData.headacheCurrentSeverity)}
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
            <Text style={[styles.tableCell, { flex: 1 }]}>{formData.anxietyCurrentSeverity === "4" ? `${formData.anxietyDuration || "60"} Days` : getPrognosis(formData.anxietyCurrentSeverity)}</Text>
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
              {formData.dizzinessCurrentSeverity === "4" ? `${formData.dizzinessResolveDays || "Unknown"} Days` : getPrognosis(formData.dizzinessCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.dizzinessCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification('Dizziness')}
            </Text>
          </View>
        )}

        {formData.hasOtherInjury === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>{formData.injuryName || "Other Injury"}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuryCurrentSeverity === "4" ? `${formData.injuryResolveDays || "Unknown"} Days` : getPrognosis(formData.injuryCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.injuryCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              Non-whiplash Injury
            </Text>
          </View>
        )}

        {formData.hasBruising === "1" && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Bruising/Scarring</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.bruisingCurrentSeverity === "4" ? `${formData.bruisingResolveDays || "Unknown"} Days` : getPrognosis(formData.bruisingCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {getTreatmentRecommendation(formData.bruisingCurrentSeverity)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              Non-whiplash Injury
            </Text>
          </View>
        )}
      </View>
      
      {/* Exceptional Injuries Section */}
      <View style={{ marginTop: 15, marginBottom: 10 }}>
        <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 8 }}>Exceptional Circumstances</Text>
        
        <View style={[styles.tableContainer, { marginTop: 5 }]}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Injuries Claimed:</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{isExceptional ? "Yes" : "No"}</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Injuries Awarded:</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{isExceptional ? "Yes" : "No"}</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Circumstances Claimed:</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{isExceptional ? "Yes" : "No"}</Text>
          </View>
          
          {isExceptional && (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Injuries / Circumstances:</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Pain and restrictions due to the accident</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
