
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { NeckPainComponent } from './injury-components/NeckPainComponent';
import { BackPainComponent } from './injury-components/BackPainComponent';
import { ShoulderPainComponent } from './injury-components/ShoulderPainComponent';
import { HeadacheComponent } from './injury-components/HeadacheComponent';
import { TravelAnxietyComponent } from './injury-components/TravelAnxietyComponent';
import { ConcludingStatement } from './injury-components/ConcludingStatement';

interface InjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const InjuriesSection = ({ formData, styles }: InjuriesSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 6 - Injuries</Text>

      {/* Neck Pain */}
      <NeckPainComponent neckPain={formData.injuries.neckPain} styles={styles} />
      
      {/* Back Pain */}
      <BackPainComponent backPain={formData.injuries.backPain} styles={styles} />
      
      {/* Shoulder Pain */}
      <ShoulderPainComponent shoulderPain={formData.injuries.shoulderPain} styles={styles} />
      
      {/* Headache */}
      <HeadacheComponent headache={formData.injuries.headache} styles={styles} />
      
      {/* Travel Anxiety */}
      <TravelAnxietyComponent travelAnxiety={formData.travelAnxiety} styles={styles} />
      
      {/* Concluding statement */}
      <ConcludingStatement styles={styles} />
    </View>
  );
};
