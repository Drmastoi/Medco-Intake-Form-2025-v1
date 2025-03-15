
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TreatmentSectionProps {
  formData: ReportData;
  styles: any;
}

export const TreatmentSection = ({ formData, styles }: TreatmentSectionProps) => {
  // Extract treatment-related data for easier access
  const treatmentData = formData.other?.treatment;
  
  // Extract questionnaire-specific treatment data
  const sceneOfAccidentTreatment = formData.other?.treatment?.sceneOfAccidentTreatment === "1";
  const sceneOfAccidentTreatmentTypes = formData.other?.treatment?.sceneOfAccidentTreatmentTypes || [];
  const wentToAE = formData.other?.treatment?.wentToAE === "1";
  const hospitalName = formData.other?.treatment?.hospitalName;
  const hospitalTreatment = formData.other?.treatment?.hospitalTreatment || [];
  const wentToWalkInGP = formData.other?.treatment?.wentToWalkInGP === "1";
  const daysBeforeGPVisit = formData.other?.treatment?.daysBeforeGPVisit;
  const currentTreatment = formData.other?.treatment?.currentTreatment;
  const physiotherapySessions = formData.other?.treatment?.physiotherapySessions;

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

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 9 - Treatment</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>9.1 Type of Treatment</Text>
        <Text style={styles.fieldValue}>
          {treatmentData?.hasTreatment 
            ? `The claimant has received the following treatment(s): ${treatmentData.type?.join(", ") || "Not specified"}.`
            : "The claimant has not received any formal treatment for the injuries."}
        </Text>

        {/* Treatment at scene of accident */}
        {sceneOfAccidentTreatment && (
          <Text style={styles.fieldValue}>
            The claimant received treatment at the scene of the accident. 
            {sceneOfAccidentTreatmentTypes.length > 0 && 
              ` This included ${sceneOfAccidentTreatmentTypes.join(", ")}.`}
          </Text>
        )}

        {/* A&E attendance */}
        {wentToAE && (
          <Text style={styles.fieldValue}>
            The claimant attended A&E at {hospitalName || "the hospital"}.
            {hospitalTreatment.length > 0 && 
              ` Hospital treatment included ${hospitalTreatment.join(", ")}.`}
          </Text>
        )}

        {/* GP/Walk-in center attendance */}
        {wentToWalkInGP && (
          <Text style={styles.fieldValue}>
            The claimant visited their GP/Walk-in center {daysBeforeGPVisit || "some"} days after the accident.
            {currentTreatment && ` They are currently taking ${getCurrentTreatmentText(currentTreatment)} for pain relief.`}
          </Text>
        )}

        {/* Physiotherapy */}
        {physiotherapySessions && parseInt(physiotherapySessions) > 0 && (
          <Text style={styles.fieldValue}>
            The claimant has attended {physiotherapySessions} physiotherapy sessions to date.
          </Text>
        )}
      </View>
      
      {formData.other?.treatment?.hasTreatment && (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.2 Frequency</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.frequency || "The frequency of treatment was not specified."}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.3 Duration</Text>
            <Text style={styles.fieldValue}>
              {formData.other.treatment.duration || "The duration of treatment was not specified."}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>9.4 Treatment Status</Text>
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
