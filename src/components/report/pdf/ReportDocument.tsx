
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

// Import accident info section
import { CompactAccidentInfoSection } from './components/CompactAccidentInfoSection';
import { PageFooter } from './components/PageFooter';

const ReportDocument = ({ data }: { data: ReportData }) => (
  <Document>
    {/* Page 1: Basic information */}
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
      
      <PageFooter />
    </Page>

    {/* Page 2: Accident Details and More */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Expert Medical Report</Text>
      
      {/* Section 5: Accident Information */}
      <CompactAccidentInfoSection data={data.accident} />
      
      {/* Report identifier and page number */}
      <Text style={styles.reportIdentifier}>
        {data.personal.fullName} report dated {data.prefilled.dateOfReport} | Medical Report | CID 406679
      </Text>
      
      <Text style={styles.pageIndicator} render={({ pageNumber, totalPages }) => (
        `Page: ${pageNumber} of ${totalPages}`
      )} fixed />
      
      <PageFooter />
    </Page>
  </Document>
);

export default ReportDocument;
