import React from 'react';
import { 
  Document, 
  Page, 
  View,
  Text,
  StyleSheet 
} from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { ClaimantDetailsSection } from '../sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from '../sections/ExpertDetailsSection';
import { InstructionDetailsSection } from '../sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from '../sections/AppointmentDetailsSection';
import { AccidentDetailsSection } from '../sections/AccidentDetailsSection';
import { InjuriesSection } from '../sections/InjuriesSection';
import { TreatmentSection } from '../sections/TreatmentSection';
import LifestyleImpactSection from '../sections/LifestyleImpactSection';
import { MedicalHistorySection } from '../sections/MedicalHistorySection';
import { BruisingSection } from '../sections/BruisingSection';
import { StatementOfInstructionSection } from '../../sections/StatementOfInstructionSection';
import { SummaryOfInjuriesTableSection } from '../../sections/SummaryOfInjuriesTableSection';
import { ConclusionSection } from '../sections/ConclusionSection';
import { AgreementSection } from '../sections/AgreementSection';
import { WriterInfoSection } from '../sections/WriterInfoSection';
import { MedicalRecordsReviewSection } from '../sections/MedicalRecordsReviewSection';
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

interface PDFFooterProps {
  pageNumber: number;
  claimantName: string;
  today: string;
}

const Footer = ({ pageNumber, claimantName, today }: PDFFooterProps) => (
  <View style={styles.footer} fixed>
    <Text>{claimantName}</Text>
    <Text style={styles.pageNumber}>Page {pageNumber}</Text>
    <Text>{today}</Text>
  </View>
);

interface PDFDocumentContentProps {
  reportData: ReportData;
}

const PDFDocumentContent = ({ reportData }: PDFDocumentContentProps) => {
  const today = format(new Date(), 'dd-MM-yyyy');
  const claimantName = reportData.personal?.fullName || 'Not specified';
  
  console.log("PDFDocumentContent rendering with lifestyle data:", 
    JSON.stringify(reportData.other?.lifestyle, null, 2));

  // Ensure lifestyle data exists
  if (!reportData.other) {
    console.error("Missing 'other' object in reportData");
    reportData.other = {
      bruising: { hasBruising: false },
      otherInjuries: { hasOtherInjury: false },
      treatment: { hasTreatment: false },
      lifestyle: {
        impactOnWork: false,
        impactOnSleep: false,
        impactOnDomestic: false,
        impactOnSports: false,
        impactOnSocial: false
      },
      medicalHistory: { exceptionalInjuries: false, exceptionalInjuriesDetails: "" }
    };
  } else if (!reportData.other.lifestyle) {
    console.error("Missing 'lifestyle' object in reportData.other");
    reportData.other.lifestyle = {
      impactOnWork: false,
      impactOnSleep: false,
      impactOnDomestic: false,
      impactOnSports: false,
      impactOnSocial: false
    };
  }

  // Ensure travelAnxiety has all required properties
  if (!reportData.travelAnxiety) {
    reportData.travelAnxiety = {
      hasAnxiety: false,
      initialSeverity: '',
      currentSeverity: '',
      symptoms: [],
      start: '',
      startDateEstimated: false,
      resolveDate: '',
      resolveDateEstimated: false,
      resolveDays: '',
      pastHistory: '',
      duration: '',
      hasHistory: '',
      currentlyDriving: ''
    };
  }

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
          <WriterInfoSection styles={styles} />
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
        
        <Footer pageNumber={1} claimantName={claimantName} today={today} />
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
        
        <Footer pageNumber={2} claimantName={claimantName} today={today} />
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
        
        {/* Section 10 - Lifestyle Impact */}
        <View style={styles.section}>
          <LifestyleImpactSection formData={reportData} />
        </View>
        
        {/* Medical Records Review Section */}
        <View style={styles.section}>
          <MedicalRecordsReviewSection styles={styles} />
        </View>
        
        <View style={styles.section}>
          <MedicalHistorySection formData={reportData} styles={styles} />
        </View>
        
        <View style={styles.section}>
          <ConclusionSection formData={reportData} styles={styles} />
        </View>
        
        <Footer pageNumber={3} claimantName={claimantName} today={today} />
      </Page>
      
      {/* Fourth Page - Declaration and Agreement */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Declaration and Agreement
          </Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.sectionHeader}>G.3 Statement of Truth</Text>
            <Text style={styles.fieldValue}>
              I understand that my overriding duty is to the court, both in preparing reports and in giving oral evidence. I
              have complied and will continue to comply with that duty.
            </Text>
            <Text style={styles.fieldValue}>
              I am aware of the requirements of Part 35 and practice direction 35, the protocol for instructing experts to
              give evidence in civil claims and the practice direction on pre-action conduct.
            </Text>
            <Text style={styles.fieldValue}>
              I have set out in my report that I understand from those instructing me to be the questions in respect of
              which my opinions as an expert are required.
            </Text>
            <Text style={styles.fieldValue}>
              I have done my best, in preparing this report, to be accurate and complete. I have mentioned all matters,
              which I regard as relevant to the opinions I have expressed. All of the matters on which I have expressed
              an opinion lie within my field of expertise.
            </Text>
            <Text style={styles.fieldValue}>
              I have drawn to the attention of the court all matters, of which I am aware, which might adversely affect my
              opinion. Wherever I have no personal knowledge, I have indicated the source if factual information.
            </Text>
            <Text style={styles.fieldValue}>
              I have not included anything in this report, which has been suggested to me by anyone, including the
              lawyers instructing me, without forming my own independent view of the matter.
            </Text>
            <Text style={styles.fieldValue}>
              Where, in my view, there is a range of reasonable opinion, I have indicated the extent of that range in the
              report.
            </Text>
            <Text style={styles.fieldValue}>
              At the time of signing the report I consider it to be complete and accurate. I will notify those instructing me
              if, for any reason, I subsequently consider that the report requires any correction or qualification.
            </Text>
            <Text style={styles.fieldValue}>
              I understand that this report will be evidence that I will give under oath, subject to any correction or
              qualification I may make before swearing to its veracity.
            </Text>
            <Text style={styles.fieldValue}>
              I have included in this report a summary of my instructions.
            </Text>
            <Text style={styles.fieldValue}>
              I have not entered into any agreement where the amount of payment of my fee is in any way dependant
              on the outcome of the case
            </Text>
            <Text style={styles.fieldValue}>
              I confirm that I have made clear which facts and matters referred to in this report are within my own
              knowledge and which are not. Those that are within my own knowledge I confirm to be true. The opinions I
              have expressed represent my true and complete professional opinions on the matters to which they refer.
            </Text>
            <Text style={styles.fieldValue}>
              I understand that proceedings for contempt of court may be brought against anyone who makes, or
              causes to be made, a false statement in a document verified by a statement of truth without an honest
              belief in its truth.
            </Text>
            <Text style={styles.fieldValue}>
              Date: {today}
            </Text>
          </View>
        </View>
        
        {/* Agreement Section */}
        <AgreementSection claimantName={claimantName} />
        
        <Footer pageNumber={4} claimantName={claimantName} today={today} />
      </Page>
    </Document>
  );
};

export default PDFDocumentContent;
