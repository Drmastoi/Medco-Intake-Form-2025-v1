
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { InjuriesData } from '@/types/reportTypes';

interface SummaryOfInjuriesSectionProps {
  data: InjuriesData;
}

export const SummaryOfInjuriesSection = ({ data }: SummaryOfInjuriesSectionProps) => {
  // Create an array of injuries to display in the table
  const injuries = [
    {
      name: 'Neck Pain',
      currentStatus: data.neckPain.hasInjury ? data.neckPain.currentSeverity : 'None',
      prognosis: data.neckPain.hasInjury ? `${data.neckPain.resolveDays} days` : 'N/A',
      classification: data.neckPain.hasInjury ? 'Whiplash' : 'N/A',
      treatment: 'Physiotherapy'
    },
    {
      name: 'Shoulder Pain',
      currentStatus: data.shoulderPain.hasInjury ? data.shoulderPain.currentSeverity : 'None',
      prognosis: data.shoulderPain.hasInjury ? `${data.shoulderPain.resolveDays} days` : 'N/A',
      classification: data.shoulderPain.hasInjury ? 'Soft Tissue Injury' : 'N/A',
      treatment: 'Physiotherapy'
    },
    {
      name: 'Back Pain',
      currentStatus: data.backPain.hasInjury ? data.backPain.currentSeverity : 'None',
      prognosis: data.backPain.hasInjury ? `${data.backPain.resolveDays} days` : 'N/A',
      classification: data.backPain.hasInjury ? 'Soft Tissue Injury' : 'N/A',
      treatment: 'Physiotherapy'
    },
    {
      name: 'Headache',
      currentStatus: data.headache.hasInjury ? data.headache.currentSeverity : 'None',
      prognosis: data.headache.hasInjury ? `${data.headache.resolveDays} days` : 'N/A',
      classification: data.headache.hasInjury ? 'Post-Traumatic' : 'N/A',
      treatment: 'Pain Relief'
    }
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Summary of Injuries</Text>
      
      {/* Table header */}
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <View style={{...styles.cellContainer, width: '10%'}}>
            <Text style={styles.infoHeader}>No.</Text>
          </View>
          <View style={{...styles.cellContainer, width: '20%'}}>
            <Text style={styles.infoHeader}>Injury Name</Text>
          </View>
          <View style={{...styles.cellContainer, width: '20%'}}>
            <Text style={styles.infoHeader}>Current Status</Text>
          </View>
          <View style={{...styles.cellContainer, width: '20%'}}>
            <Text style={styles.infoHeader}>Prognosis</Text>
          </View>
          <View style={{...styles.cellContainer, width: '15%'}}>
            <Text style={styles.infoHeader}>Classification</Text>
          </View>
          <View style={{...styles.cellContainer, width: '15%', borderRightWidth: 0}}>
            <Text style={styles.infoHeader}>Treatment</Text>
          </View>
        </View>
        
        {/* Table data rows */}
        {injuries.map((injury, index) => (
          <View key={index} style={styles.infoRow}>
            <View style={{...styles.cellContainer, width: '10%'}}>
              <Text style={styles.infoCell}>{index + 1}</Text>
            </View>
            <View style={{...styles.cellContainer, width: '20%'}}>
              <Text style={styles.infoCell}>{injury.name}</Text>
            </View>
            <View style={{...styles.cellContainer, width: '20%'}}>
              <Text style={styles.infoCell}>{injury.currentStatus}</Text>
            </View>
            <View style={{...styles.cellContainer, width: '20%'}}>
              <Text style={styles.infoCell}>{injury.prognosis}</Text>
            </View>
            <View style={{...styles.cellContainer, width: '15%'}}>
              <Text style={styles.infoCell}>{injury.classification}</Text>
            </View>
            <View style={{...styles.cellContainer, width: '15%', borderRightWidth: 0}}>
              <Text style={styles.infoCell}>{injury.treatment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
