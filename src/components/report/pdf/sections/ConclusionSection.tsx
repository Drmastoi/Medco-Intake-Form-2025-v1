
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';

interface ConclusionSectionProps {
  reportType?: "claimant" | "expert";
}

const ConclusionSection = ({ reportType = "expert" }: ConclusionSectionProps) => {
  return (
    <View style={pdfStyles.sectionContainer}>
      <Text style={[textStyles.sectionTitle, { marginBottom: 10 }]}>Summary</Text>
      
      {reportType === "expert" ? (
        <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5, marginBottom: 20 }}>
          <Text style={[textStyles.regularText, { marginBottom: 10 }]}>
            Based on my medical examination and the information provided, I believe that the claimant's injuries are consistent with the accident as described. The prognosis for each injury has been provided in the relevant sections of this report.
          </Text>
          <Text style={textStyles.regularText}>
            In my opinion, no investigations or further referrals are necessary at this time, and the claimant should continue with the current treatment plan as outlined.
          </Text>
        </View>
      ) : (
        <View style={{ backgroundColor: colorScheme.altSectionBg, padding: 10, borderRadius: 5, marginBottom: 20 }}>
          <Text style={[textStyles.regularText, { marginBottom: 10 }]}>
            This report summarizes the information you have provided about your injuries and symptoms following your accident. It will be reviewed by a medical expert who will assess your condition and provide a professional opinion on your injuries.
          </Text>
          <Text style={textStyles.regularText}>
            The medical expert may contact you for additional information or to schedule an examination if necessary.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ConclusionSection;
