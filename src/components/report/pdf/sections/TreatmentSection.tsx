
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';

interface TreatmentSectionProps {
  reportData: ReportData;
}

export const TreatmentSection: React.FC<TreatmentSectionProps> = ({ reportData }) => {
  // Safely access treatment data with proper defaults
  const treatment = reportData.other?.treatment || {};
  const hasTreatment = treatment.hasTreatment || false;
  const treatmentType = Array.isArray(treatment.type) ? treatment.type : [];
  const treatmentFrequency = treatment.frequency || '';
  const treatmentDuration = treatment.duration || '';
  const treatmentOngoing = treatment.ongoing || false;
  const sceneOfAccidentTreatment = treatment.sceneOfAccidentTreatment || '';
  const wentToAE = treatment.wentToAE || '';
  const hospitalName = treatment.hospitalName || '';
  const wentToWalkInGP = treatment.wentToWalkInGP || '';
  const physiotherapySessions = treatment.physiotherapySessions || '';

  return (
    <View style={layoutStyles.section}>
      <Text style={textStyles.sectionHeader}>TREATMENT</Text>
      
      <View style={{margin: 5, padding: 5}}>
        {/* Treatment Overview */}
        <Text style={{fontSize: 10, marginBottom: 8}}>
          {hasTreatment 
            ? 'The claimant has sought medical attention for their injuries.'
            : 'The claimant has not sought any medical attention for their injuries.'}
        </Text>
        
        {/* Scene of Accident Treatment */}
        {sceneOfAccidentTreatment && (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            At the scene of the accident: {sceneOfAccidentTreatment}
          </Text>
        )}
        
        {/* Hospital Treatment */}
        {wentToAE === 'Yes' && (
          <>
            <Text style={{fontSize: 10, marginBottom: 8}}>
              The claimant attended {hospitalName || 'the hospital'} following the accident.
            </Text>
          </>
        )}
        
        {/* GP or Walk-in Treatment */}
        {wentToWalkInGP === 'Yes' && (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            The claimant visited their GP or a walk-in center after the accident.
          </Text>
        )}
        
        {/* Physiotherapy */}
        {physiotherapySessions && (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            The claimant has undergone {physiotherapySessions} physiotherapy session(s).
          </Text>
        )}
        
        {/* Treatment Details */}
        {hasTreatment && treatmentType.length > 0 && (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            Treatment type(s): {treatmentType.join(', ')}
          </Text>
        )}
        
        {/* Treatment Frequency and Duration */}
        {treatmentFrequency && (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            Treatment frequency: {treatmentFrequency}
          </Text>
        )}
        
        {treatmentDuration && (
          <Text style={{fontSize: 10, marginBottom: 8}}>
            Treatment duration: {treatmentDuration}
          </Text>
        )}
        
        {/* Ongoing Treatment */}
        <Text style={{fontSize: 10, marginBottom: 8}}>
          {treatmentOngoing 
            ? 'The claimant continues to receive treatment for their injuries.'
            : 'The claimant is no longer receiving treatment for their injuries.'}
        </Text>
      </View>
    </View>
  );
};
