
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';

interface AgreementSectionProps {
  claimantName: string;
  today: string;
  reportType?: "claimant" | "expert";
}

const AgreementSection = ({ claimantName, today, reportType = "expert" }: AgreementSectionProps) => {
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 10 }]}>Declaration</Text>
      
      {reportType === "expert" ? (
        // Expert declaration
        <View style={pdfStyles.section}>
          <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5, marginBottom: 20 }}>
            <Text style={[textStyles.regularText, { marginBottom: 10 }]}>
              I confirm that I understand my duty to the court as set out in Part 35 of the Civil 
              Procedure Rules and the Practice Direction, and I have complied with that duty.
            </Text>
            <Text style={[textStyles.regularText, { marginBottom: 10 }]}>
              I confirm that I am aware of the requirements of Part 35, the practice direction and the 
              protocol for instructing experts to give evidence in civil claims.
            </Text>
            <Text style={textStyles.regularText}>
              I confirm that I have made clear which facts and matters referred to in this report are 
              within my own knowledge and which are not. Those that are within my own knowledge I 
              confirm to be true. The opinions I have expressed represent my true and complete 
              professional opinions on the matters to which they refer.
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ width: '45%' }}>
              <Text style={[textStyles.regularText, { fontWeight: 'bold' }]}>Signed:</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: colorScheme.text, marginTop: 20, marginBottom: 5 }} />
              <Text style={textStyles.smallText}>Medical Expert</Text>
            </View>
            <View style={{ width: '45%' }}>
              <Text style={[textStyles.regularText, { fontWeight: 'bold' }]}>Date:</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: colorScheme.text, marginTop: 20, marginBottom: 5 }}>
                <Text style={[textStyles.regularText, { paddingBottom: 2 }]}>{today}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        // Claimant declaration
        <View style={pdfStyles.section}>
          <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5, marginBottom: 20 }}>
            <Text style={[textStyles.regularText, { marginBottom: 10 }]}>
              I confirm that the information I have provided in this questionnaire is true and 
              accurate to the best of my knowledge and belief.
            </Text>
            <Text style={textStyles.regularText}>
              I understand that this information will be used to prepare a medical report regarding 
              my injuries, and I consent to it being shared with the medical expert.
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ width: '45%' }}>
              <Text style={[textStyles.regularText, { fontWeight: 'bold' }]}>Signed:</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: colorScheme.text, marginTop: 20, marginBottom: 5 }} />
              <Text style={textStyles.smallText}>{claimantName}</Text>
            </View>
            <View style={{ width: '45%' }}>
              <Text style={[textStyles.regularText, { fontWeight: 'bold' }]}>Date:</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: colorScheme.text, marginTop: 20, marginBottom: 5 }}>
                <Text style={[textStyles.regularText, { paddingBottom: 2 }]}>{today}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AgreementSection;
