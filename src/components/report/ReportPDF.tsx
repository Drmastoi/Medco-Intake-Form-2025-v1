
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles as importedStyles } from './reportStyles';
import { formatDate } from '../../utils/dateUtils';
import { ClaimantDetailsSection } from './sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from './sections/ExpertDetailsSection';
import { InstructionDetailsSection } from './sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from './sections/AppointmentDetailsSection';
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
    padding: 20, // Reduced padding
    fontSize: 9, // Smaller base font size
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16, // Reduced font size
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  signatureSection: {
    marginTop: 15, // Reduced margin
    borderTop: 1,
    paddingTop: 8,
  },
  signatureText: {
    fontSize: 9,
    marginBottom: 3, // Reduced margin
    fontFamily: 'Helvetica',
  },
  text: {
    fontSize: 9,
    marginBottom: 4, // Reduced margin
    lineHeight: 1.3, // Reduced line height
    fontFamily: 'Helvetica',
  },
  compactText: {
    fontSize: 9,
    marginBottom: 4,
    lineHeight: 1.3,
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10, // Reduced bottom position
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    bottom: 5, // Reduced bottom position
    left: 20,
    fontSize: 6,
    color: '#666666',
    fontFamily: 'Helvetica',
  },
  sectionHeader: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 6, // Reduced padding
    marginBottom: 8,
    fontSize: 11, // Reduced font size
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  compactFieldRow: {
    flexDirection: 'row',
    marginBottom: 6, // Reduced margin
  },
  fieldColumn: {
    flex: 1,
    marginRight: 8, // Reduced margin
  },
  fieldLabel: {
    fontSize: 9,
    marginBottom: 2, // Reduced margin
    fontFamily: 'Helvetica',
  },
  compactFieldLabel: {
    fontSize: 8,
    marginBottom: 2,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  fieldValue: {
    fontSize: 9,
    padding: 4, // Reduced padding
    border: '1px solid #CCCCCC',
    minHeight: 16, // Reduced height
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  compactFieldValue: {
    fontSize: 9,
    padding: 3, // Reduced padding
    border: '1px solid #CCCCCC',
    minHeight: 14, // Reduced height
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  subsection: {
    marginTop: 8, // Reduced margin
    marginBottom: 10, // Reduced margin
  },
  compactSection: {
    marginTop: 6,
    marginBottom: 8,
  },
  tableHeader: {
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    padding: 4, // Reduced padding
    borderBottom: '1px solid #000000',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 9, // Reduced font size
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 4, // Reduced padding
    borderBottom: '1px solid #CCCCCC',
  },
  tableCell: {
    flex: 1,
    fontSize: 9, // Reduced font size
    fontFamily: 'Helvetica',
  },
  tableContainer: {
    border: '1px solid #000000',
    marginBottom: 10, // Reduced margin
  },
  grayBackground: {
    backgroundColor: '#EEEEEE',
    padding: 6, // Reduced padding
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
      <Text style={localStyles.footer} fixed>{name || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
    </>
  );

  return (
    <Document>
      <Page size="A4" style={localStyles.page}>
        <Text style={localStyles.title}>Expert Medical Report</Text>
        
        {/* Section 1 & 2: Claimant and Expert Details in the same row */}
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <View style={{ width: '50%', paddingRight: 8 }}>
            <ClaimantDetailsSection formData={formData} styles={localStyles} />
          </View>
          <View style={{ width: '50%' }}>
            <ExpertDetailsSection styles={localStyles} />
          </View>
        </View>
        
        {/* Section 3 & 4: Instruction and Appointment Details side by side */}
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <View style={{ width: '50%', paddingRight: 8 }}>
            <InstructionDetailsSection formData={formData} styles={localStyles} />
          </View>
          <View style={{ width: '50%' }}>
            <AppointmentDetailsSection formData={formData} styles={localStyles} />
          </View>
        </View>

        {/* Section 5: Statement of Instruction */}
        <StatementOfInstructionSection styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 6: Summary of Injuries */}
        <SummaryOfInjuriesTableSection formData={formData} styles={localStyles} />
        
        {/* Section 7: Accident Details */}
        <AccidentDetailsSection formData={formData} styles={localStyles} />

        {/* Section 8: Past Medical History */}
        <PastMedicalHistorySection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 9: Injuries / Symptoms */}
        <InjuriesSymptomsSection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>
      
      <Page size="A4" style={localStyles.page}>
        {/* Section 14: Examination */}
        <ExaminationSection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>
    </Document>
  );
};
