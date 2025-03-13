import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface MedicalExaminationSectionProps {
  formData: ReportData;
  styles: any;
}

export const MedicalExaminationSection = ({ formData, styles }: MedicalExaminationSectionProps) => {
  const { other } = formData;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 8 - Medical Examination</Text>
      
      {/* Bruising Section */}
      <Text style={[styles.fieldLabel, { marginTop: 5 }]}>Bruising and Scarring:</Text>
      {other.bruising.hasBruising ? (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Bruising Present:</Text>
              <Text style={styles.fieldValue}>Yes</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Location:</Text>
              <Text style={styles.fieldValue}>{other.bruising.location || "Not specified"}</Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{other.bruising.initialSeverity || "Not specified"}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{other.bruising.currentSeverity || "Not specified"}</Text>
            </View>
          </View>
          {other.bruising.currentSeverity === "Resolved" && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{other.bruising.resolveDays || "Not specified"} days</Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.fieldValue}>No bruising or scarring reported</Text>
      )}
      
      {/* Other Injuries Section */}
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Other Injuries:</Text>
      {other.otherInjuries.hasOtherInjury ? (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Injury Type:</Text>
              <Text style={styles.fieldValue}>{other.otherInjuries.name || "Not specified"}</Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{other.otherInjuries.initialSeverity || "Not specified"}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{other.otherInjuries.currentSeverity || "Not specified"}</Text>
            </View>
          </View>
          {other.otherInjuries.currentSeverity === "Resolved" && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{other.otherInjuries.resolveDays || "Not specified"} days</Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.fieldValue}>No other injuries reported</Text>
      )}
      
      {/* Clinical Examination Summary */}
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Clinical Examination Findings:</Text>
      <Text style={styles.fieldValue}>
        Clinical examination of the claimant was performed on {formData.prefilled.dateOfExamination} 
        at {formData.prefilled.examinationLocation}. The claimant was 
        {formData.prefilled.accompaniedBy === "Unaccompanied" ? " unaccompanied" : ` accompanied by ${formData.prefilled.accompaniedBy}`}.
      </Text>
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        Medical examination revealed 
        {other.bruising.hasBruising ? " bruising/scarring" : " no bruising or scarring"}
        {other.otherInjuries.hasOtherInjury 
          ? ` and ${other.otherInjuries.name || "other injuries"}` 
          : " and no other injuries"} 
        beyond those already reported. 
        {(other.bruising.hasBruising || other.otherInjuries.hasOtherInjury) 
          ? " All physical findings are consistent with the reported accident mechanism." 
          : ""}
      </Text>
    </View>
  );
};
