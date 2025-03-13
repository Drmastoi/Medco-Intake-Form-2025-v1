
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface LifestyleImpactSectionProps {
  formData: ReportData;
  styles: any;
}

export const LifestyleImpactSection = ({ formData, styles }: LifestyleImpactSectionProps) => {
  const { other } = formData;
  const { lifestyle } = other;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 10 - Impact on Daily Life</Text>
      
      {/* Work Impact */}
      <Text style={[styles.fieldLabel, { marginTop: 5 }]}>Impact on Work:</Text>
      {lifestyle.impactOnWork ? (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Time Off Work:</Text>
              <Text style={styles.fieldValue}>{lifestyle.timeOffWork || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Work Restrictions:</Text>
              <Text style={styles.fieldValue}>
                {lifestyle.workRestrictions && lifestyle.workRestrictions.length > 0 
                  ? lifestyle.workRestrictions.join(", ") 
                  : "None reported"}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No impact on work reported</Text>
      )}
      
      {/* Sleep Impact */}
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Impact on Sleep:</Text>
      {lifestyle.impactOnSleep ? (
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Sleep Issues:</Text>
            <Text style={styles.fieldValue}>
              {lifestyle.sleepIssues && lifestyle.sleepIssues.length > 0 
                ? lifestyle.sleepIssues.join(", ") 
                : "Not specified"}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.fieldValue}>No impact on sleep reported</Text>
      )}
      
      {/* Domestic Impact */}
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Impact on Domestic Activities:</Text>
      {lifestyle.impactOnDomestic ? (
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Domestic Issues:</Text>
            <Text style={styles.fieldValue}>
              {lifestyle.domesticIssues && lifestyle.domesticIssues.length > 0 
                ? lifestyle.domesticIssues.join(", ") 
                : "Not specified"}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.fieldValue}>No impact on domestic activities reported</Text>
      )}
      
      {/* Sports/Leisure Impact */}
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Impact on Sports and Leisure:</Text>
      {lifestyle.impactOnSports ? (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Affected Activities:</Text>
              <Text style={styles.fieldValue}>{lifestyle.sportsActivities || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration of Impact:</Text>
              <Text style={styles.fieldValue}>{lifestyle.sportsDuration || "Not specified"}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No impact on sports and leisure activities reported</Text>
      )}
      
      {/* Social Impact */}
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Impact on Social Life:</Text>
      {lifestyle.impactOnSocial ? (
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Details:</Text>
            <Text style={styles.fieldValue}>{lifestyle.socialDetails || "Not specified"}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.fieldValue}>No impact on social life reported</Text>
      )}
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        The accident has had 
        {!lifestyle.impactOnWork && !lifestyle.impactOnSleep && 
         !lifestyle.impactOnDomestic && !lifestyle.impactOnSports && !lifestyle.impactOnSocial
          ? " no significant impact on the claimant's daily life activities." 
          : " impacts on the claimant's life including: "}
        {lifestyle.impactOnWork ? "work (requiring time off and/or restrictions)" : ""}
        {lifestyle.impactOnSleep 
          ? (lifestyle.impactOnWork ? ", " : "") + "sleep patterns" 
          : ""}
        {lifestyle.impactOnDomestic 
          ? (lifestyle.impactOnWork || lifestyle.impactOnSleep ? ", " : "") + "domestic activities" 
          : ""}
        {lifestyle.impactOnSports 
          ? (lifestyle.impactOnWork || lifestyle.impactOnSleep || lifestyle.impactOnDomestic ? ", " : "") + 
            "sports and leisure activities" 
          : ""}
        {lifestyle.impactOnSocial 
          ? (lifestyle.impactOnWork || lifestyle.impactOnSleep || 
             lifestyle.impactOnDomestic || lifestyle.impactOnSports ? ", and " : "") + 
            "social life" 
          : ""}
        {lifestyle.impactOnWork || lifestyle.impactOnSleep || 
         lifestyle.impactOnDomestic || lifestyle.impactOnSports || lifestyle.impactOnSocial
          ? "." 
          : ""}
      </Text>
    </View>
  );
};
