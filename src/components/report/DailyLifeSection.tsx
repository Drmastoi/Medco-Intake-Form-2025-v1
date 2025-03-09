
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLife/dailyLifeStyles';
import { InjurySummarySection } from './dailyLife/InjurySummarySection';
import { PsychologicalImpactSection } from './dailyLife/PsychologicalImpactSection';
import { ActivitiesImpactSection } from './dailyLife/ActivitiesImpactSection';
import { WorkImpactSection } from './dailyLife/WorkImpactSection';
import { AdditionalInfoSection } from './dailyLife/AdditionalInfoSection';

export const DailyLifeSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.title}>COMPREHENSIVE INJURY AND IMPACT SUMMARY</Text>
    
    <InjurySummarySection formData={formData} />
    <PsychologicalImpactSection formData={formData} />
    <ActivitiesImpactSection formData={formData} />
    <WorkImpactSection formData={formData} />
    <AdditionalInfoSection formData={formData} />
  </View>
);
