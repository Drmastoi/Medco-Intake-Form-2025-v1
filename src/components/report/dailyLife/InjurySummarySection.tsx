import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';
import { AccidentInfoComponent } from './sections/AccidentInfoComponent';
import { NeckPainComponent } from './sections/NeckPainComponent';
import { ShoulderPainComponent } from './sections/ShoulderPainComponent';
import { BackPainComponent } from './sections/BackPainComponent';
import { HeadacheComponent } from './sections/HeadacheComponent';
import { TravelAnxietyComponent } from './sections/TravelAnxietyComponent';
import { BruisingComponent } from './sections/BruisingComponent';
import { OtherInjuriesComponent } from './sections/OtherInjuriesComponent';
import { TreatmentComponent } from './sections/TreatmentComponent';
import { LifestyleImpactComponent } from './sections/LifestyleImpactComponent';
import { MedicalHistoryComponent } from './sections/MedicalHistoryComponent';
import { LongTermComponent } from './sections/LongTermComponent';
import { SoftTissueComponent } from './sections/SoftTissueComponent';
import { CaseDeclarationComponent } from './sections/CaseDeclarationComponent';

interface InjurySummaryProps {
  formData: Partial<FormSchema>;
}

export const InjurySummarySection = ({ formData }: InjurySummaryProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.title}>Summary of Injuries and Symptoms</Text>
      
      {/* Section 5.1 - Accident History */}
      <AccidentInfoComponent formData={formData} />

      {/* Section 6 - Injuries and Symptoms */}
      <Text style={dailyLifeStyles.subtitle}>6. Injuries and Symptoms</Text>
      
      {/* Section 6.1 - Neck Pain */}
      <NeckPainComponent formData={formData} />

      {/* Section 6.2 - Shoulder Pain */}
      <ShoulderPainComponent formData={formData} />

      {/* Section 6.3 - Back Pain */}
      <BackPainComponent formData={formData} />

      {/* Section 6.4 - Headache */}
      <HeadacheComponent formData={formData} />

      {/* Section 6.5 - Travel Anxiety */}
      <TravelAnxietyComponent formData={formData} />

      {/* Section 6.6 - Bruising */}
      <BruisingComponent formData={formData} />

      {/* Section 6.7 - Other Injuries */}
      <OtherInjuriesComponent formData={formData} />

      {/* Section 7 - Treatment */}
      <TreatmentComponent formData={formData} />

      {/* Section 8 - Impact on Lifestyle */}
      <LifestyleImpactComponent formData={formData} />

      {/* Section 9 - Past Medical History */}
      <MedicalHistoryComponent formData={formData} />

      {/* Section 10 - Long Term Complications */}
      <LongTermComponent />

      {/* Section 11 - Soft Tissue Injury Claim */}
      <SoftTissueComponent />

      {/* Section 12 - Case Declaration */}
      <CaseDeclarationComponent />
    </View>
  );
};
