
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../../styles/pdfStyles';
import { InjuryDetails } from '@/types/reportTypes';
import { formatSeverity, formatResolveDays } from '../../utils/formatUtils';

export interface NeckPainComponentProps {
  data: InjuryDetails;
  reportType: "claimant" | "expert";
}

export const NeckPainComponent = ({ data, reportType }: NeckPainComponentProps) => {
  if (!data.hasInjury) return null;
  
  return (
    <View style={pdfStyles.injurySection}>
      <View style={pdfStyles.injuryHeader}>
        <Text style={pdfStyles.injuryTitle}>Neck Pain</Text>
      </View>
      
      <View style={pdfStyles.injuryContent}>
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
        
        {data.additionalInfo && (
          <View style={pdfStyles.injuryRow}>
            <Text style={pdfStyles.injuryLabel}>Additional Information:</Text>
            <Text style={pdfStyles.injuryValue}>{data.additionalInfo}</Text>
          </View>
        )}
        
        {reportType === "expert" && (
          <View style={pdfStyles.injuryRow}>
            <Text style={pdfStyles.injuryLabel}>Prior History:</Text>
            <Text style={pdfStyles.injuryValue}>{data.hadPrior ? "Yes" : "No"}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
