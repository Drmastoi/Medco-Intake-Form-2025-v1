
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles as importedStyles } from './reportStyles';
import { formatDate } from '../../utils/dateUtils';
import { ClaimantDetailsSection } from './sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from './sections/ExpertDetailsSection';
import { StatementOfInstructionSection } from './sections/StatementOfInstructionSection';
import { SummaryOfInjuriesTableSection } from './sections/SummaryOfInjuriesTableSection';
import { AccidentDetailsSection } from './sections/AccidentDetailsSection';
import { PastMedicalHistorySection } from './sections/PastMedicalHistorySection';
import { InjuriesSymptomsSection } from './sections/InjuriesSymptomsSection';
import { ExaminationSection } from './sections/ExaminationSection';

// Create local styles extending the imported styles
const localStyles = StyleSheet.create({
  ...importedStyles,
  // Add additional styles needed for this component
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  signatureSection: {
    marginTop: 20,
    borderTop: 1,
    paddingTop: 10,
  },
  signatureText: {
    fontSize: 10,
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    fontSize: 6,
    color: '#666666',
    fontFamily: 'Helvetica',
  },
  sectionHeader: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 8,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  fieldColumn: {
    flex: 1,
    marginRight: 10,
  },
  fieldLabel: {
    fontSize: 10,
    marginBottom: 3,
    fontFamily: 'Helvetica',
  },
  fieldValue: {
    fontSize: 10,
    padding: 5,
    border: '1px solid #CCCCCC',
    minHeight: 20,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  subsection: {
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid #000000',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid #CCCCCC',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  tableContainer: {
    border: '1px solid #000000',
    marginBottom: 15,
  },
  grayBackground: {
    backgroundColor: '#EEEEEE',
    padding: 8,
  },
});

export const MedcoReport = ({ 
  formData,
  signature,
  signatureDate
}: { 
  formData: any;
  signature?: string;
  signatureDate?: string;
}) => {
  // Common footer component for all pages
  const PageFooter = ({ name }: { name: string }) => (
    <>
      <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
      <Text style={localStyles.footer} fixed>{name || 'Anonymous'} report dated {formData.dateOfReport ? formatDate(formData.dateOfReport) : formatDate(new Date().toISOString())} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
    </>
  );

  return (
    <Document>
      <Page size="A4" style={localStyles.page}>
        <Text style={localStyles.title}>Expert Medical Report</Text>
        
        {/* First page combines claimant details with instruction information */}
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            {/* Section 1: Claimant Details - takes 50% of the width */}
            <ClaimantDetailsSection formData={formData} styles={localStyles} />
          </View>
          
          <View style={{ flex: 1 }}>
            {/* Section 2: Expert Details - takes 50% of the width */}
            <ExpertDetailsSection styles={localStyles} />
          </View>
        </View>
        
        {/* Section 3: Statement of Instruction with solicitor details */}
        <StatementOfInstructionSection styles={localStyles} formData={formData} />
        
        <PageFooter name={formData.fullName} />
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 4: Summary of Injuries */}
        <SummaryOfInjuriesTableSection formData={formData} styles={localStyles} />
        
        {/* Section 5: Accident Details */}
        <AccidentDetailsSection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 6: Past Medical History */}
        <PastMedicalHistorySection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 7: Injuries / Symptoms */}
        <InjuriesSymptomsSection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>
      
      <Page size="A4" style={localStyles.page}>
        {/* Section 8: Examination */}
        <ExaminationSection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>
    </Document>
  );
};
