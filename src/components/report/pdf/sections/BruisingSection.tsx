
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { formatInjurySeverity, formatResolveDays } from '../utils/formatUtils';
import { injuryStyles } from '../styles/injuryStyles';

interface BruisingSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const BruisingSection = ({ reportData, reportType = "expert" }: BruisingSectionProps) => {
  const bruising = reportData.other?.bruising;
  
  if (!bruising || !bruising.hasBruising) {
    return null;
  }
  
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 5 }]}>Bruising and Scarring</Text>
      
      <View style={injuryStyles.injuryContainer}>
        <View style={injuryStyles.injuryHeader}>
          <Text style={injuryStyles.injuryTitle}>Bruising</Text>
        </View>
        
        <View style={injuryStyles.injuryContent}>
          <View style={injuryStyles.injuryRow}>
            <Text style={injuryStyles.injuryLabel}>Location</Text>
            <Text style={injuryStyles.injuryValue}>{bruising.location || "Not specified"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={injuryStyles.injuryLabel}>First Noticed</Text>
            <Text style={injuryStyles.injuryValue}>{bruising.noticed || "Immediately after accident"}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={injuryStyles.injuryLabel}>Initial Severity</Text>
            <Text style={injuryStyles.injuryValue}>{formatInjurySeverity(bruising.initialSeverity)}</Text>
          </View>
          
          <View style={injuryStyles.injuryRow}>
            <Text style={injuryStyles.injuryLabel}>Current Status</Text>
            <Text style={injuryStyles.injuryValue}>
              {bruising.currentSeverity === "4" 
                ? "Resolved" 
                : `${formatInjurySeverity(bruising.currentSeverity)}`}
            </Text>
          </View>
          
          {(bruising.currentSeverity === "4" || bruising.resolveDays) && (
            <View style={injuryStyles.injuryRow}>
              <Text style={injuryStyles.injuryLabel}>Resolution</Text>
              <Text style={injuryStyles.injuryValue}>
                {formatResolveDays(bruising.resolveDays)}
              </Text>
            </View>
          )}
          
          {bruising.hasVisibleScar && (
            <View style={injuryStyles.injuryRow}>
              <Text style={injuryStyles.injuryLabel}>Visible Scarring</Text>
              <Text style={injuryStyles.injuryValue}>Yes, visible scarring remains</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default BruisingSection;
