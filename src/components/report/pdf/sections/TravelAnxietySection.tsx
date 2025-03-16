
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { ReportData } from '@/types/reportTypes';
import { TravelAnxietyComponent } from './injury-components/TravelAnxietyComponent';

interface TravelAnxietySectionProps {
  reportData: ReportData;
  reportType: "claimant" | "expert";
}

export const TravelAnxietySection = ({ reportData, reportType = "expert" }: TravelAnxietySectionProps) => {
  if (!reportData.travelAnxiety?.hasAnxiety) {
    return null;
  }
  
  return (
    <View style={layoutStyles.sectionContainer}>
      <Text style={textStyles.sectionTitle}>Travel Anxiety</Text>
      
      <TravelAnxietyComponent 
        data={reportData.travelAnxiety} 
        reportType={reportType}
      />
    </View>
  );
};
