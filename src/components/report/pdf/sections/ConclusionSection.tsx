
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';

export const ConclusionSection = () => {
  return (
    <View style={layoutStyles.sectionContainer}>
      <Text style={textStyles.sectionTitle}>Conclusion</Text>
      
      <Text style={textStyles.regularText}>
        Based on the claimant's account of the accident, their reported symptoms, and my clinical assessment,
        I conclude that the injuries described in this report are consistent with the mechanism of the accident
        as described, and represent the consequences of the accident.
      </Text>
      
      <Text style={textStyles.regularText}>
        I have provided an assessment of the injuries and their impact on the claimant's daily life, as well as
        a prognosis for recovery where appropriate. The opinions expressed in this report are my own and are
        based on my clinical experience and judgment.
      </Text>
      
      <Text style={textStyles.regularText}>
        I confirm that I have read the contents of this report and the opinions expressed are mine. I further
        confirm that this report complies with my duty to the court, including all matters that might affect
        the validity of this report.
      </Text>
      
      <Text style={textStyles.regularText}>
        I understand that this report may be disclosed to the court and other medical experts, but may not be
        disclosed to any other person without the court's permission.
      </Text>
    </View>
  );
};
