
import { Text, View } from '@react-pdf/renderer';
import { WorkImpact } from './impact/WorkImpact';
import { SleepImpact } from './impact/SleepImpact';
import { DomesticImpact } from './impact/DomesticImpact';
import { SportLeisureImpact } from './impact/SportLeisureImpact';
import { SocialLifeImpact } from './impact/SocialLifeImpact';
import { AdditionalImpactInfo } from './impact/AdditionalImpactInfo';
import { impactStyles } from './impact/impactStyles';

interface DailyLifeImpactSectionProps {
  formData: any;
}

export const DailyLifeImpactSection = ({ formData }: DailyLifeImpactSectionProps) => {
  return (
    <View style={impactStyles.section}>
      <Text style={impactStyles.subtitle}>Impact on Daily Life</Text>
      
      <WorkImpact formData={formData} />
      <SleepImpact formData={formData} />
      <DomesticImpact formData={formData} />
      <SportLeisureImpact formData={formData} />
      <SocialLifeImpact formData={formData} />
      <AdditionalImpactInfo formData={formData} />
    </View>
  );
};
