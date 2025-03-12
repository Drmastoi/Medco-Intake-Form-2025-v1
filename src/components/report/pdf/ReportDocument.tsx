
import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/utils/pdfReportUtils';

// Import component styles
import { styles } from './components/PDFStyles';

// Import updated component sections
import { ClaimantDetailsSection } from './components/ClaimantDetailsSection';
import { ExpertDetailsSection } from './components/ExpertDetailsSection';
import { InstructionDetailsSection } from './components/InstructionDetailsSection';
import { AppointmentDetailsSection } from './components/AppointmentDetailsSection';

// Import other existing sections
import { AccidentInfoSection } from './components/AccidentInfoSection';
import { InjurySection } from './components/InjurySection';
import { PsychologicalSection } from './components/PsychologicalSection';
import { MedicalHistorySection } from './components/MedicalHistorySection';
import { DeclarationSection } from './components/DeclarationSection';
import { PageFooter, ReportFooter } from './components/PageFooter';
import { CompactAccidentInfoSection } from './components/CompactAccidentInfoSection';

const ReportDocument = ({ data }: { data: ReportData }) => (
  <Document>
    {/* Page 1: Compact format without accident details */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Expert Medical Report</Text>
      
      {/* Section 1: Claimant Details */}
      <ClaimantDetailsSection 
        data={data.personal} 
        accidentDate={data.accident.accidentDate} 
      />
      
      {/* Section 2: Expert Details */}
      <ExpertDetailsSection data={data.prefilled} />
      
      {/* Section 3: Instruction Details */}
      <InstructionDetailsSection data={data.prefilled} />
      
      {/* Section 4: Appointment Details */}
      <AppointmentDetailsSection data={data.prefilled} />
      
      {/* Report identifier and page number */}
      <Text style={styles.reportIdentifier}>
        {data.personal.fullName} report dated {data.prefilled.dateOfReport} | Medical Report | CID 406679
      </Text>
      
      <Text style={styles.pageIndicator} render={({ pageNumber, totalPages }) => (
        `Page: ${pageNumber} of ${totalPages}`
      )} fixed />
    </Page>

    {/* Page 2: Accident Details and Injury Assessment */}
    <Page size="A4" style={styles.page}>
      {/* Section 5: Accident Information (moved from page 1) */}
      <CompactAccidentInfoSection data={data.accident} />
      
      {/* Section 6: Injuries Information */}
      <InjurySection data={data.injuries} />

      <PageFooter />
    </Page>

    {/* Page 3: Psychological Assessment, Medical History, and Declaration */}
    <Page size="A4" style={styles.page}>
      {/* Section 7-8: Headache and Travel Anxiety */}
      <PsychologicalSection 
        headache={data.injuries.headache} 
        travelAnxiety={data.travelAnxiety} 
      />
      
      {/* Section 9: Medical History Information */}
      <MedicalHistorySection data={data.other} />
      
      {/* Declaration */}
      <DeclarationSection reportDate={data.prefilled.dateOfReport} />

      <ReportFooter />
      <PageFooter />
    </Page>
  </Document>
);

export default ReportDocument;
