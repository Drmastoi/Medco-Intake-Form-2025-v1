
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { colorScheme } from '../styles/colorScheme';

interface AgreementSectionProps {
  reportType: "claimant" | "expert";
}

export const AgreementSection = ({ reportType }: AgreementSectionProps) => {
  return (
    <View style={layoutStyles.sectionContainer}>
      <Text style={textStyles.sectionTitle}>Statement of Truth</Text>
      
      {reportType === "expert" && (
        <>
          <Text style={textStyles.regularText}>
            I understand that my overriding duty is to the court and I have complied with that duty.
          </Text>
          
          <Text style={textStyles.regularText}>
            I am aware of the requirements of Part 35 of the Civil Procedure Rules, the accompanying practice direction and the protocol for instructing experts to give evidence in civil claims.
          </Text>
          
          <Text style={textStyles.regularText}>
            I confirm that I have made clear which facts and matters referred to in this report are within my own knowledge and which are not. Those that are within my own knowledge I confirm to be true. The opinions I have expressed represent my true and complete professional opinions on the matters to which they refer.
          </Text>
          
          <View style={{ marginTop: 20 }}>
            <Text style={textStyles.regularText}>
              Signed: <Text style={{ color: colorScheme.textDark, fontWeight: 'bold' }}>
                ______________________________
              </Text>
            </Text>
            <Text style={textStyles.smallText}>
              (Electronic signature)
            </Text>
          </View>
          
          <View style={{ marginTop: 10 }}>
            <Text style={textStyles.regularText}>
              Date: <Text style={{ color: colorScheme.textDark, fontWeight: 'bold' }}>
                ______________________________
              </Text>
            </Text>
            <Text style={textStyles.regularText}>
              
            </Text>
          </View>
        </>
      )}
      
      {reportType === "claimant" && (
        <>
          <Text style={textStyles.regularText}>
            I confirm that the contents of this report as they relate to my injuries, symptoms, treatment, and impact on my daily life are true and accurate to the best of my knowledge and belief.
          </Text>
          
          <Text style={textStyles.regularText}>
            I understand that this document may be used as evidence in legal proceedings relating to my claim.
          </Text>
          
          <View style={{ marginTop: 20 }}>
            <Text style={textStyles.regularText}>
              Signed: <Text style={{ color: colorScheme.textDark, fontWeight: 'bold' }}>
                ______________________________
              </Text>
            </Text>
            <Text style={textStyles.smallText}>
              (Electronic signature)
            </Text>
          </View>
          
          <View style={{ marginTop: 10 }}>
            <Text style={textStyles.regularText}>
              Date: <Text style={{ color: colorScheme.textDark, fontWeight: 'bold' }}>
                ______________________________
              </Text>
            </Text>
            <Text style={textStyles.regularText}>
              
            </Text>
          </View>
        </>
      )}
    </View>
  );
};
