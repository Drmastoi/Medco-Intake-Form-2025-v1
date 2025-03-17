
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TreatmentSectionProps {
  formData: ReportData;
  styles: any;
}

export const TreatmentSection = ({ formData, styles }: TreatmentSectionProps) => {
  // Extract treatment-related data for easier access
  const treatmentData = formData.other?.treatment;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 7 - Treatment</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>7.1 Type of Treatment</Text>
        <Text style={styles.fieldValue}>
          {treatmentData?.hasTreatment 
            ? `The claimant has received the following treatment(s): ${treatmentData.type?.join(", ") || "Not specified"}.`
            : "The claimant has not received any formal treatment for the injuries."}
        </Text>

        {/* Treatment at scene of accident */}
        {treatmentData?.sceneOfAccidentTreatment === "1" && (
          <Text style={styles.fieldValue}>
            The claimant received treatment at the scene of the accident. 
            {treatmentData.sceneOfAccidentTreatmentTypes && treatmentData.sceneOfAccidentTreatmentTypes.length > 0 && 
              ` This included ${treatmentData.sceneOfAccidentTreatmentTypes.join(", ")}.`}
          </Text>
        )}

        {/* A&E attendance */}
        {treatmentData?.wentToAE === "1" && (
          <Text style={styles.fieldValue}>
            The claimant attended A&E at {treatmentData.hospitalName || "the hospital"}.
            {treatmentData.hospitalTreatment && treatmentData.hospitalTreatment.length > 0 && 
              ` Hospital treatment included ${treatmentData.hospitalTreatment.join(", ")}.`}
          </Text>
        )}

        {/* GP/Walk-in center attendance */}
        {treatmentData?.wentToWalkInGP === "1" && (
          <Text style={styles.fieldValue}>
            The claimant visited their GP/Walk-in center {treatmentData.daysBeforeGPVisit || "some"} days after the accident.
            {treatmentData.currentTreatment && ` They are currently taking ${getCurrentTreatmentText(treatmentData.currentTreatment)} for pain relief.`}
          </Text>
        )}

        {/* Physiotherapy */}
        {treatmentData?.physiotherapySessions && parseInt(treatmentData.physiotherapySessions) > 0 && (
          <Text style={styles.fieldValue}>
            The claimant has attended {treatmentData.physiotherapySessions} physiotherapy sessions to date.
          </Text>
        )}
      </View>
      
      {formData.other?.treatment?.hasTreatment && (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>7.2 Frequency</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.frequency || "The frequency of treatment was not specified."}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>7.3 Duration</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.duration || "The duration of treatment was not specified."}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>7.4 Treatment Status</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.ongoing
                ? "The claimant is continuing to receive treatment."
                : "The claimant has completed the course of treatment."}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

// Function to get readable text for current treatment
const getCurrentTreatmentText = (treatment: string | undefined) => {
  switch (treatment) {
    case "1": return "Paracetamol";
    case "2": return "Ibuprofen/Naproxen";
    case "3": return "Codeine";
    case "4": return "other prescribed medicines";
    default: return "unspecified medication";
  }
};
