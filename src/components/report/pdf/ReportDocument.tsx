
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

// Import summary of injuries section
import { SummaryOfInjuriesSection } from './components/SummaryOfInjuriesSection';

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
      
      {/* Statement of Instruction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statement of Instruction</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            This report is entirely independent and is prepared for the injuries sustained in the accident. The instructing party has requested an examination to be conducted with a report to include the nature and extent of the claimant's injuries, treatment received, effects on lifestyle and whether any further treatment is appropriate.
          </Text>
          <Text style={{...styles.summaryText, marginTop: 8}}>
            The report is produced for the Court based on the information provided by the client and the instructing party.
          </Text>
        </View>
      </View>
      
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
      
      {/* Section 6: Summary of Injuries */}
      <SummaryOfInjuriesSection data={data.injuries} />
      
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
