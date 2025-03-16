
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';
import TravelAnxietyComponent from './injury-components/TravelAnxietyComponent';

interface TravelAnxietySectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const TravelAnxietySection = ({ reportData, reportType = "expert" }: TravelAnxietySectionProps) => {
  if (!reportData.travelAnxiety?.hasAnxiety) {
    return null;
  }
  
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 10 }]}>Travel Anxiety</Text>
      
      <TravelAnxietyComponent 
        data={reportData.travelAnxiety} 
        reportType={reportType}
      />
    </View>
  );
};

export default TravelAnxietySection;
