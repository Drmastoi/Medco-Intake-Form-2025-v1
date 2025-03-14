
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

// This component is no longer used in the PDF report
interface MedicalExaminationSectionProps {
  formData: ReportData;
  styles: any;
}

export const MedicalExaminationSection = ({ formData, styles }: MedicalExaminationSectionProps) => {
  // Helper function to build examination notes
  const buildExaminationNotes = () => {
    const notes = [];

    // Check if each injury exists and add relevant examination notes
    if (formData.injuries.neckPain.hasInjury) {
      notes.push("Neck: Range of motion test performed. No significant restrictions noted.");
    }
    
    if (formData.injuries.shoulderPain.hasInjury) {
      notes.push(`Shoulder (${formData.injuries.shoulderPain.side}): Assessed for tenderness and mobility. No significant restrictions noted.`);
    }
    
    if (formData.injuries.backPain.hasInjury) {
      notes.push(`Back (${formData.injuries.backPain.location}): Palpation performed. No spinal abnormalities detected.`);
    }
    
    if (formData.injuries.headache.hasInjury) {
      notes.push("Head: No visible injuries. Neurological examination normal.");
    }

    // If no injuries found, provide a generic note
    if (notes.length === 0) {
      notes.push("General examination performed. No significant findings.");
    }

    return notes;
  };

  const examinationNotes = buildExaminationNotes();

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Medical Examination</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>Examination Methodology</Text>
        <Text style={styles.fieldValue}>
          The claimant was examined in person on {formData.prefilled.dateOfExamination}. 
          The examination lasted approximately {formData.prefilled.timeSpentWithClaimant} minutes. 
          Identity was verified via {formData.personal.idType || "Photo ID"}.
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>Physical Examination Findings</Text>
        {examinationNotes.map((note, index) => (
          <Text key={index} style={styles.fieldValue}>• {note}</Text>
        ))}
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>Clinical Observations</Text>
        <Text style={styles.fieldValue}>
          The claimant's presentation was consistent with the reported injuries and the accident mechanism.
          No evidence of symptom exaggeration or fabrication was observed during the examination.
        </Text>
      </View>
    </View>
  );
};
