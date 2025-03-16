
import React from 'react';
import { Text, View } from '@react-pdf/renderer';

interface ExpertCVSectionProps {
  styles: any;
}

export const ExpertCVSection = ({ styles }: ExpertCVSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Medical Expert's Curriculum Vitae</Text>
      
      <View style={{ marginTop: 10 }}>
        <Text style={styles.fieldLabel}>Professional Registration Details:</Text>
        <Text style={styles.fieldValue}>
          GMC: 6138189 - ICO registration: ZA526555 - Medco Reg: DME 8094 -
          MDDUS, BMA Member. Member independent doctors federation
        </Text>
      </View>
      
      <View style={{ marginTop: 10 }}>
        <Text style={styles.fieldLabel}>Qualification:</Text>
        <Text style={styles.fieldValue}>
          MBBS, Direct Medical Legal Expert, Urgent & Emergency Physician, OccuMed
        </Text>
      </View>
      
      <View style={{ marginTop: 10 }}>
        <Text style={styles.fieldLabel}>Experience:</Text>
        <Text style={styles.fieldValue}>
          I have completed medical-legal reports on time for over 1000 clients in last 3 years. My experience
          includes whiplash injuries from road traffic accidents, injuries due to occupational hazards, fitness to work
          assessments, and pre-employment testing. I have over 20 years of clinical experience in orthopaedics,
          medicine, surgery, emergency medicine, general practice, and occupational medicine.
        </Text>
      </View>
    </View>
  );
};
