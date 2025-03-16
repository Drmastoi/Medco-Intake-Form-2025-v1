
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { injuryStyles } from '../styles/injuryStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { colorScheme } from '../styles/colorScheme';

interface BruisingSectionProps {
  bruising: {
    hasBruising: boolean;
    location?: string;
    noticed?: string;
    initialSeverity?: string;
    currentSeverity?: string;
    resolveDays?: string;
    hasVisibleScar?: boolean;
  };
}

const BruisingSection: React.FC<BruisingSectionProps> = ({ bruising }) => {
  if (!bruising.hasBruising) {
    return (
      <View style={layoutStyles.section}>
        <Text style={textStyles.sectionTitle}>Bruising</Text>
        <Text style={textStyles.normalText}>The claimant did not report any bruising following the accident.</Text>
      </View>
    );
  }

  return (
    <View style={layoutStyles.section}>
      <Text style={textStyles.sectionTitle}>Bruising</Text>
      
      <View style={injuryStyles.injurySection}>
        <View style={injuryStyles.injuryHeader}>
          <Text style={textStyles.headerText}>Bruising Details</Text>
        </View>
        
        <View style={injuryStyles.injuryContent}>
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Location:</Text>
            <Text style={textStyles.normalText}>{bruising.location || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Noticed:</Text>
            <Text style={textStyles.normalText}>{bruising.noticed || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Initial Severity:</Text>
            <Text style={textStyles.normalText}>{bruising.initialSeverity || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Current Severity:</Text>
            <Text style={textStyles.normalText}>{bruising.currentSeverity || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.boldText}>Days to Resolve:</Text>
            <Text style={textStyles.normalText}>{bruising.resolveDays || "Not specified"}</Text>
          </View>
          
          {bruising.hasVisibleScar && (
            <View style={injuryStyles.injuryRow}>
              <Text style={textStyles.boldText}>Visible Scarring:</Text>
              <Text style={textStyles.normalText}>The claimant has visible scarring from the bruising.</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default BruisingSection;
