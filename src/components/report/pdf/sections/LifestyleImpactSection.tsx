
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface LifestyleImpactSectionProps {
  formData: ReportData;
  styles: any;
}

export const LifestyleImpactSection = ({ formData, styles }: LifestyleImpactSectionProps) => {
  // Safely access lifestyle data with fallbacks
  const lifestyleData = formData.other?.lifestyle || {};
  
  console.log("LifestyleImpactSection data:", JSON.stringify(lifestyleData, null, 2));

  // Function to format date display
  const formatDateDisplay = (date: string | undefined): string => {
    if (!date) return "";
    return ` This impact started from ${date}.`;
  };

  // Function to format restrictions or issues into readable text
  const formatArrayToText = (items: string[] | undefined): string => {
    if (!items || items.length === 0) return "";
    
    if (items.length === 1) return ` Specific issues include: ${items[0]}.`;
    if (items.length === 2) return ` Specific issues include: ${items[0]} and ${items[1]}.`;
    
    const lastItem = items[items.length - 1];
    const otherItems = items.slice(0, -1).join(", ");
    return ` Specific issues include: ${otherItems}, and ${lastItem}.`;
  };

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 10 - Impact on Lifestyle</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.1 Work Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData.impactOnWork
            ? `The injuries impacted the claimant's ability to work.${formatDateDisplay(lifestyleData.workImpactDate)}${formatArrayToText(lifestyleData.workRestrictions)}`
            : "The injuries did not significantly impact the claimant's ability to work."}
          {lifestyleData.timeOffWork && lifestyleData.timeOffWork !== "Not Specified"
            ? ` The claimant took approximately ${lifestyleData.timeOffWork} days off work.`
            : ""}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.2 Domestic Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData.impactOnDomestic
            ? `The injuries impacted the claimant's ability to perform domestic tasks.${formatDateDisplay(lifestyleData.domesticImpactDate)}${formatArrayToText(lifestyleData.domesticIssues)}`
            : "The injuries did not significantly impact the claimant's ability to perform domestic tasks."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.3 Sleep Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData.impactOnSleep
            ? `The injuries disrupted the claimant's sleep.${formatDateDisplay(lifestyleData.sleepImpactDate)}${formatArrayToText(lifestyleData.sleepIssues)}`
            : "The injuries did not significantly impact the claimant's sleep patterns."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.4 Social Life & Leisure Impact</Text>
        <Text style={styles.fieldValue}>
          {lifestyleData.impactOnSocial
            ? `The injuries affected the claimant's social life.${formatDateDisplay(lifestyleData.socialImpactDate)} ${lifestyleData.socialDetails || ""}`
            : "The injuries did not significantly impact the claimant's social life and leisure activities."}
          {lifestyleData.impactOnSports
            ? ` The claimant's sports activities were also affected.${formatDateDisplay(lifestyleData.sportsImpactDate)} ${lifestyleData.sportsActivities ? `Affected activities: ${lifestyleData.sportsActivities}.` : ""} ${lifestyleData.sportsDuration ? `Duration of impact: ${lifestyleData.sportsDuration}.` : ""}`
            : ""}
        </Text>
      </View>
    </View>
  );
};
