
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';
import { tableStyles } from '../styles/tableStyles';

interface LifestyleImpactSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const LifestyleImpactSection = ({ reportData, reportType = "expert" }: LifestyleImpactSectionProps) => {
  const lifestyle = reportData.other?.lifestyle;
  
  if (!lifestyle) {
    return null;
  }
  
  const hasAnyImpact = 
    lifestyle.impactOnWork || 
    lifestyle.impactOnSleep || 
    lifestyle.impactOnDomestic || 
    lifestyle.impactOnSports || 
    lifestyle.impactOnSocial;
  
  if (!hasAnyImpact) {
    return (
      <View style={pdfStyles.sectionContainer}>
        <Text style={[textStyles.sectionTitle, { marginBottom: 5 }]}>Impact on Daily Life</Text>
        <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5 }}>
          <Text style={textStyles.regularText}>No impact on daily life activities reported.</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 10 }]}>Impact on Daily Life</Text>
      
      <View style={tableStyles.table}>
        {/* Work Impact */}
        {lifestyle.impactOnWork && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Work</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              {lifestyle.timeOffWork && (
                <Text style={tableStyles.tableCell}>Time off work: {lifestyle.timeOffWork}</Text>
              )}
              {lifestyle.workRestrictions && lifestyle.workRestrictions.length > 0 && (
                <Text style={tableStyles.tableCell}>Restrictions: {lifestyle.workRestrictions.join(', ')}</Text>
              )}
              {lifestyle.workImpactDate && (
                <Text style={tableStyles.tableCell}>Impact began: {lifestyle.workImpactDate}</Text>
              )}
            </View>
          </View>
        )}
        
        {/* Sleep Impact */}
        {lifestyle.impactOnSleep && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Sleep</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              {lifestyle.sleepIssues && lifestyle.sleepIssues.length > 0 && (
                <Text style={tableStyles.tableCell}>Issues: {lifestyle.sleepIssues.join(', ')}</Text>
              )}
              {lifestyle.sleepImpactDate && (
                <Text style={tableStyles.tableCell}>Impact began: {lifestyle.sleepImpactDate}</Text>
              )}
            </View>
          </View>
        )}
        
        {/* Domestic Activities Impact */}
        {lifestyle.impactOnDomestic && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Domestic Activities</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              {lifestyle.domesticIssues && lifestyle.domesticIssues.length > 0 && (
                <Text style={tableStyles.tableCell}>Affected activities: {lifestyle.domesticIssues.join(', ')}</Text>
              )}
              {lifestyle.domesticImpactDate && (
                <Text style={tableStyles.tableCell}>Impact began: {lifestyle.domesticImpactDate}</Text>
              )}
            </View>
          </View>
        )}
        
        {/* Sports/Leisure Activities Impact */}
        {lifestyle.impactOnSports && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Sports & Leisure</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              {lifestyle.sportsActivities && (
                <Text style={tableStyles.tableCell}>Affected activities: {lifestyle.sportsActivities}</Text>
              )}
              {lifestyle.sportsDuration && (
                <Text style={tableStyles.tableCell}>Duration of limitation: {lifestyle.sportsDuration}</Text>
              )}
              {lifestyle.sportsImpactDate && (
                <Text style={tableStyles.tableCell}>Impact began: {lifestyle.sportsImpactDate}</Text>
              )}
            </View>
          </View>
        )}
        
        {/* Social Life Impact */}
        {lifestyle.impactOnSocial && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Social Life</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              {lifestyle.socialDetails && (
                <Text style={tableStyles.tableCell}>{lifestyle.socialDetails}</Text>
              )}
              {lifestyle.socialImpactDate && (
                <Text style={tableStyles.tableCell}>Impact began: {lifestyle.socialImpactDate}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LifestyleImpactSection;
