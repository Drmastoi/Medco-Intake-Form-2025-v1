
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../../styles/pdfStyles';
import { HeadacheDetails } from '@/types/reportTypes';
import { formatSeverity, formatResolveDays } from '../../utils/formatUtils';

export interface HeadacheComponentProps {
  data: HeadacheDetails;
  reportType: "claimant" | "expert";
}

export const HeadacheComponent = ({ data, reportType }: HeadacheComponentProps) => {
  if (!data.hasInjury) return null;
  
  return (
    <View style={pdfStyles.injurySection}>
      <View style={pdfStyles.injuryHeader}>
        <Text style={pdfStyles.injuryTitle}>Headache</Text>
      </View>
      
      <View style={pdfStyles.injuryContent}>
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Onset:</Text>
          <Text style={pdfStyles.injuryValue}>{data.start}</Text>
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
        
        {reportType === "expert" && data.pastHistory && (
          <View style={pdfStyles.injuryRow}>
            <Text style={pdfStyles.injuryLabel}>Past History:</Text>
            <Text style={pdfStyles.injuryValue}>{data.pastHistory}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
