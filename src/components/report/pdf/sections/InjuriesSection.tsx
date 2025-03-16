
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';
import NeckPainComponent from './injury-components/NeckPainComponent';
import ShoulderPainComponent from './injury-components/ShoulderPainComponent';
import BackPainComponent from './injury-components/BackPainComponent';
import HeadacheComponent from './injury-components/HeadacheComponent';

interface InjuriesSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const InjuriesSection = ({ reportData, reportType = "expert" }: InjuriesSectionProps) => {
  const hasAnyInjury = 
    reportData.injuries.neckPain?.hasInjury || 
    reportData.injuries.shoulderPain?.hasInjury || 
    reportData.injuries.backPain?.hasInjury || 
    reportData.injuries.headache?.hasInjury;

  if (!hasAnyInjury) {
    return (
      <View style={pdfStyles.sectionContainer}>
        <Text style={[textStyles.sectionTitle, { marginBottom: 10 }]}>Physical Injuries</Text>
        <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5 }}>
          <Text style={textStyles.regularText}>No physical injuries reported.</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 10 }]}>Physical Injuries</Text>
      
      {/* Neck Pain */}
      {reportData.injuries.neckPain?.hasInjury && (
        <NeckPainComponent 
          data={reportData.injuries.neckPain} 
          reportType={reportType}
        />
      )}
      
      {/* Shoulder Pain */}
      {reportData.injuries.shoulderPain?.hasInjury && (
        <ShoulderPainComponent 
          data={reportData.injuries.shoulderPain} 
          reportType={reportType}
        />
      )}
      
      {/* Back Pain */}
      {reportData.injuries.backPain?.hasInjury && (
        <BackPainComponent 
          data={reportData.injuries.backPain} 
          reportType={reportType}
        />
      )}
      
      {/* Headache */}
      {reportData.injuries.headache?.hasInjury && (
        <HeadacheComponent 
          data={reportData.injuries.headache} 
          reportType={reportType}
        />
      )}
    </View>
  );
};

export default InjuriesSection;
