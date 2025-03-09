
import { Document, Page, Text } from '@react-pdf/renderer';
import { AccidentHistorySection } from './AccidentHistorySection';
import { DailyLifeSection } from './DailyLifeSection';
import { CaseInformationSection } from './claimant/CaseInformationSection';
import { DeclarationSection } from './claimant/DeclarationSection';
import { ClaimantReportFooter } from './claimant/ClaimantReportFooter';
import { claimantReportStyles as styles } from './pdf/styles/claimantReportStyles';

export const ClaimantReportPDF = ({ 
  formData, 
  signature, 
  signatureDate 
}: { 
  formData: any; 
  signature?: string;
  signatureDate?: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>CLAIMANT SUMMARY REPORT</Text>
      
      {/* Case information section */}
      <CaseInformationSection formData={formData} />
      
      <Text style={styles.subtitle}>Accident History</Text>
      <AccidentHistorySection formData={formData} />
      
      <Text style={styles.subtitle}>Impact on Daily Life</Text>
      <DailyLifeSection formData={formData} />
      
      {/* Declaration and Signature */}
      <DeclarationSection 
        formData={formData} 
        signature={signature} 
        signatureDate={signatureDate} 
      />
      
      {/* Footer with page numbers */}
      <ClaimantReportFooter formData={formData} />
    </Page>
  </Document>
);
