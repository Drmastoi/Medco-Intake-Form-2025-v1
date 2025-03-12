
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

const ReportDocument = ({ data }: { data: ReportData }) => {
  // Prepare injuries data in the format expected by SummaryOfInjuriesSection
  const injuriesData = {
    neckPain: data.injuries.neckPain.hasInjury ? "1" : "2",
    shoulderPain: data.injuries.shoulderPain.hasInjury ? "1" : "2",
    shoulderSide: data.injuries.shoulderPain.side === "Right" ? "1" : 
                  data.injuries.shoulderPain.side === "Left" ? "2" : "3",
    backPain: data.injuries.backPain.hasInjury ? "1" : "2",
    backLocation: data.injuries.backPain.location,
    headache: data.injuries.headache.hasInjury ? "1" : "2",
    travelAnxiety: data.travelAnxiety.hasAnxiety ? "1" : "2",
    hasBruising: data.other.bruising.hasBruising ? "1" : "2",
    hasVisibleScar: "2" // Default value unless we have data for this
  };

  return (
    <Document>
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
        
        {/* Section 5: Statement of Instruction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Statement of Instruction</Text>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>
              This report is entirely independent and is prepared for the injuries sustained in the accident. The instructing party has requested an examination to be conducted with a report to include the nature and extent of the claimant's injuries, treatment received, effects on lifestyle and whether any further treatment is appropriate.
            </Text>
            <Text style={{...styles.summaryText, marginTop: 8}}>
              The report is produced for the Court based on the information provided by the client and the instructing party.
            </Text>
          </View>
        </View>
        
        {/* Section 6: Accident Information */}
        <CompactAccidentInfoSection data={data.accident} />
        
        {/* Section 7: Summary of Injuries */}
        <SummaryOfInjuriesSection data={injuriesData} />
        
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
};

export default ReportDocument;
