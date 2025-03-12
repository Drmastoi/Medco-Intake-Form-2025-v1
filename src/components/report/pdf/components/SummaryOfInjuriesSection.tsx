
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { InjuriesData } from '@/utils/pdfReportUtils';

export const SummaryOfInjuriesSection = ({ data }: { data: InjuriesData }) => {
  // Function to determine if an injury is present
  const hasInjury = (value: string) => value === "1";
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>6. Summary of Injuries</Text>
      
      <View style={styles.summaryBox}>
        {hasInjury(data.neckPain) && (
          <Text style={styles.summaryText}>• Neck pain</Text>
        )}
        
        {hasInjury(data.shoulderPain) && (
          <Text style={styles.summaryText}>• Shoulder pain ({data.shoulderSide === "1" ? "Right" : 
                                          data.shoulderSide === "2" ? "Left" : 
                                          data.shoulderSide === "3" ? "Both" : "Unknown"})</Text>
        )}
        
        {hasInjury(data.backPain) && (
          <Text style={styles.summaryText}>• Back pain ({data.backLocation === "1" ? "Upper back" : 
                                        data.backLocation === "2" ? "Mid back" : 
                                        data.backLocation === "3" ? "Lower back" : "Unknown"})</Text>
        )}
        
        {hasInjury(data.headache) && (
          <Text style={styles.summaryText}>• Headache</Text>
        )}
        
        {hasInjury(data.travelAnxiety) && (
          <Text style={styles.summaryText}>• Travel anxiety</Text>
        )}
        
        {hasInjury(data.hasBruising) && (
          <Text style={styles.summaryText}>• Bruising 
            {data.hasVisibleScar === "1" ? " with visible scarring" : ""}
          </Text>
        )}
        
        {!hasInjury(data.neckPain) && 
         !hasInjury(data.shoulderPain) && 
         !hasInjury(data.backPain) && 
         !hasInjury(data.headache) && 
         !hasInjury(data.travelAnxiety) && 
         !hasInjury(data.hasBruising) && (
          <Text style={styles.summaryText}>No injuries reported</Text>
        )}
      </View>
    </View>
  );
};
