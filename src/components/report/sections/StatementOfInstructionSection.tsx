
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface StatementOfInstructionSectionProps {
  styles: any;
  formData: ReportData;
}

export const StatementOfInstructionSection = ({ styles, formData }: StatementOfInstructionSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Statement of Instruction</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldValue}>
          I have been instructed by {formData.prefilled?.solicitorName || "the instructing party"} to examine {formData.personal?.fullName || "the claimant"} 
          and prepare a medico-legal report on the injuries sustained in a road traffic accident which occurred 
          on {formData.accident?.accidentDate || "[date not specified]"}. 
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldValue}>
          I have been asked to provide:
        </Text>
        <Text style={[styles.fieldValue, { marginLeft: 10, marginTop: 5 }]}>
          • A description of the injuries sustained
        </Text>
        <Text style={[styles.fieldValue, { marginLeft: 10 }]}>
          • An assessment of the severity and duration of these injuries
        </Text>
        <Text style={[styles.fieldValue, { marginLeft: 10 }]}>
          • A prognosis for recovery
        </Text>
        <Text style={[styles.fieldValue, { marginLeft: 10 }]}>
          • An opinion on the impact of the injuries on the claimant's lifestyle and activities
        </Text>
        <Text style={[styles.fieldValue, { marginLeft: 10 }]}>
          • An opinion on whether the injuries are consistent with the reported mechanism of the accident
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldValue}>
          I understand that this report may be used in connection with a personal injury claim for compensation
          and may be disclosed to the court. I am aware of my duty to the court as set out in Part 35 of the Civil
          Procedure Rules.
        </Text>
      </View>
    </View>
  );
};
