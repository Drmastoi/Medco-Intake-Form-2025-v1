
import { Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from './reportPdfStyles';
import { ClaimantDetailsSection } from '../sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from '../sections/ExpertDetailsSection';
import { StatementOfInstructionSection } from '../sections/StatementOfInstructionSection';
import { PageFooter } from './PageFooter';

interface FirstPageProps {
  formData: any;
}

export const FirstPage = ({ formData }: FirstPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.reportHeader}>
        <Text style={pdfStyles.reportTitle}>Expert Medical Report</Text>
        <Text style={pdfStyles.reportSubtitle}>Medco Whiplash Report - Confidential</Text>
      </View>
      
      {/* Enhanced two-column layout with better spacing */}
      <View style={pdfStyles.mainContent}>
        {/* Left column */}
        <View style={pdfStyles.leftColumn}>
          {/* Section 1: Claimant Details */}
          <ClaimantDetailsSection formData={formData} styles={pdfStyles} />
        </View>
        
        {/* Right column */}
        <View style={pdfStyles.rightColumn}>
          {/* Section 2: Expert Details */}
          <ExpertDetailsSection styles={pdfStyles} />
          
          {/* Section 3: Statement of Instruction with solicitor details */}
          <StatementOfInstructionSection styles={pdfStyles} formData={formData} />
        </View>
      </View>
      
      <PageFooter name={formData.fullName} formData={formData} />
    </Page>
  );
};
