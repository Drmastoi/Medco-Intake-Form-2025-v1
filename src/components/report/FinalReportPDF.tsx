
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from './pdf/reportPdfStyles';
import { ClaimantDetailsSection } from './sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from './sections/ExpertDetailsSection';
import { StatementOfInstructionSection } from './sections/StatementOfInstructionSection';
import { SummaryOfInjuriesTableSection } from './sections/SummaryOfInjuriesTableSection';
import { AccidentDetailsSection } from './sections/AccidentDetailsSection';
import { InjuriesSymptomsSection } from './sections/InjuriesSymptomsSection';
import { PageFooter } from './pdf/PageFooter';
import { DailyLifeSection } from './DailyLifeSection';

export const FinalReportPDF = ({ 
  formData, 
  signature, 
  signatureDate 
}: { 
  formData: any;
  signature?: string;
  signatureDate?: string;
}) => {
  return (
    <Document>
      {/* First Page - Cover and Introduction */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.reportHeader}>
          <Text style={pdfStyles.reportTitle}>Final Medical Expert Report</Text>
          <Text style={pdfStyles.reportSubtitle}>Medco Whiplash Report - Confidential</Text>
        </View>
        
        {/* Single column layout containing all sections */}
        <View style={pdfStyles.singleColumnContent}>
          {/* Section 1: Expert Details */}
          <ExpertDetailsSection styles={pdfStyles} />
          
          {/* Section 2: Claimant Details */}
          <ClaimantDetailsSection formData={formData} styles={pdfStyles} />
          
          {/* Section 3: Statement of Instruction */}
          <StatementOfInstructionSection styles={pdfStyles} formData={formData} />
        </View>
        
        <PageFooter name={formData.fullName} formData={formData} />
      </Page>

      {/* Second Page - Injuries Summary */}
      <Page size="A4" style={pdfStyles.page}>
        {/* Section 4: Summary of Injuries */}
        <SummaryOfInjuriesTableSection formData={formData} styles={pdfStyles} />
        
        {/* Section 5: Accident Details */}
        <AccidentDetailsSection formData={formData} styles={pdfStyles} />

        <PageFooter name={formData.fullName} formData={formData} />
      </Page>

      {/* Third Page - Daily Life Impact */}
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.sectionHeader}>Section 6 - Daily Life Impact & Expert Assessment</Text>
        
        <View style={pdfStyles.subsection}>
          <DailyLifeSection formData={formData} />
        </View>

        <PageFooter name={formData.fullName} formData={formData} />
      </Page>

      {/* Fourth Page - Injuries/Symptoms */}
      <Page size="A4" style={pdfStyles.page}>
        {/* Section 7: Injuries / Symptoms */}
        <InjuriesSymptomsSection formData={formData} styles={pdfStyles} />

        <PageFooter name={formData.fullName} formData={formData} />
      </Page>
    </Document>
  );
};
