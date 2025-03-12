
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { PersonalData } from '@/types/reportTypes';
import { styles } from './PDFStyles';

interface ClaimantDetailsSectionProps {
  data: PersonalData;
  accidentDate: string;
}

export const ClaimantDetailsSection: React.FC<ClaimantDetailsSectionProps> = ({ data, accidentDate }) => {
  // Calculate age at time of incident (simple approximation)
  const getAgeAtIncident = () => {
    if (!data.dateOfBirth || !accidentDate) return "Not specified";
    
    try {
      const birthYear = parseInt(data.dateOfBirth.split('-')[0]);
      const accidentYear = parseInt(accidentDate.split('-')[0]);
      return `${accidentYear - birthYear} Years`;
    } catch (e) {
      return "Not specified";
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 1 - Claimant Details</Text>
      
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.1 Claimant's Name</Text>
            <Text style={styles.infoCell}>{data.fullName}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.2 Date of Birth</Text>
            <Text style={styles.rightCell}>{data.dateOfBirth}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.3 Address</Text>
            <Text style={styles.infoCell}>{data.address}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.4 Gender</Text>
            <Text style={styles.rightCell}>{data.gender}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.5 Age (At the time of the Incident)</Text>
            <Text style={styles.infoCell}>{getAgeAtIncident()}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.6 Date of Accident</Text>
            <Text style={styles.rightCell}>{accidentDate}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.7 Identification</Text>
            <Text style={styles.infoCell}>Passport</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.8 Accompanied by</Text>
            <Text style={styles.rightCell}>The claimant attended the appointment unaccompanied.</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>1.9 Interpreter</Text>
            <Text style={styles.infoCell}>Not Required</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.rightCell}></Text>
          </View>
        </View>
      </View>
    </View>
  );
};
