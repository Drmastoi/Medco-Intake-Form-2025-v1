
import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { AgreementSection } from '../sections/AgreementSection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';
import { colorScheme } from '../styles/colorScheme';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

interface DeclarationPageProps {
  claimantName: string;
  today: string;
}

const DeclarationPage: React.FC<DeclarationPageProps> = ({ 
  claimantName, 
  today 
}) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Declaration and Agreement
        </Text>
      </View>
      
      <View style={pdfStyles.section}>
        <View style={[pdfStyles.subsection, { marginBottom: spacing.xxl }]}>
          <Text style={pdfStyles.sectionHeader}>Statement of Truth</Text>
          
          <View style={{ 
            backgroundColor: colorScheme.altSectionBg, 
            padding: spacing.md,
            marginBottom: spacing.lg,
            borderRadius: 3
          }}>
            <Text style={{ 
              fontSize: typography.fontSize.md, 
              fontStyle: 'italic',
              marginBottom: spacing.md,
              color: colorScheme.textSecondary,
              textAlign: 'center'
            }}>
              This report has been prepared in accordance with the Civil Procedure Rules Part 35 and the expert's duty to the court.
            </Text>
          </View>
          
          <View style={{ marginBottom: spacing.md }}>
            <Text style={[pdfStyles.fieldValue, { marginBottom: spacing.md }]}>
              I understand that my overriding duty is to the court, both in preparing reports and in giving oral evidence. I
              have complied and will continue to comply with that duty.
            </Text>
            <Text style={[pdfStyles.fieldValue, { marginBottom: spacing.md }]}>
              I am aware of the requirements of Part 35 and practice direction 35, the protocol for instructing experts to
              give evidence in civil claims and the practice direction on pre-action conduct.
            </Text>
            <Text style={[pdfStyles.fieldValue, { marginBottom: spacing.md }]}>
              I have set out in my report that I understand from those instructing me to be the questions in respect of
              which my opinions as an expert are required.
            </Text>
            <Text style={[pdfStyles.fieldValue, { marginBottom: spacing.md }]}>
              I have done my best, in preparing this report, to be accurate and complete. I have mentioned all matters,
              which I regard as relevant to the opinions I have expressed. All of the matters on which I have expressed
              an opinion lie within my field of expertise.
            </Text>
            <Text style={[pdfStyles.fieldValue, { marginBottom: spacing.md }]}>
              I have drawn to the attention of the court all matters, of which I am aware, which might adversely affect my
              opinion. Wherever I have no personal knowledge, I have indicated the source if factual information.
            </Text>
            <Text style={pdfStyles.fieldValue}>
              I have not included anything in this report, which has been suggested to me by anyone, including the
              lawyers instructing me, without forming my own independent view of the matter.
            </Text>
          </View>
        </View>
        
        <View style={{ 
          borderTop: `1px solid ${colorScheme.borderLight}`,
          paddingTop: spacing.xl,
          marginTop: spacing.xl
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl }}>
            <View style={{ width: '48%' }}>
              <Text style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold, marginBottom: spacing.md }}>
                Expert's Declaration
              </Text>
              <Text style={{ fontSize: typography.fontSize.base, marginBottom: spacing.md }}>
                I confirm that I have made clear which facts and matters referred to in this report are within my own knowledge and which are not. Those that are within my own knowledge I confirm to be true. The opinions I have expressed represent my true and complete professional opinions on the matters to which they refer.
              </Text>
              <View style={{ marginTop: spacing.xl, borderTop: `1px dotted ${colorScheme.borderMedium}`, paddingTop: spacing.md }}>
                <Text style={{ fontSize: typography.fontSize.sm }}>Signature:</Text>
                <Text style={{ fontSize: typography.fontSize.sm, marginTop: spacing.xl, fontWeight: typography.fontWeight.bold }}>
                  Dr. Sam Smith
                </Text>
                <Text style={{ fontSize: typography.fontSize.sm }}>Date: {today}</Text>
              </View>
            </View>
            
            <View style={{ width: '48%' }}>
              <Text style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold, marginBottom: spacing.md }}>
                Statement of Compliance
              </Text>
              <Text style={{ fontSize: typography.fontSize.base, marginBottom: spacing.md }}>
                I understand that my duty is to help the court on matters within my expertise and that this duty overrides any obligation to those who have instructed me or by whom I am paid. I have complied and will continue to comply with this duty.
              </Text>
              <View style={{ 
                marginTop: spacing.md, 
                padding: spacing.md,
                backgroundColor: colorScheme.altSectionBg,
                borderRadius: 3
              }}>
                <Text style={{ fontSize: typography.fontSize.sm, fontStyle: 'italic' }}>
                  This report is based on the information available to me at the time of writing, including the medical records provided and the account given by the claimant.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      
      <PDFFooter pageNumber={4} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default DeclarationPage;
