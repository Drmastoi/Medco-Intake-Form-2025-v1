
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../../styles/pdfStyles';
import { TravelAnxietyData } from '@/types/reportTypes';
import { formatSeverity, formatResolveDays } from '../../utils/formatUtils';

export interface TravelAnxietyComponentProps {
  data: TravelAnxietyData;
  reportType: "claimant" | "expert";
}

export const TravelAnxietyComponent = ({ data, reportType }: TravelAnxietyComponentProps) => {
  if (!data.hasAnxiety) return null;
  
  return (
    <View style={pdfStyles.injurySection}>
      <View style={pdfStyles.injuryHeader}>
        <Text style={pdfStyles.injuryTitle}>Travel Anxiety</Text>
      </View>
      
      <View style={pdfStyles.injuryContent}>
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Symptoms:</Text>
          <Text style={pdfStyles.injuryValue}>
            {data.symptoms.join(', ')}
          </Text>
        </View>
        
        <View style={pdfStyles.injuryRow}>
          <Text style={pdfStyles.injuryLabel}>Currently Driving:</Text>
          <Text style={pdfStyles.injuryValue}>{data.currentlyDriving}</Text>
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
        
        {data.duration && (
          <View style={pdfStyles.injuryRow}>
            <Text style={pdfStyles.injuryLabel}>Duration:</Text>
            <Text style={pdfStyles.injuryValue}>{data.duration}</Text>
          </View>
        )}
        
        {reportType === "expert" && (
          <View style={pdfStyles.injuryRow}>
            <Text style={pdfStyles.injuryLabel}>Past History:</Text>
            <Text style={pdfStyles.injuryValue}>{data.pastHistory || "None"}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
