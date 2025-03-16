
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';
import { injuryStyles } from '../styles/injuryStyles';
import { NeckPainComponent } from './injury-components/NeckPainComponent';
import { ShoulderPainComponent } from './injury-components/ShoulderPainComponent';
import { BackPainComponent } from './injury-components/BackPainComponent';
import { HeadacheComponent } from './injury-components/HeadacheComponent';

interface InjuriesSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const InjuriesSection = ({ reportData, reportType = "expert" }: InjuriesSectionProps) => {
  // Check if any injuries exist
  const hasInjuries = 
    reportData.injuries?.neckPain?.hasInjury ||
    reportData.injuries?.shoulderPain?.hasInjury ||
    reportData.injuries?.backPain?.hasInjury ||
    reportData.injuries?.headache?.hasInjury;
    
  if (!hasInjuries) {
    return (
      <View style={pdfStyles.section}>
        <Text style={textStyles.sectionTitle}>Injuries Summary</Text>
        <Text style={textStyles.regularText}>No injuries reported in this accident.</Text>
      </View>
    );
  }
  
  return (
    <View style={pdfStyles.section}>
      <Text style={textStyles.sectionTitle}>Soft Tissue Injuries</Text>
      
      {reportData.injuries?.neckPain?.hasInjury && (
        <NeckPainComponent data={reportData.injuries.neckPain} reportType={reportType} />
      )}
      
      {reportData.injuries?.shoulderPain?.hasInjury && (
        <ShoulderPainComponent data={reportData.injuries.shoulderPain} reportType={reportType} />
      )}
      
      {reportData.injuries?.backPain?.hasInjury && (
        <BackPainComponent data={reportData.injuries.backPain} reportType={reportType} />
      )}
      
      {reportData.injuries?.headache?.hasInjury && (
        <HeadacheComponent data={reportData.injuries.headache} reportType={reportType} />
      )}
    </View>
  );
};

export default InjuriesSection;
