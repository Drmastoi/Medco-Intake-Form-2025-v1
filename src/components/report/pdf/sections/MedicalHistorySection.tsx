
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';

interface MedicalHistorySectionProps {
  reportData: ReportData;
  reportType?: "claimant" | "expert";
}

const MedicalHistorySection = ({ reportData, reportType = "expert" }: MedicalHistorySectionProps) => {
  const medicalHistory = reportData.other?.medicalHistory;
  
  if (!medicalHistory) {
    return null;
  }
  
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 5 }]}>Medical History</Text>
      
      {medicalHistory.exceptionalInjuries ? (
        <View>
          <Text style={[textStyles.regularText, { marginBottom: 5, fontWeight: 'bold' }]}>
            Relevant pre-existing injuries or conditions:
          </Text>
          <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5 }}>
            <Text style={textStyles.regularText}>
              {medicalHistory.exceptionalInjuriesDetails || "Pre-existing conditions reported but no details provided"}
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5 }}>
          <Text style={textStyles.regularText}>No pre-existing injuries or medical conditions reported.</Text>
        </View>
      )}
    </View>
  );
};

export default MedicalHistorySection;
