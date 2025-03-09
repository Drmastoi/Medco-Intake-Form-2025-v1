
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
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>Expert Medical Report</Text>
        <Text style={pdfStyles.subheader}>Medco Whiplash Report - Confidential</Text>
      </View>
      
      {/* Two-column layout with improved spacing */}
      <View style={pdfStyles.twoColumnLayout}>
        {/* Left column */}
        <View style={pdfStyles.column}>
          {/* Section 1: Claimant Details */}
          <ClaimantDetailsSection formData={formData} styles={pdfStyles} />
        </View>
        
        {/* Right column */}
        <View style={pdfStyles.column}>
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
