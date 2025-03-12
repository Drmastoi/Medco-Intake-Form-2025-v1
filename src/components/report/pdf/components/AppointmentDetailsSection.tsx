
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { PrefilledData } from '@/types/reportTypes';
import { styles } from './PDFStyles';

interface AppointmentDetailsSectionProps {
  data: PrefilledData;
}

export const AppointmentDetailsSection: React.FC<AppointmentDetailsSectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 4 - Appointment Details</Text>
      
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>4.1 Date of Appointment</Text>
            <Text style={styles.infoCell}>
              {data.dateOfExamination} 11:30{'\n'}
              Method - Clinic
            </Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>4.2 Time spent</Text>
            <Text style={styles.rightCell}>{data.timeSpentWithClaimant} Minutes</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>4.3 Place of Examination</Text>
            <Text style={styles.infoCell}>
              {data.examinationLocation || "Blue Venue, Finchley Rd, London, England, UNITED KINGDOM"}
            </Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>4.4 Date of Report</Text>
            <Text style={styles.rightCell}>{data.dateOfReport}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
