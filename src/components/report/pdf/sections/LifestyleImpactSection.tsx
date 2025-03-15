
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface LifestyleImpactSectionProps {
  formData: ReportData;
  styles: any;
}

export const LifestyleImpactSection = ({ formData, styles }: LifestyleImpactSectionProps) => {
  const lifestyleData = formData.other?.lifestyle;

  // Function to format date display
  const formatDateDisplay = (date: string | undefined): string => {
    if (!date) return "";
    return ` This impact started from ${date}.`;
  };

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 10 - Impact on Lifestyle</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.1 Work Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData?.impactOnWork
            ? `The injuries impacted the claimant's ability to work.${formatDateDisplay(lifestyleData.workImpactDate || "")} ${lifestyleData.workRestrictions?.join(", ") || ""}`
            : "The injuries did not significantly impact the claimant's ability to work."}
          {lifestyleData?.timeOffWork 
            ? ` The claimant took approximately ${lifestyleData.timeOffWork} off work.`
            : ""}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.2 Domestic Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData?.impactOnDomestic
            ? `The injuries impacted the claimant's ability to perform domestic tasks.${formatDateDisplay(lifestyleData.domesticImpactDate || "")} ${lifestyleData.domesticIssues?.join(", ") || ""}`
            : "The injuries did not significantly impact the claimant's ability to perform domestic tasks."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.3 Sleep Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData?.impactOnSleep
            ? `The injuries disrupted the claimant's sleep.${formatDateDisplay(lifestyleData.sleepImpactDate || "")} ${lifestyleData.sleepIssues?.join(", ") || ""}`
            : "The injuries did not significantly impact the claimant's sleep patterns."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.4 Social Life & Leisure Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData?.impactOnSocial
            ? `The injuries affected the claimant's social life and leisure activities.${formatDateDisplay(lifestyleData.socialImpactDate || "")} ${lifestyleData.socialDetails || ""}`
            : "The injuries did not significantly impact the claimant's social life and leisure activities."}
          {lifestyleData?.impactOnSports
            ? ` The claimant's sports activities were also affected.${formatDateDisplay(lifestyleData.sportsImpactDate || "")} ${lifestyleData.sportsActivities ? `Affected activities: ${lifestyleData.sportsActivities}.` : ""} ${lifestyleData.sportsDuration ? `Duration of impact: ${lifestyleData.sportsDuration}.` : ""}`
            : ""}
        </Text>
      </View>
    </View>
  );
};
