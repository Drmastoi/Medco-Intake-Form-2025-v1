
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';

// Import section components
import TreatmentSection from '../sections/TreatmentSection';
import LifestyleImpactSection from '../sections/LifestyleImpactSection';
import MedicalHistorySection from '../sections/MedicalHistorySection';
import OtherInjuriesSection from '../sections/OtherInjuriesSection';
import BruisingSection from '../sections/BruisingSection';
import TravelAnxietyComponent from '../sections/injury-components/TravelAnxietyComponent';

interface TreatmentLifestylePageProps {
  reportData: any;
}

const TreatmentLifestylePage: React.FC<TreatmentLifestylePageProps> = ({ reportData }) => {
  return (
    <View style={layoutStyles.page}>
      <View style={layoutStyles.pageContent}>
        <Text style={textStyles.sectionTitle}>Treatment and Daily Life Impact</Text>
        
        <TreatmentSection treatment={reportData.other.treatment} />
        
        <BruisingSection bruising={reportData.other.bruising} />
        
        <OtherInjuriesSection otherInjuries={reportData.other.otherInjuries} />
        
        {reportData.travelAnxiety.hasAnxiety && (
          <TravelAnxietyComponent travelAnxiety={reportData.travelAnxiety} />
        )}
        
        <LifestyleImpactSection lifestyle={reportData.other.lifestyle} />
        
        <MedicalHistorySection medicalHistory={reportData.other.medicalHistory} />
      </View>
    </View>
  );
};

export default TreatmentLifestylePage;
