
import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { styles } from './PDFStyles';

// Import all section components
import { ClaimantDetailsSection } from './components/ClaimantDetailsSection';
import { ExpertDetailsSection } from './components/ExpertDetailsSection';
import { InstructionDetailsSection } from './components/InstructionDetailsSection';
import { AppointmentDetailsSection } from './components/AppointmentDetailsSection';
import { CompactAccidentInfoSection } from './components/CompactAccidentInfoSection';
import { SummaryOfInjuriesSection } from './components/SummaryOfInjuriesSection';
import { InjuriesAndSymptomsSection } from './components/InjuriesAndSymptomsSection';
import { TreatmentSection } from './components/TreatmentSection';
import { DailyLifeImpactSection } from './components/DailyLifeImpactSection';
import { ClinicalExaminationSection } from './components/ClinicalExaminationSection';
import { DeclarationSection } from './components/DeclarationSection';
import { PageFooter } from './components/PageFooter';

const ReportDocument = ({ data }: { data: ReportData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Expert Medical Report</Text>
      
      <ClaimantDetailsSection data={data.personal} accidentDate={data.accident.accidentDate} />
      <ExpertDetailsSection data={data.prefilled} />
      <InstructionDetailsSection data={data.prefilled} />
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
      
      <CompactAccidentInfoSection data={data.accident} />
      <SummaryOfInjuriesSection data={data.injuries} />
      <InjuriesAndSymptomsSection />
      <TreatmentSection />
      <DailyLifeImpactSection />
      <ClinicalExaminationSection />
      <DeclarationSection />
      
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
