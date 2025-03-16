
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { InjuriesData } from '@/types/reportTypes';
import { NeckPainComponent } from './injury-components/NeckPainComponent';
import { ShoulderPainComponent } from './injury-components/ShoulderPainComponent';
import { BackPainComponent } from './injury-components/BackPainComponent';
import { HeadacheComponent } from './injury-components/HeadacheComponent';

interface InjuriesSectionProps {
  injuries: InjuriesData;
  reportType: "claimant" | "expert";
}

export const InjuriesSection = ({ injuries, reportType }: InjuriesSectionProps) => {
  // Summary count of active injuries
  const activeInjuries = [
    injuries.neckPain.hasInjury,
    injuries.shoulderPain.hasInjury,
    injuries.backPain.hasInjury,
    injuries.headache.hasInjury
  ].filter(Boolean).length;
  
  return (
    <>
      <View style={layoutStyles.sectionContainer}>
        <Text style={textStyles.sectionTitle}>
          Summary of Injuries
        </Text>
        <Text style={textStyles.regularText}>
          The claimant reported {activeInjuries} types of injuries following the accident.
        </Text>
      </View>
      
      <View style={layoutStyles.sectionContainer}>
        <Text style={textStyles.sectionTitle}>
          Injuries Detail
        </Text>
        
        {injuries.neckPain.hasInjury && (
          <NeckPainComponent 
            data={injuries.neckPain} 
            reportType={reportType}
          />
        )}
        
        {injuries.shoulderPain.hasInjury && (
          <ShoulderPainComponent 
            data={injuries.shoulderPain} 
            reportType={reportType}
          />
        )}
        
        {injuries.backPain.hasInjury && (
          <BackPainComponent 
            data={injuries.backPain} 
            reportType={reportType}
          />
        )}
        
        {injuries.headache.hasInjury && (
          <HeadacheComponent 
            data={injuries.headache} 
            reportType={reportType}
          />
        )}
      </View>
    </>
  );
};
