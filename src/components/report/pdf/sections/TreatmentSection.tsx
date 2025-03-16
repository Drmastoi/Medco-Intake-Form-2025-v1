
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';
import { tableStyles } from '../styles/tableStyles';

interface TreatmentSectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const TreatmentSection = ({ reportData, reportType = "expert" }: TreatmentSectionProps) => {
  const treatment = reportData.other?.treatment;
  
  if (!treatment || !treatment.hasTreatment) {
    return (
      <View style={pdfStyles.sectionContainer}>
        <Text style={[textStyles.sectionTitle, { marginBottom: 5 }]}>Treatment</Text>
        <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5 }}>
          <Text style={textStyles.regularText}>No treatment reported.</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 10 }]}>Treatment</Text>
      
      <View style={tableStyles.table}>
        {/* Emergency Treatment */}
        {treatment.sceneOfAccidentTreatment && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Emergency Treatment</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              <Text style={tableStyles.tableCell}>
                {treatment.sceneOfAccidentTreatment === 'Yes' 
                  ? `Received emergency treatment at scene: ${(treatment.sceneOfAccidentTreatmentTypes || []).join(', ')}` 
                  : 'No emergency treatment received at scene'}
              </Text>
            </View>
          </View>
        )}
        
        {/* Hospital Treatment */}
        {treatment.wentToAE && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Hospital Treatment</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              <Text style={tableStyles.tableCell}>
                {treatment.wentToAE === 'Yes' 
                  ? `Attended ${treatment.hospitalName || 'hospital'} for treatment: ${(treatment.hospitalTreatment || []).join(', ')}` 
                  : 'Did not attend hospital'}
              </Text>
            </View>
          </View>
        )}
        
        {/* GP Treatment */}
        {treatment.wentToWalkInGP && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>GP/Walk-in Treatment</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              <Text style={tableStyles.tableCell}>
                {treatment.wentToWalkInGP === 'Yes' 
                  ? `Visited GP/walk-in center ${treatment.daysBeforeGPVisit ? `${treatment.daysBeforeGPVisit} days after the accident` : ''}` 
                  : 'Did not visit GP/walk-in center'}
              </Text>
            </View>
          </View>
        )}
        
        {/* Current Treatment */}
        {treatment.type && treatment.type.length > 0 && (
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableCol1}>
              <Text style={tableStyles.tableHeader}>Current Treatment</Text>
            </View>
            <View style={tableStyles.tableCol2}>
              <Text style={tableStyles.tableCell}>
                {`${treatment.type.join(', ')}${treatment.frequency ? `, ${treatment.frequency}` : ''}${treatment.duration ? `, for ${treatment.duration}` : ''}`}
              </Text>
              {treatment.physiotherapySessions && (
                <Text style={tableStyles.tableCell}>
                  {`Physiotherapy sessions: ${treatment.physiotherapySessions}`}
                </Text>
              )}
              <Text style={tableStyles.tableCell}>
                {treatment.ongoing ? 'Treatment is ongoing' : 'Treatment has been completed'}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default TreatmentSection;
