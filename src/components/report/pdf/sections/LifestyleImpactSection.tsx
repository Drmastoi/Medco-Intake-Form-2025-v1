
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { tableStyles } from '../styles/tableStyles';
import { colorScheme } from '../styles/colorScheme';
import { formatCheckboxList } from '../utils/formatUtils';

interface LifestyleImpactSectionProps {
  lifestyle: {
    impactOnWork: boolean;
    timeOffWork?: string;
    workRestrictions?: string[];
    impactOnSleep: boolean;
    sleepIssues?: string[];
    impactOnDomestic: boolean;
    domesticIssues?: string[];
    impactOnSports: boolean;
    sportsActivities?: string;
    sportsDuration?: string;
    impactOnSocial: boolean;
    socialDetails?: string;
  };
}

const LifestyleImpactSection: React.FC<LifestyleImpactSectionProps> = ({ lifestyle }) => {
  const hasAnyImpact = lifestyle.impactOnWork || 
                        lifestyle.impactOnSleep || 
                        lifestyle.impactOnDomestic || 
                        lifestyle.impactOnSports || 
                        lifestyle.impactOnSocial;

  return (
    <View style={[layoutStyles.section, { backgroundColor: colorScheme.sectionBg }]}>
      <Text style={textStyles.sectionTitle}>Lifestyle Impact</Text>

      {!hasAnyImpact ? (
        <Text style={textStyles.normalText}>The claimant reports no significant lifestyle impact from the injuries sustained.</Text>
      ) : (
        <View>
          <View style={tableStyles.tableContainer}>
            <View style={tableStyles.tableHeader}>
              <Text style={[textStyles.boldText, { flex: 1 }]}>Area of Impact</Text>
              <Text style={[textStyles.boldText, { flex: 2 }]}>Details</Text>
            </View>

            {lifestyle.impactOnWork && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Work</Text>
                <View style={{ flex: 2 }}>
                  {lifestyle.timeOffWork && (
                    <Text style={textStyles.normalText}>Time off work: {lifestyle.timeOffWork} days</Text>
                  )}
                  {lifestyle.workRestrictions && lifestyle.workRestrictions.length > 0 && (
                    <Text style={textStyles.normalText}>
                      Difficulties with: {formatCheckboxList(lifestyle.workRestrictions)}
                    </Text>
                  )}
                </View>
              </View>
            )}

            {lifestyle.impactOnSleep && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Sleep</Text>
                <Text style={[textStyles.normalText, { flex: 2 }]}>
                  {lifestyle.sleepIssues && lifestyle.sleepIssues.length > 0 
                    ? `Experienced: ${formatCheckboxList(lifestyle.sleepIssues)}`
                    : "Sleep was affected but no specific issues reported."}
                </Text>
              </View>
            )}

            {lifestyle.impactOnDomestic && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Domestic Activities</Text>
                <Text style={[textStyles.normalText, { flex: 2 }]}>
                  {lifestyle.domesticIssues && lifestyle.domesticIssues.length > 0 
                    ? `Difficulties with: ${formatCheckboxList(lifestyle.domesticIssues)}`
                    : "Domestic activities were affected but no specific issues reported."}
                </Text>
              </View>
            )}

            {lifestyle.impactOnSports && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Sports/Leisure</Text>
                <View style={{ flex: 2 }}>
                  {lifestyle.sportsActivities && (
                    <Text style={textStyles.normalText}>
                      Activities affected: {lifestyle.sportsActivities}
                    </Text>
                  )}
                  {lifestyle.sportsDuration && (
                    <Text style={textStyles.normalText}>
                      Duration of impact: {lifestyle.sportsDuration}
                    </Text>
                  )}
                </View>
              </View>
            )}

            {lifestyle.impactOnSocial && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Social Life</Text>
                <Text style={[textStyles.normalText, { flex: 2 }]}>
                  {lifestyle.socialDetails || "Social life was affected but no specific details provided."}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default LifestyleImpactSection;
