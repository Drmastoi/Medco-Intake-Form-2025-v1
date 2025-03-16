
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { InjuriesSection } from '../sections/InjuriesSection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';
import { colorScheme } from '../styles/colorScheme';

interface InjuriesPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
}

const InjuriesPage: React.FC<InjuriesPageProps> = ({ 
  reportData, 
  claimantName, 
  today 
}) => {
  // Count active injuries for summary
  const activeInjuries = [
    reportData.injuries.neckPain?.hasInjury, 
    reportData.injuries.backPain?.hasInjury,
    reportData.injuries.shoulderPain?.hasInjury,
    reportData.injuries.headache?.hasInjury,
    reportData.travelAnxiety?.hasAnxiety
  ].filter(Boolean).length;
  
  // Find the most severe injury
  const getSeverityLevel = (severity: string | undefined): number => {
    switch(severity) {
      case "Severe": return 3;
      case "Moderate": return 2;
      case "Mild": return 1;
      case "Resolved": return 0;
      default: return 0;
    }
  };
  
  const injuries = [
    { type: "Neck Pain", severity: reportData.injuries.neckPain?.initialSeverity, active: reportData.injuries.neckPain?.hasInjury },
    { type: "Back Pain", severity: reportData.injuries.backPain?.initialSeverity, active: reportData.injuries.backPain?.hasInjury },
    { type: "Shoulder Pain", severity: reportData.injuries.shoulderPain?.initialSeverity, active: reportData.injuries.shoulderPain?.hasInjury },
    { type: "Headache", severity: reportData.injuries.headache?.initialSeverity, active: reportData.injuries.headache?.hasInjury },
    { type: "Travel Anxiety", severity: reportData.travelAnxiety?.initialSeverity, active: reportData.travelAnxiety?.hasAnxiety }
  ].filter(injury => injury.active);
  
  const mostSevereInjury = injuries.reduce((prev, current) => {
    return (getSeverityLevel(current.severity) > getSeverityLevel(prev.severity)) ? current : prev;
  }, { type: "None", severity: "Resolved", active: false });

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
          Injuries Assessment
        </Text>
      </View>
      
      {/* Compact summary box highlighting key injury information */}
      <View style={{ 
        backgroundColor: colorScheme.altSectionBg, 
        margin: 8, 
        padding: 8, 
        borderRadius: 3,
        borderLeft: `3px solid ${colorScheme.accent}`
      }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4, color: colorScheme.primary }}>
          Injuries Summary
        </Text>
        
        {/* Two-column layout for injury summary */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <View style={{ flexDirection: 'row', marginBottom: 3 }}>
              <Text style={{ width: '50%', fontSize: 9, fontWeight: 'bold' }}>Injuries reported:</Text>
              <Text style={{ width: '50%', fontSize: 9 }}>{activeInjuries}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '50%', fontSize: 9, fontWeight: 'bold' }}>Most severe:</Text>
              <Text style={{ width: '50%', fontSize: 9 }}>{mostSevereInjury.type} ({mostSevereInjury.severity})</Text>
            </View>
          </View>
          
          <View style={{ width: '50%' }}>
            <View style={{ flexDirection: 'row', marginBottom: 3 }}>
              <Text style={{ width: '40%', fontSize: 9, fontWeight: 'bold' }}>Physical:</Text>
              <Text style={{ width: '60%', fontSize: 9 }}>
                {[
                  reportData.injuries.neckPain?.hasInjury ? "Neck" : null,
                  reportData.injuries.backPain?.hasInjury ? "Back" : null,
                  reportData.injuries.shoulderPain?.hasInjury ? "Shoulder" : null,
                  reportData.injuries.headache?.hasInjury ? "Headache" : null
                ].filter(Boolean).join(", ") || "None"}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '40%', fontSize: 9, fontWeight: 'bold' }}>Psychological:</Text>
              <Text style={{ width: '60%', fontSize: 9 }}>
                {reportData.travelAnxiety?.hasAnxiety ? "Travel Anxiety" : "None"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={pdfStyles.section}>
        <InjuriesSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <PDFFooter pageNumber={2} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default InjuriesPage;
