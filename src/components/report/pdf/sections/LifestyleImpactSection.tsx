
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface LifestyleImpactSectionProps {
  formData: ReportData;
  styles: any;
}

export const LifestyleImpactSection = ({ formData, styles }: LifestyleImpactSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 14 - Impact on Lifestyle</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>14.1 Work Impact</Text>
        <Text style={styles.fieldValue}>
          {formData.other?.lifestyle?.impactOnWork
            ? `The injuries impacted the claimant's ability to work. ${formData.other.lifestyle.workRestrictions?.join(", ") || ""}`
            : "The injuries did not significantly impact the claimant's ability to work."}
          {formData.other?.lifestyle?.timeOffWork 
            ? ` The claimant took approximately ${formData.other.lifestyle.timeOffWork} off work.`
            : ""}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>14.2 Domestic Impact</Text>
        <Text style={styles.fieldValue}>
          {formData.other?.lifestyle?.impactOnDomestic
            ? `The injuries impacted the claimant's ability to perform domestic tasks. ${formData.other.lifestyle.domesticIssues?.join(", ") || ""}`
            : "The injuries did not significantly impact the claimant's ability to perform domestic tasks."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>14.3 Sleep Impact</Text>
        <Text style={styles.fieldValue}>
          {formData.other?.lifestyle?.impactOnSleep
            ? `The injuries disrupted the claimant's sleep. ${formData.other.lifestyle.sleepIssues?.join(", ") || ""}`
            : "The injuries did not significantly impact the claimant's sleep patterns."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>14.4 Social Life & Leisure Impact</Text>
        <Text style={styles.fieldValue}>
          {formData.other?.lifestyle?.impactOnSocial
            ? `The injuries affected the claimant's social life and leisure activities. ${formData.other.lifestyle.socialDetails || ""}`
            : "The injuries did not significantly impact the claimant's social life and leisure activities."}
        </Text>
      </View>
    </View>
  );
};
