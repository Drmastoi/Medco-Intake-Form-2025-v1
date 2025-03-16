
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../../styles/pdfStyles';
import { ShoulderPainDetails } from '@/types/reportTypes';
import { formatSeverity, formatResolveDays } from '../../utils/formatUtils';

export interface ShoulderPainComponentProps {
  data: ShoulderPainDetails;
  reportType: "claimant" | "expert";
}

export const ShoulderPainComponent = ({ data, reportType }: ShoulderPainComponentProps) => {
  if (!data.hasInjury) return null;
  
  const formatSide = (side: string) => {
    if (side === "both") return "Both sides";
    return side.charAt(0).toUpperCase() + side.slice(1) + " side";
  };
  
  return (
    <View style={pdfStyles.injurySection}>
      <View style={pdfStyles.injuryHeader}>
        <Text style={pdfStyles.injuryTitle}>Shoulder Pain</Text>
      </View>
      
      <View style={pdfStyles.injuryContent}>
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Affected Area:</Text>
          <Text style={pdfStyles.injuryValue}>{formatSide(data.side)}</Text>
        </View>
        
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Onset of Pain:</Text>
          <Text style={pdfStyles.injuryValue}>{data.painStart}</Text>
        </View>
        
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Initial Severity:</Text>
          <Text style={pdfStyles.injuryValue}>{formatSeverity(data.initialSeverity)}</Text>
        </View>
        
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Current Severity:</Text>
          <Text style={pdfStyles.injuryValue}>{formatSeverity(data.currentSeverity)}</Text>
        </View>
        
        {reportType === "expert" && data.resolveDays && (
          <View style={pdfStyles.injuryRow}>
            <Text style={pdfStyles.injuryLabel}>Expected Resolution:</Text>
            <Text style={pdfStyles.injuryValue}>{formatResolveDays(data.resolveDays)}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
