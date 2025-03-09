
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
  );
};
