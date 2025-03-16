
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';

interface LifestyleImpactSectionProps {
  formData: ReportData;
  styles: any;
}

export const LifestyleImpactSection = ({ formData, styles }: LifestyleImpactSectionProps) => {
  // Safely handle formData which might be incomplete
  const lifestyle = formData.other?.lifestyle || {
    impactOnWork: false,
    impactOnSleep: false,
    impactOnDomestic: false,
    impactOnSports: false,
    impactOnSocial: false
  };
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 8 - Impact on Daily Life</Text>

      {/* Work Impact */}
      <Text style={{ ...styles.fieldLabel, fontSize: 12, marginTop: 6, marginBottom: 4 }}>8.1 Work Capabilities</Text>
      {lifestyle.impactOnWork ? (
        <Text style={styles.fieldValue}>
          The claimant's work capabilities were affected. 
          {lifestyle.workImpactDate ? ` This impact started on ${lifestyle.workImpactDate}.` : ''} 
          {lifestyle.workRestrictions && lifestyle.workRestrictions.length > 0 ? 
            ` Restrictions included: ${lifestyle.workRestrictions.join(', ')}.` : ''}
        </Text>
      ) : (
        <Text style={styles.fieldValue}>The claimant reported no impact on work capabilities.</Text>
      )}
      
      {lifestyle.timeOffWork ? (
        <Text style={styles.fieldValue}>Time off work: {lifestyle.timeOffWork} days</Text>
      ) : null}

      {/* Domestic Activities */}
      <Text style={{ ...styles.fieldLabel, fontSize: 12, marginTop: 6, marginBottom: 4 }}>8.2 Domestic Activities</Text>
      {lifestyle.impactOnDomestic ? (
        <Text style={styles.fieldValue}>
          The claimant's domestic activities were affected. 
          {lifestyle.domesticImpactDate ? ` This impact started on ${lifestyle.domesticImpactDate}.` : ''} 
          {lifestyle.domesticIssues && lifestyle.domesticIssues.length > 0 ? 
            ` Activities affected included: ${lifestyle.domesticIssues.join(', ')}.` : ''}
        </Text>
      ) : (
        <Text style={styles.fieldValue}>The claimant reported no impact on domestic activities.</Text>
      )}

      {/* Sleep */}
      <Text style={{ ...styles.fieldLabel, fontSize: 12, marginTop: 6, marginBottom: 4 }}>8.3 Sleep</Text>
      {lifestyle.impactOnSleep ? (
        <Text style={styles.fieldValue}>
          The claimant's sleep was disrupted. 
          {lifestyle.sleepImpactDate ? ` This impact started on ${lifestyle.sleepImpactDate}.` : ''} 
          {lifestyle.sleepIssues && lifestyle.sleepIssues.length > 0 ? 
            ` Sleep issues included: ${lifestyle.sleepIssues.join(', ')}.` : ''}
        </Text>
      ) : (
        <Text style={styles.fieldValue}>The claimant reported no impact on sleep.</Text>
      )}

      {/* Social Life */}
      <Text style={{ ...styles.fieldLabel, fontSize: 12, marginTop: 6, marginBottom: 4 }}>8.4 Social Life</Text>
      {lifestyle.impactOnSocial ? (
        <Text style={styles.fieldValue}>
          The claimant's social life was affected. 
          {lifestyle.socialImpactDate ? ` This impact started on ${lifestyle.socialImpactDate}.` : ''} 
          {lifestyle.socialDetails ? ` Details: ${lifestyle.socialDetails}` : ''}
        </Text>
      ) : (
        <Text style={styles.fieldValue}>The claimant reported no impact on social life.</Text>
      )}

      {/* Sports and Leisure */}
      <Text style={{ ...styles.fieldLabel, fontSize: 12, marginTop: 6, marginBottom: 4 }}>8.5 Sports and Leisure</Text>
      {lifestyle.impactOnSports ? (
        <Text style={styles.fieldValue}>
          The claimant's sports and leisure activities were affected. 
          {lifestyle.sportsImpactDate ? ` This impact started on ${lifestyle.sportsImpactDate}.` : ''} 
          {lifestyle.sportsActivities ? ` Activities affected: ${lifestyle.sportsActivities}` : ''} 
          {lifestyle.sportsActivities && lifestyle.sportsDuration ? `. ` : ''} 
          {lifestyle.sportsDuration ? `The claimant typically engaged in these activities ${lifestyle.sportsDuration} times per month before the accident.` : ''}
        </Text>
      ) : (
        <Text style={styles.fieldValue}>The claimant reported no impact on sports and leisure activities.</Text>
      )}
    </View>
  );
};

export default LifestyleImpactSection;
