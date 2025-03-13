
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface BruisingSectionProps {
  formData: ReportData;
  styles: any;
}

export const BruisingSection = ({ formData, styles }: BruisingSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 11 - Bruising</Text>
      
      {formData.injuries.bruising === "Yes" ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>11.1 Location and Severity</Text>
            <Text style={styles.fieldValue}>
              The claimant reported bruising following the accident. 
              {formData.injuries.bruisingLocation && ` The bruising was located at ${formData.injuries.bruisingLocation}.`}
              {formData.injuries.bruisingInitialSeverity && ` Initial severity was ${formData.injuries.bruisingInitialSeverity.toLowerCase()}.`}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>11.2 Duration</Text>
            <Text style={styles.fieldValue}>
              {formData.injuries.bruisingDuration 
                ? `The bruising lasted approximately ${formData.injuries.bruisingDuration} days.` 
                : "The duration of the bruising was not specified."}
              {formData.injuries.bruisingNotes && ` Additional notes: ${formData.injuries.bruisingNotes}`}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>The claimant did not report any significant bruising following the accident.</Text>
      )}
    </View>
  );
};
