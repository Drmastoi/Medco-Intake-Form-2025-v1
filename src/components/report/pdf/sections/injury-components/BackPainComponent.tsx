
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../../styles/pdfStyles';
import { BackPainDetails } from '@/types/reportTypes';
import { formatSeverity, formatResolveDays } from '../../utils/formatUtils';

export interface BackPainComponentProps {
  data: BackPainDetails;
  reportType: "claimant" | "expert";
}

export const BackPainComponent = ({ data, reportType }: BackPainComponentProps) => {
  if (!data.hasInjury) return null;
  
  return (
    <View style={pdfStyles.injurySection}>
      <View style={pdfStyles.injuryHeader}>
        <Text style={pdfStyles.injuryTitle}>Back Pain</Text>
      </View>
      
      <View style={pdfStyles.injuryContent}>
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Location:</Text>
          <Text style={pdfStyles.injuryValue}>{data.location}</Text>
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
