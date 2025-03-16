
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { injuryStyles } from '../styles/injuryStyles';
import { colorScheme } from '../styles/colorScheme';
import { formatSeverity } from '../utils/formatUtils';

interface OtherInjuriesSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const formatResolveDays = (days: string | undefined) => {
  if (!days) return "Not specified";
  if (days === "0") return "Ongoing";
  return `${days} days`;
};

const OtherInjuriesSection = ({ reportData, reportType = "expert" }: OtherInjuriesSectionProps) => {
  if (!reportData.other?.otherInjuries?.hasOtherInjury) {
    return null;
  }
  
  const injury = reportData.other.otherInjuries;
  
  return (
    <View style={pdfStyles.section}>
      <Text style={textStyles.sectionTitle}>Other Injuries</Text>
      
      <View style={injuryStyles.injurySection}>
        <View style={injuryStyles.injuryHeader}>
          <Text style={injuryStyles.injuryHeaderText}>{injury.name || "Additional Injury"}</Text>
        </View>
        
        <View style={injuryStyles.injuryContent}>
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Injury type:</Text>
            <Text style={textStyles.valueText}>{injury.name || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>When started:</Text>
            <Text style={textStyles.valueText}>{injury.start || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Initial severity:</Text>
            <Text style={textStyles.valueText}>{formatSeverity(injury.initialSeverity)}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Current severity:</Text>
            <Text style={textStyles.valueText}>{formatSeverity(injury.currentSeverity)}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Expected resolution:</Text>
            <Text style={textStyles.valueText}>{formatResolveDays(injury.resolveDays)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtherInjuriesSection;
