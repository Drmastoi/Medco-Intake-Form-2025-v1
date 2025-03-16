
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { formatInjurySeverity, formatResolveDays } from '../utils/formatUtils';
import { injuryStyles } from '../styles/injuryStyles';

interface OtherInjuriesSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const OtherInjuriesSection = ({ reportData, reportType = "expert" }: OtherInjuriesSectionProps) => {
  const otherInjuries = reportData.other?.otherInjuries;
  
  if (!otherInjuries || !otherInjuries.hasOtherInjury) {
    return null;
  }
  
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 5 }]}>Other Injuries</Text>
      
      <View style={injuryStyles.injuryContainer}>
        <View style={injuryStyles.injuryHeader}>
          <Text style={injuryStyles.injuryTitle}>{otherInjuries.name || "Unspecified Injury"}</Text>
        </View>
        
        <View style={injuryStyles.injuryContent}>
          <View style={injuryStyles.injuryRow}>
            <Text style={injuryStyles.injuryLabel}>Onset</Text>
            <Text style={injuryStyles.injuryValue}>{otherInjuries.start || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={injuryStyles.injuryLabel}>Initial Severity</Text>
            <Text style={injuryStyles.injuryValue}>{formatInjurySeverity(otherInjuries.initialSeverity)}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={injuryStyles.injuryLabel}>Current Status</Text>
            <Text style={injuryStyles.injuryValue}>
              {otherInjuries.currentSeverity === "4" 
                ? "Resolved" 
                : `${formatInjurySeverity(otherInjuries.currentSeverity)}`}
            </Text>
          </View>
          
          {(otherInjuries.currentSeverity === "4" || otherInjuries.resolveDays) && (
            <View style={injuryStyles.injuryRow}>
              <Text style={injuryStyles.injuryLabel}>Resolution</Text>
              <Text style={injuryStyles.injuryValue}>
                {formatResolveDays(otherInjuries.resolveDays)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default OtherInjuriesSection;
