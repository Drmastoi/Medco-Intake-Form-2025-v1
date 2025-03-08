
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { AccidentHistorySection } from './AccidentHistorySection';
import { DailyLifeSection } from './DailyLifeSection';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
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
  section: {
    marginBottom: 15,
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
  signatureLine: {
    borderBottom: 1,
    width: '60%',
    marginBottom: 10,
  },
  noteText: {
    marginTop: 10,
    fontSize: 10,
    fontFamily: 'Helvetica',
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
  instructionSection: {
    marginBottom: 15,
    border: '1px solid #CCCCCC',
    padding: 10,
    backgroundColor: '#F9F9F9',
  }
});

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
      <View style={styles.instructionSection}>
        <Text style={styles.subtitle}>Case Information</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Solicitor's Name</Text>
            <Text style={styles.fieldValue}>{formData.solicitorName || 'Not provided'}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Solicitor's Reference</Text>
            <Text style={styles.fieldValue}>{formData.solicitorReference || 'Not provided'}</Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Instructing Party</Text>
            <Text style={styles.fieldValue}>{formData.instructingPartyName || 'Not provided'}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Instructing Party Reference</Text>
            <Text style={styles.fieldValue}>{formData.instructingPartyReference || 'Not provided'}</Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Location of Examination</Text>
            <Text style={styles.fieldValue}>{formData.examinationLocation || 'Not provided'}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Medco Reference</Text>
            <Text style={styles.fieldValue}>{formData.medcoReference || 'Not provided'}</Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Date of Examination</Text>
            <Text style={styles.fieldValue}>{formData.dateOfExamination ? formatDate(formData.dateOfExamination) : 'Not provided'}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Date of Report</Text>
            <Text style={styles.fieldValue}>{formData.dateOfReport ? formatDate(formData.dateOfReport) : formatDate(new Date().toISOString())}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.subtitle}>Accident History</Text>
      <AccidentHistorySection formData={formData} />
      
      <Text style={styles.subtitle}>Impact on Daily Life</Text>
      <DailyLifeSection formData={formData} />
      
      <Text style={styles.subtitle}>Declaration</Text>
      <Text style={styles.text}>
        I confirm that all information provided in this report is true and accurate to the best of my knowledge.
      </Text>
      <Text style={styles.text}>
        Report Date: {formData.dateOfReport ? formatDate(formData.dateOfReport) : formatDate(new Date().toISOString())}
      </Text>
      
      {/* Signature Section */}
      <View style={styles.signatureSection}>
        <Text style={styles.signatureText}>Claimant Signature:</Text>
        {signature ? (
          <Text style={styles.signatureText}>{signature}</Text>
        ) : (
          <View style={styles.signatureLine} />
        )}
        
        <Text style={styles.signatureText}>
          Date and Time: {signatureDate ? formatDate(signatureDate) + ' ' + new Date(signatureDate).toLocaleTimeString() : '_________________'}
        </Text>
        
        <Text style={styles.noteText}>
          By signing above, I confirm my agreement with the submission of this report.
        </Text>
      </View>
      
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
      <Text style={styles.footer} fixed>
        {formData.fullName || 'Anonymous'} - Summary Report
      </Text>
    </Page>
  </Document>
);
