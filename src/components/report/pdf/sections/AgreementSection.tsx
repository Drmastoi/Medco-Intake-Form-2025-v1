
import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    padding: 5,
    fontFamily: 'Helvetica-Bold',
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 20,
  },
  column: {
    width: '50%',
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  signatureImage: {
    width: 150,
    height: 50,
    marginTop: 5,
  },
  value: {
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  declarationItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  declarationText: {
    fontSize: 10,
    width: '90%',
    fontFamily: 'Helvetica',
  },
  yesText: {
    fontSize: 10,
    width: '10%',
    textAlign: 'right',
    fontFamily: 'Helvetica',
  }
});

interface AgreementSectionProps {
  claimantName?: string;
}

export const AgreementSection = ({ claimantName }: AgreementSectionProps) => {
  const today = format(new Date(), 'dd-MM-yyyy');
  
  return (
    <View style={styles.section} break>
      <Text style={styles.sectionTitle}>Section G</Text>
      
      <Text style={styles.subsectionTitle}>G.1 Agreement of Report :</Text>
      <Text style={styles.text}>
        I confirm that I have verified with the claimant the facts as referred to in this report
      </Text>
      
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Signature</Text>
          {/* Note: In a real implementation, you would want to use a dynamic signature image */}
          <View style={styles.signatureImage}>
            {/* Dummy signature representation */}
            <Text style={{ fontFamily: 'Helvetica-Oblique', fontSize: 20, color: '#444' }}>
              Dr. Signature
            </Text>
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{today}</Text>
        </View>
      </View>
      
      <Text style={styles.subsectionTitle}>G.2 Case Classification and Declaration :</Text>
      
      <Text style={styles.subsectionTitle}>G.2.1 Soft-tissue Injury Claim :</Text>
      
      <View style={styles.declarationItem}>
        <Text style={styles.declarationText}>Was the Claimant an occupant of a motor vehicle? :</Text>
        <Text style={styles.yesText}>Yes</Text>
      </View>
      
      <View style={styles.declarationItem}>
        <Text style={styles.declarationText}>Is the client's most significant injury a soft-tissue injury ?</Text>
        <Text style={styles.yesText}>Yes</Text>
      </View>
      
      <View style={styles.declarationItem}>
        <Text style={styles.declarationText}>Is this the first report in relation to the client's injuries from the index accident.</Text>
        <Text style={styles.yesText}>Yes</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>G.2.2 Declaration :</Text>
      
      <View style={styles.declarationItem}>
        <Text style={styles.declarationText}>I have not provided treatment to the claimant.</Text>
        <Text style={styles.yesText}>Yes</Text>
      </View>
      
      <View style={styles.declarationItem}>
        <Text style={styles.declarationText}>I am not associated with any person who has provided treatment.</Text>
        <Text style={styles.yesText}>Yes</Text>
      </View>
      
      <View style={styles.declarationItem}>
        <Text style={styles.declarationText}>I have not recommended any particular treatment provider.</Text>
        <Text style={styles.yesText}>Yes</Text>
      </View>
    </View>
  );
};
