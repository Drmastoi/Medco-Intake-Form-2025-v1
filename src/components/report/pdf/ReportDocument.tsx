
import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import { ReportData } from '@/utils/pdfReportUtils';

// Import component styles
import { styles } from './components/PDFStyles';

// Import component sections
import { CaseInfoSection } from './components/CaseInfoSection';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { AccidentInfoSection } from './components/AccidentInfoSection';
import { InjurySection } from './components/InjurySection';
import { PsychologicalSection } from './components/PsychologicalSection';
import { MedicalHistorySection } from './components/MedicalHistorySection';
import { DeclarationSection } from './components/DeclarationSection';
import { PageFooter, ReportFooter } from './components/PageFooter';

const ReportDocument = ({ data }: { data: ReportData }) => (
  <Document>
    {/* Page 1: Case Information, Personal Information, and Accident Information */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Medical Assessment Report</Text>
      
      {/* Section 1: Prefilled Details */}
      <CaseInfoSection data={data.prefilled} />
      
      {/* Section 2: Personal Information */}
      <PersonalInfoSection data={data.personal} />

      {/* Section 3: Accident Details */}
      <AccidentInfoSection data={data.accident} />

      <PageFooter />
    </Page>

    {/* Page 2: Injury Assessment */}
    <Page size="A4" style={styles.page}>
      {/* Sections 3-5: Injuries Information */}
      <InjurySection data={data.injuries} />

      <PageFooter />
    </Page>

    {/* Page 3: Psychological Assessment, Medical History, and Declaration */}
    <Page size="A4" style={styles.page}>
      {/* Sections 6-7: Headache and Travel Anxiety */}
      <PsychologicalSection 
        headache={data.injuries.headache} 
        travelAnxiety={data.travelAnxiety} 
      />
      
      {/* Section 13: Medical History Information */}
      <MedicalHistorySection data={data.other} />
      
      {/* Declaration */}
      <DeclarationSection reportDate={data.prefilled.dateOfReport} />

      <ReportFooter />
      <PageFooter />
    </Page>
  </Document>
);

export default ReportDocument;
