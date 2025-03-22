
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';

interface LifestyleImpactSectionProps {
  reportData: ReportData;
}

export const LifestyleImpactSection: React.FC<LifestyleImpactSectionProps> = ({ reportData }) => {
  // Safely access lifestyle data with proper defaults
  const lifestyle = reportData.other?.lifestyle || {
    impactOnWork: false,
    timeOffWork: '',
    workRestrictions: [],
    impactOnSleep: false,
    sleepIssues: [],
    impactOnDomestic: false,
    domesticIssues: [],
    impactOnSports: false,
    sportsActivities: '',
    sportsDuration: '',
    impactOnSocial: false,
    socialDetails: ''
  };
  
  // Work impact
  const impactOnWork = lifestyle.impactOnWork || false;
  const timeOffWork = lifestyle.timeOffWork || '';
  const workRestrictions = Array.isArray(lifestyle.workRestrictions) ? lifestyle.workRestrictions : [];
  
  // Sleep impact
  const impactOnSleep = lifestyle.impactOnSleep || false;
  const sleepIssues = Array.isArray(lifestyle.sleepIssues) ? lifestyle.sleepIssues : [];
  
  // Domestic impact
  const impactOnDomestic = lifestyle.impactOnDomestic || false;
  const domesticIssues = Array.isArray(lifestyle.domesticIssues) ? lifestyle.domesticIssues : [];
  
  // Sports impact
  const impactOnSports = lifestyle.impactOnSports || false;
  const sportsActivities = lifestyle.sportsActivities || '';
  const sportsDuration = lifestyle.sportsDuration || '';
  
  // Social impact
  const impactOnSocial = lifestyle.impactOnSocial || false;
  const socialDetails = lifestyle.socialDetails || '';

  return (
    <View style={layoutStyles.section}>
      <Text style={textStyles.sectionHeader}>LIFESTYLE IMPACT</Text>
      
      <View style={{margin: 5, padding: 5}}>
        {/* Work Impact Section */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 5}}>Impact on Work:</Text>
        {impactOnWork ? (
          <>
            <Text style={{fontSize: 10, marginBottom: 8}}>
              The claimant reports that their injuries have affected their ability to work.
            </Text>
            {timeOffWork && (
              <Text style={{fontSize: 10, marginBottom: 8}}>
                Time off work: {timeOffWork}
              </Text>
            )}
            {workRestrictions.length > 0 && (
              <Text style={{fontSize: 10, marginBottom: 8}}>
                Work restrictions: {workRestrictions.join(', ')}
              </Text>
            )}
          </>
        ) : (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            The claimant reports no impact on their work due to the injuries.
          </Text>
        )}
        
        {/* Sleep Impact Section */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 5}}>Impact on Sleep:</Text>
        {impactOnSleep ? (
          <>
            <Text style={{fontSize: 10, marginBottom: 8}}>
              The claimant reports that their injuries have affected their sleep.
            </Text>
            {sleepIssues.length > 0 && (
              <Text style={{fontSize: 10, marginBottom: 8}}>
                Sleep issues: {sleepIssues.join(', ')}
              </Text>
            )}
          </>
        ) : (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            The claimant reports no impact on their sleep due to the injuries.
          </Text>
        )}
        
        {/* Domestic Impact Section */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 5}}>Impact on Domestic Activities:</Text>
        {impactOnDomestic ? (
          <>
            <Text style={{fontSize: 10, marginBottom: 8}}>
              The claimant reports that their injuries have affected their ability to perform domestic activities.
            </Text>
            {domesticIssues.length > 0 && (
              <Text style={{fontSize: 10, marginBottom: 8}}>
                Domestic difficulties: {domesticIssues.join(', ')}
              </Text>
            )}
          </>
        ) : (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            The claimant reports no impact on their domestic activities due to the injuries.
          </Text>
        )}
        
        {/* Sports Impact Section */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 5}}>Impact on Sports and Leisure:</Text>
        {impactOnSports ? (
          <>
            <Text style={{fontSize: 10, marginBottom: 8}}>
              The claimant reports that their injuries have affected their ability to participate in sports and leisure activities.
            </Text>
            {sportsActivities && (
              <Text style={{fontSize: 10, marginBottom: 8}}>
                Affected activities: {sportsActivities}
              </Text>
            )}
            {sportsDuration && (
              <Text style={{fontSize: 10, marginBottom: 8}}>
                Duration of impact: {sportsDuration}
              </Text>
            )}
          </>
        ) : (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            The claimant reports no impact on their sports and leisure activities due to the injuries.
          </Text>
        )}
        
        {/* Social Impact Section */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 5}}>Impact on Social Life:</Text>
        {impactOnSocial ? (
          <>
            <Text style={{fontSize: 10, marginBottom: 8}}>
              The claimant reports that their injuries have affected their social life.
            </Text>
            {socialDetails && (
              <Text style={{fontSize: 10, marginBottom: 8}}>
                Details: {socialDetails}
              </Text>
            )}
          </>
        ) : (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            The claimant reports no impact on their social life due to the injuries.
          </Text>
        )}
      </View>
    </View>
  );
};
