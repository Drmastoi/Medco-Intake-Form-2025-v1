
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { PersonalDetailsSection } from './PersonalDetailsSection';
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
  referenceBlock: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    border: '1 solid #cccccc',
    borderRadius: 4,
  },
  referenceRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  referenceLabel: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 10,
  },
  referenceValue: {
    width: '60%',
    fontSize: 10,
  }
});

export const ClaimantReportPDF = ({ formData }: { formData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>CLAIMANT SUMMARY REPORT</Text>
      
      <View style={styles.referenceBlock}>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>Claimant Name:</Text>
          <Text style={styles.referenceValue}>{formData.fullName || 'Not provided'}</Text>
        </View>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>Date of Birth:</Text>
          <Text style={styles.referenceValue}>{formData.dateOfBirth ? formatDate(formData.dateOfBirth) : 'Not provided'}</Text>
        </View>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>Solicitor Name:</Text>
          <Text style={styles.referenceValue}>{formData.solicitorName || 'Not provided'}</Text>
        </View>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>Solicitor Reference:</Text>
          <Text style={styles.referenceValue}>{formData.solicitorReference || 'Not provided'}</Text>
        </View>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>MedCo Reference:</Text>
          <Text style={styles.referenceValue}>{formData.medcoReference || 'Not provided'}</Text>
        </View>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>Instructing Party:</Text>
          <Text style={styles.referenceValue}>{formData.instructingPartyName || 'Not provided'}</Text>
        </View>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>Agency Reference:</Text>
          <Text style={styles.referenceValue}>{formData.instructingPartyReference || 'Not provided'}</Text>
        </View>
        <View style={styles.referenceRow}>
          <Text style={styles.referenceLabel}>Report Date:</Text>
          <Text style={styles.referenceValue}>{formatDate(new Date().toISOString())}</Text>
        </View>
      </View>
      
      <PersonalDetailsSection formData={formData} />
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
      <Text style={styles.footer} fixed>
        {formData.fullName || 'Anonymous'} - Summary Report
      </Text>
    </Page>
    
    <Page size="A4" style={styles.page}>
      <Text style={styles.subtitle}>Accident History</Text>
      <AccidentHistorySection formData={formData} />
      
      <Text style={styles.subtitle}>Impact on Daily Life</Text>
      <DailyLifeSection formData={formData} />
      
      <Text style={styles.subtitle}>Declaration</Text>
      <Text style={styles.text}>
        I confirm that all information provided in this report is true and accurate to the best of my knowledge.
      </Text>
      <Text style={styles.text}>
        Report Date: {formatDate(new Date().toISOString())}
      </Text>
      
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
