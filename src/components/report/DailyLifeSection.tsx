
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLife/dailyLifeStyles';
import { InjurySummarySection } from './dailyLife/InjurySummarySection';
import { NeckPainComponent } from './dailyLife/sections/NeckPainComponent';
import { FormSchema } from '@/schemas/intakeFormSchema';

interface DailyLifeSectionProps {
  formData: Partial<FormSchema>;
}

export const DailyLifeSection = ({ formData }: DailyLifeSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.title}>ACCIDENT DETAILS</Text>
    
    <InjurySummarySection formData={formData} />
    
    {/* Section 6.1 - Neck Pain */}
    <NeckPainComponent formData={formData} />
  </View>
);
