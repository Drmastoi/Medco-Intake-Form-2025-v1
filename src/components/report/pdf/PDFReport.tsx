
import React, { useState } from 'react';
import { 
  PDFDownloadLink, 
  PDFViewer,
  Document, 
  Page, 
  StyleSheet, 
  View 
} from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClaimantDetailsSection } from './sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from './sections/ExpertDetailsSection';
import { InstructionDetailsSection } from './sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from './sections/AppointmentDetailsSection';
import { AccidentDetailsSection } from './sections/AccidentDetailsSection';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
    padding: 20,
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
});

// Define the PDF Document component
const PDFDocument = ({ reportData }: { reportData: ReportData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <View style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Expert Medical Report
          </View>
        </View>
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
    </Page>
  </Document>
);

interface PDFReportProps {
  reportData: ReportData;
  isOpen: boolean;
  onClose: () => void;
}

// PDF Report Dialog Component
const PDFReport = ({ reportData, isOpen, onClose }: PDFReportProps) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Expert Medical Report</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 overflow-hidden">
          <div className="flex justify-end w-full space-x-2">
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
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
          
          <div className="w-full h-[70vh] border rounded">
            {loading && <div className="flex justify-center items-center h-full">Loading PDF preview...</div>}
            <PDFViewer 
              className="w-full h-full" 
              showToolbar={false}
              onLoadSuccess={handleLoad}
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
