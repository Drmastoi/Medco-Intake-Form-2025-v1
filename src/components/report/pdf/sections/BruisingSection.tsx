
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { injuryStyles } from '../styles/injuryStyles';
import { colorScheme } from '../styles/colorScheme';
import { formatSeverity } from '../utils/formatUtils';

interface BruisingSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const formatResolveDays = (days: string | undefined) => {
  if (!days) return "Not specified";
  if (days === "0") return "Ongoing";
  return `${days} days`;
};

const BruisingSection = ({ reportData, reportType = "expert" }: BruisingSectionProps) => {
  if (!reportData.other?.bruising?.hasBruising) {
    return null;
  }
  
  const bruising = reportData.other.bruising;
  
  return (
    <View style={pdfStyles.section}>
      <Text style={textStyles.sectionTitle}>Bruising and Scarring</Text>
      
      <View style={injuryStyles.injurySection}>
        <View style={injuryStyles.injuryHeader}>
          <Text style={injuryStyles.injuryHeaderText}>Bruising Details</Text>
        </View>
        
        <View style={injuryStyles.injuryContent}>
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Location:</Text>
            <Text style={textStyles.valueText}>{bruising.location || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>When noticed:</Text>
            <Text style={textStyles.valueText}>{bruising.noticed || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Initial severity:</Text>
            <Text style={textStyles.valueText}>{formatSeverity(bruising.initialSeverity)}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Current severity:</Text>
            <Text style={textStyles.valueText}>{formatSeverity(bruising.currentSeverity)}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Expected resolution:</Text>
            <Text style={textStyles.valueText}>{formatResolveDays(bruising.resolveDays)}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={textStyles.labelText}>Visible scarring:</Text>
            <Text style={textStyles.valueText}>{bruising.hasVisibleScar ? "Yes" : "No"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BruisingSection;
