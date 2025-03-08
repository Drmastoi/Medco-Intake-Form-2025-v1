
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
    padding: 15, // Further reduced padding
    fontSize: 8, // Smaller base font size
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 14, // Reduced font size
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  signatureSection: {
    marginTop: 10, // Reduced margin
    borderTop: 1,
    paddingTop: 6,
  },
  signatureText: {
    fontSize: 8,
    marginBottom: 2, // Reduced margin
    fontFamily: 'Helvetica',
  },
  text: {
    fontSize: 8,
    marginBottom: 3, // Reduced margin
    lineHeight: 1.2, // Reduced line height
    fontFamily: 'Helvetica',
  },
  compactText: {
    fontSize: 8,
    marginBottom: 3,
    lineHeight: 1.2,
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 8, // Reduced bottom position
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 7,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    bottom: 3, // Reduced bottom position
    left: 15,
    fontSize: 6,
    color: '#666666',
    fontFamily: 'Helvetica',
  },
  sectionHeader: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 4, // Reduced padding
    marginBottom: 6,
    fontSize: 9, // Reduced font size
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  compactFieldRow: {
    flexDirection: 'row',
    marginBottom: 4, // Reduced margin
  },
  fieldColumn: {
    flex: 1,
    marginRight: 5, // Reduced margin
  },
  fieldLabel: {
    fontSize: 8,
    marginBottom: 1, // Reduced margin
    fontFamily: 'Helvetica',
  },
  compactFieldLabel: {
    fontSize: 7,
    marginBottom: 1,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  fieldValue: {
    fontSize: 8,
    padding: 3, // Reduced padding
    border: '1px solid #CCCCCC',
    minHeight: 14, // Reduced height
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  compactFieldValue: {
    fontSize: 8,
    padding: 2, // Reduced padding
    border: '1px solid #CCCCCC',
    minHeight: 12, // Reduced height
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  subsection: {
    marginTop: 6, // Reduced margin
    marginBottom: 6, // Reduced margin
  },
  compactSection: {
    marginTop: 4,
    marginBottom: 6,
  },
  tableHeader: {
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    padding: 3, // Reduced padding
    borderBottom: '1px solid #000000',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 8, // Reduced font size
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 3, // Reduced padding
    borderBottom: '1px solid #CCCCCC',
  },
  tableCell: {
    flex: 1,
    fontSize: 8, // Reduced font size
    fontFamily: 'Helvetica',
  },
  tableContainer: {
    border: '1px solid #000000',
    marginBottom: 6, // Reduced margin
  },
  grayBackground: {
    backgroundColor: '#EEEEEE',
    padding: 4, // Reduced padding
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  halfColumn: {
    width: '50%',
    paddingRight: 4,
  },
  thirdColumn: {
    width: '33.33%',
    paddingRight: 3,
  },
  twoThirdsColumn: {
    width: '66.67%',
    paddingRight: 3,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 3,
    fontFamily: 'Helvetica-Bold',
  },
  subTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Helvetica-Bold',
  }
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
        
        {/* Top Section: 3 columns layout with Claimant, Expert, and Instruction Details */}
        <View style={localStyles.rowContainer}>
          <View style={localStyles.thirdColumn}>
            <ClaimantDetailsSection formData={formData} styles={localStyles} />
          </View>
          <View style={localStyles.thirdColumn}>
            <ExpertDetailsSection styles={localStyles} />
          </View>
          <View style={localStyles.thirdColumn}>
            <InstructionDetailsSection formData={formData} styles={localStyles} />
          </View>
        </View>
        
        {/* Section 4 & 5: Appointment Details and Statement of Instruction side by side */}
        <View style={localStyles.rowContainer}>
          <View style={localStyles.halfColumn}>
            <AppointmentDetailsSection formData={formData} styles={localStyles} />
          </View>
          <View style={localStyles.halfColumn}>
            <StatementOfInstructionSection styles={localStyles} />
          </View>
        </View>

        {/* Section 6: Summary of Injuries */}
        <SummaryOfInjuriesTableSection formData={formData} styles={localStyles} />
        
        {/* Section 7 & 8: Accident Details and Past Medical History side by side */}
        <View style={localStyles.rowContainer}>
          <View style={localStyles.halfColumn}>
            <AccidentDetailsSection formData={formData} styles={localStyles} />
          </View>
          <View style={localStyles.halfColumn}>
            <PastMedicalHistorySection formData={formData} styles={localStyles} />
          </View>
        </View>

        <PageFooter name={formData.fullName} />
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 9: Injuries / Symptoms */}
        <InjuriesSymptomsSection formData={formData} styles={localStyles} />
        
        {/* Section 14: Examination */}
        <ExaminationSection formData={formData} styles={localStyles} />

        <PageFooter name={formData.fullName} />
      </Page>
    </Document>
  );
};
