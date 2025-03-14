import React, { useState } from 'react';
import { 
  PDFDownloadLink, 
  PDFViewer,
  Document, 
  Page, 
  StyleSheet, 
  View,
  Text,
  Font 
} from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClaimantDetailsSection } from './sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from './sections/ExpertDetailsSection';
import { InstructionDetailsSection } from './sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from './sections/AppointmentDetailsSection';
import { AccidentDetailsSection } from './sections/AccidentDetailsSection';
import { InjuriesSection } from './sections/InjuriesSection';
import { TreatmentSection } from './sections/TreatmentSection';
import { LifestyleImpactSection } from './sections/LifestyleImpactSection';
import { MedicalHistorySection } from './sections/MedicalHistorySection';
import { BruisingSection } from './sections/BruisingSection';
import { StatementOfInstructionSection } from '../../report/sections/StatementOfInstructionSection';
import { SummaryOfInjuriesTableSection } from '../../report/sections/SummaryOfInjuriesTableSection';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
    padding: 20,
    paddingBottom: 60, // Add padding at the bottom for the footer
  },
  header: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    border: '1px solid #ddd',
  },
  sectionHeader: {
    borderBottom: '2px solid #000',
    paddingBottom: 5,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  subsection: {
    marginBottom: 15,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fieldColumn: {
    flex: 1,
    marginRight: 10,
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 10,
  },
  disclaimerText: {
    fontSize: 8,
    marginTop: 10,
    fontStyle: 'italic',
  },
  pageBreak: {
    height: 0,
    pageBreakAfter: 'always',
  },
  summaryText: {
    fontSize: 9,
    marginTop: 10,
    fontStyle: 'italic',
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 3,
  },
  // New table styles
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  tableCell: {
    fontSize: 9,
    textAlign: 'left',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'center',
    paddingTop: 10,
    borderTop: '1px solid #ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#555',
  },
  pageNumber: {
    fontSize: 8,
    color: '#555',
  },
});

// Define the PDF Document component with footer
const PDFDocument = ({ reportData }: { reportData: ReportData }) => {
  const today = format(new Date(), 'dd-MM-yyyy');
  const claimantName = reportData.personal?.fullName || 'Not specified';
  
  // Function to create a footer component
  const Footer = ({ pageNumber }: { pageNumber: number }) => (
    <View style={styles.footer} fixed>
      <Text>{claimantName}</Text>
      <Text style={styles.pageNumber}>Page {pageNumber}</Text>
      <Text>{today}</Text>
    </View>
  );

  return (
    <Document>
      {/* First Page - Basic Information */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Expert Medical Report
          </Text>
        </View>
        
        <View style={styles.section}>
          <ClaimantDetailsSection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <ExpertDetailsSection styles={styles} formData={reportData} />
        </View>
        
        <View style={styles.section}>
          <InstructionDetailsSection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <AppointmentDetailsSection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <AccidentDetailsSection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <SummaryOfInjuriesTableSection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <StatementOfInstructionSection styles={styles} formData={reportData} />
        </View>
        
        <Footer pageNumber={1} />
      </Page>

      {/* Second Page - Injuries */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Injuries
          </Text>
        </View>
        
        <View style={styles.section}>
          <InjuriesSection formData={reportData} styles={styles} />
        </View>
        
        <Footer pageNumber={2} />
      </Page>
      
      {/* Third Page - Treatment, Lifestyle Impact, Medical History */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Treatment, Lifestyle Impact and Medical History
          </Text>
        </View>
        
        {/* Section 9 - Treatment */}
        <View style={styles.section}>
          <TreatmentSection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <LifestyleImpactSection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <MedicalHistorySection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.sectionHeader}>Expert Declaration</Text>
            <Text style={styles.fieldValue}>
              I, {reportData.prefilled.expertName}, declare that the content of this report is true to the best of my knowledge and belief. I understand that this report is to be submitted as expert evidence. I confirm that I have no conflict of interest in this case.
            </Text>
            <Text style={styles.fieldValue}>
              Date: {today}
            </Text>
          </View>
        </View>
        
        <Footer pageNumber={3} />
      </Page>
    </Document>
  );
};

interface PDFReportProps {
  reportData: ReportData;
  isOpen: boolean;
  onClose: () => void;
  isPreview?: boolean;
}

// PDF Report Dialog Component
const PDFReport = ({ reportData, isOpen, onClose, isPreview = false }: PDFReportProps) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const dialogTitle = isPreview ? "Preview Medical Report" : "Expert Medical Report";
  const closeButtonText = isPreview ? "Close Preview" : "Close";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 overflow-hidden">
          <div className="flex justify-end w-full space-x-2">
            {!isPreview && (
              <PDFDownloadLink 
                document={<PDFDocument reportData={reportData} />} 
                fileName="medical-report.pdf"
                className="hidden md:block"
              >
                {({ blob, url, loading, error }) => (
                  <Button 
                    variant="outline" 
                    disabled={loading || error !== undefined}
                  >
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
            <Button variant="outline" onClick={onClose}>{closeButtonText}</Button>
          </div>
          
          <div className="w-full h-[70vh] border rounded">
            {loading && <div className="flex justify-center items-center h-full">Loading PDF preview...</div>}
            <PDFViewer 
              className="w-full h-full" 
              showToolbar={false}
            >
              <PDFDocument reportData={reportData} />
            </PDFViewer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFReport;
