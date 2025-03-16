
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { injuryStyles } from '../styles/injuryStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { colorScheme } from '../styles/colorScheme';

interface OtherInjuriesSectionProps {
  otherInjuries: {
    hasOtherInjury: boolean;
    name?: string;
    start?: string;
    initialSeverity?: string;
    currentSeverity?: string;
    resolveDays?: string;
  };
}

const OtherInjuriesSection: React.FC<OtherInjuriesSectionProps> = ({ otherInjuries }) => {
  if (!otherInjuries.hasOtherInjury) {
    return (
      <View style={layoutStyles.section}>
        <Text style={textStyles.sectionTitle}>Other Injuries</Text>
        <Text style={textStyles.normalText}>The claimant did not report any other injuries following the accident.</Text>
      </View>
    );
  }

  return (
    <View style={layoutStyles.section}>
      <Text style={textStyles.sectionTitle}>Other Injuries</Text>
      
      <View style={injuryStyles.injurySection}>
        <View style={injuryStyles.injuryHeader}>
          <Text style={textStyles.headerText}>{otherInjuries.name || "Additional Injury"} Details</Text>
        </View>
        
        <View style={injuryStyles.injuryContent}>
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Type of Injury:</Text>
            <Text style={textStyles.normalText}>{otherInjuries.name || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>When Started:</Text>
            <Text style={textStyles.normalText}>{otherInjuries.start || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Initial Severity:</Text>
            <Text style={textStyles.normalText}>{otherInjuries.initialSeverity || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Current Severity:</Text>
            <Text style={textStyles.normalText}>{otherInjuries.currentSeverity || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Days to Resolve:</Text>
            <Text style={textStyles.normalText}>{otherInjuries.resolveDays || "Not specified"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtherInjuriesSection;
