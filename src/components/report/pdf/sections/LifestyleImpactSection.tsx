
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
          {formData.lifestyle.workImpact === "Yes"
            ? `The injuries impacted the claimant's ability to work. ${formData.lifestyle.workImpactDetails || ""}`
            : "The injuries did not significantly impact the claimant's ability to work."}
          {formData.lifestyle.timeOffWork 
            ? ` The claimant took approximately ${formData.lifestyle.timeOffWork} off work.`
            : ""}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>14.2 Domestic Impact</Text>
        <Text style={styles.fieldValue}>
          {formData.lifestyle.domesticImpact === "Yes"
            ? `The injuries impacted the claimant's ability to perform domestic tasks. ${formData.lifestyle.domesticImpactDetails || ""}`
            : "The injuries did not significantly impact the claimant's ability to perform domestic tasks."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>14.3 Sleep Impact</Text>
        <Text style={styles.fieldValue}>
          {formData.lifestyle.sleepImpact === "Yes"
            ? `The injuries disrupted the claimant's sleep. ${formData.lifestyle.sleepImpactDetails || ""}`
            : "The injuries did not significantly impact the claimant's sleep patterns."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>14.4 Social Life & Leisure Impact</Text>
        <Text style={styles.fieldValue}>
          {formData.lifestyle.socialImpact === "Yes"
            ? `The injuries affected the claimant's social life and leisure activities. ${formData.lifestyle.socialImpactDetails || ""}`
            : "The injuries did not significantly impact the claimant's social life and leisure activities."}
        </Text>
      </View>
    </View>
  );
};
