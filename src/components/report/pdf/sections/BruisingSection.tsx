
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface BruisingSectionProps {
  formData: ReportData;
  styles: any;
}

export const BruisingSection = ({ formData, styles }: BruisingSectionProps) => {
  const { other } = formData;
  const { bruising } = other;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 8 - Bruising and Scarring</Text>
      
      {bruising.hasBruising ? (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Bruising Present:</Text>
              <Text style={styles.fieldValue}>Yes</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Location:</Text>
              <Text style={styles.fieldValue}>{bruising.location || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>When Noticed:</Text>
              <Text style={styles.fieldValue}>
                {bruising.noticed === "1" ? "Same day" : 
                 bruising.noticed === "2" ? "Next day" : 
                 bruising.noticed === "3" ? "Few days later" : 
                 "Not specified"}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{bruising.initialSeverity || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{bruising.currentSeverity || "Not specified"}</Text>
            </View>
            {bruising.currentSeverity === "Resolved" && (
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{bruising.resolveDays || "Not specified"} days</Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No bruising or scarring was reported following the accident.</Text>
      )}
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        {bruising.hasBruising 
          ? `The claimant experienced bruising or scarring at ${bruising.location || "unspecified location"} following the accident, which was first noticed ${
              bruising.noticed === "1" ? "on the same day" : 
              bruising.noticed === "2" ? "the next day" : 
              bruising.noticed === "3" ? "a few days later" : 
              "at an unspecified time"
            }. The initial severity was ${bruising.initialSeverity?.toLowerCase() || "not specified"} and current severity is ${
              bruising.currentSeverity === "Resolved" 
                ? `resolved after ${bruising.resolveDays || "an unspecified number of"} days` 
                : (bruising.currentSeverity?.toLowerCase() || "not specified")
            }.`
          : "The claimant did not report any bruising or scarring following the accident."
        }
      </Text>
    </View>
  );
};
