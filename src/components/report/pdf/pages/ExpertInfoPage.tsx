
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';

interface ExpertInfoPageProps {
  claimantName: string;
  today: string;
}

const ExpertInfoPage: React.FC<ExpertInfoPageProps> = ({ 
  claimantName, 
  today 
}) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Expert Qualifications and Experience
        </Text>
      </View>
      
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionHeader}>Curriculum Vitae</Text>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={[pdfStyles.fieldLabel, { fontSize: 14 }]}>Dr. Awais Iqbal</Text>
          <Text style={pdfStyles.fieldValue}>Consultant in General Practice</Text>
          <Text style={pdfStyles.fieldValue}>GMC: 6138189</Text>
          <Text style={pdfStyles.fieldValue}>MedCo: DME 8094</Text>
        </View>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={[pdfStyles.fieldLabel, { fontSize: 12 }]}>Qualifications</Text>
          <Text style={pdfStyles.fieldValue}>MBBS - King's College London (2008)</Text>
          <Text style={pdfStyles.fieldValue}>MRCGP - Royal College of General Practitioners (2013)</Text>
          <Text style={pdfStyles.fieldValue}>Diploma in Medical Law - University of Glasgow (2015)</Text>
        </View>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={[pdfStyles.fieldLabel, { fontSize: 12 }]}>Experience</Text>
          <Text style={pdfStyles.fieldValue}>• 10+ years of experience in General Practice</Text>
          <Text style={pdfStyles.fieldValue}>• 8+ years of experience in Medico-Legal reporting</Text>
          <Text style={pdfStyles.fieldValue}>• Special interest in musculoskeletal injuries and rehabilitation</Text>
          <Text style={pdfStyles.fieldValue}>• Over 2,000 medico-legal reports prepared for personal injury cases</Text>
        </View>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={[pdfStyles.fieldLabel, { fontSize: 12 }]}>Current Appointments</Text>
          <Text style={pdfStyles.fieldValue}>• Consultant GP at City Medical Practice, Manchester</Text>
          <Text style={pdfStyles.fieldValue}>• Medical Director at UK MedLegal Reporting Services</Text>
          <Text style={pdfStyles.fieldValue}>• Honorary Clinical Lecturer, University of Manchester Medical School</Text>
        </View>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={[pdfStyles.fieldLabel, { fontSize: 12 }]}>Professional Memberships</Text>
          <Text style={pdfStyles.fieldValue}>• General Medical Council (GMC)</Text>
          <Text style={pdfStyles.fieldValue}>• Royal College of General Practitioners (RCGP)</Text>
          <Text style={pdfStyles.fieldValue}>• Medical Protection Society (MPS)</Text>
          <Text style={pdfStyles.fieldValue}>• Expert Witness Institute (EWI)</Text>
        </View>
        
        <View style={{ marginTop: 20 }}>
          <Text style={pdfStyles.fieldValue}>
            I confirm that I have undergone appropriate training in the preparation of medico-legal reports
            and in the Civil Procedure Rules. I understand my duty to the court as an expert witness and have
            complied with that duty.
          </Text>
        </View>
      </View>
      
      <PDFFooter pageNumber={5} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default ExpertInfoPage;
