
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLife/dailyLifeStyles';
import { InjurySummarySection } from './dailyLife/InjurySummarySection';

export const DailyLifeSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.title}>ACCIDENT DETAILS</Text>
    
    <InjurySummarySection formData={formData} />
  </View>
);
