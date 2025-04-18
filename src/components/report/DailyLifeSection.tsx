
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLife/dailyLifeStyles';
import { InjurySummarySection } from './dailyLife/InjurySummarySection';
import { NeckPainComponent } from './dailyLife/sections/NeckPainComponent';
import { ShoulderPainComponent } from './dailyLife/sections/ShoulderPainComponent';
import { BackPainComponent } from './dailyLife/sections/BackPainComponent';
import { HeadacheComponent } from './dailyLife/sections/HeadacheComponent';
import { TravelAnxietyComponent } from './dailyLife/sections/TravelAnxietyComponent';
import { FormSchema } from '@/schemas/intakeFormSchema';
import InjurySectionDetail from './sections/InjurySectionDetail';

interface DailyLifeSectionProps {
  formData: Partial<FormSchema>;
}

export const DailyLifeSection = ({ formData }: DailyLifeSectionProps) => {
  let sectionCounter = 0;
  
  // Count how many injury sections we have to display
  if (formData.neckPain === "1") sectionCounter++;
  if (formData.shoulderPain === "1") sectionCounter++;
  if (formData.backPain === "1") sectionCounter++;
  if (formData.headache === "1") sectionCounter++;
  if (formData.travelAnxiety === "1") sectionCounter++;
  
  // Reset counter for actual display
  let currentSection = 0;
  
  return (
    <View style={styles.section}>
      {/* Display expert report sections only if the corresponding pain exists */}
      {formData.neckPain === "1" && (
        <>
          <InjurySectionDetail
            title="Neck Pain"
            injuryType="Neck"
            formData={formData}
            styles={styles}
            sectionCount={++currentSection}
          />
          
          {/* Section 6.1 - Neck Pain (simplified version) */}
          <View style={styles.claimantReportSection}>
            <Text style={styles.claimantSectionTitle}>Claimant's Statement - Neck Pain</Text>
            <NeckPainComponent formData={formData} />
          </View>
        </>
      )}
      
      {/* Shoulder Pain */}
      {formData.shoulderPain === "1" && (
        <>
          <InjurySectionDetail
            title="Shoulder Pain"
            injuryType="Shoulder"
            location={formData.shoulderSide}
            formData={formData}
            styles={styles}
            sectionCount={++currentSection}
          />
          
          {/* Section 6.2 - Shoulder Pain (simplified version) */}
          <View style={styles.claimantReportSection}>
            <Text style={styles.claimantSectionTitle}>Claimant's Statement - Shoulder Pain</Text>
            <ShoulderPainComponent formData={formData} />
          </View>
        </>
      )}
    
      {/* Back Pain */}
      {formData.backPain === "1" && (
        <>
          <InjurySectionDetail
            title="Back Pain"
            injuryType="Back"
            location={formData.backLocation}
            formData={formData}
            styles={styles}
            sectionCount={++currentSection}
          />
          
          {/* Section 6.3 - Back Pain (simplified version) */}
          <View style={styles.claimantReportSection}>
            <Text style={styles.claimantSectionTitle}>Claimant's Statement - Back Pain</Text>
            <BackPainComponent formData={formData} />
          </View>
        </>
      )}
    
      {/* Headache */}
      {formData.headache === "1" && (
        <>
          <InjurySectionDetail
            title="Headache"
            injuryType="Headache"
            formData={formData}
            styles={styles}
            sectionCount={++currentSection}
          />
          
          {/* Section 6.4 - Headache (simplified version) */}
          <View style={styles.claimantReportSection}>
            <Text style={styles.claimantSectionTitle}>Claimant's Statement - Headache</Text>
            <HeadacheComponent formData={formData} />
          </View>
        </>
      )}
    
      {/* Travel Anxiety */}
      {formData.travelAnxiety === "1" && (
        <>
          <InjurySectionDetail
            title="Travel Anxiety"
            injuryType="Travel Anxiety"
            formData={formData}
            styles={styles}
            sectionCount={++currentSection}
          />
          
          {/* Section 6.5 - Travel Anxiety (simplified version) */}
          <View style={styles.claimantReportSection}>
            <Text style={styles.claimantSectionTitle}>Claimant's Statement - Travel Anxiety</Text>
            <TravelAnxietyComponent formData={formData} />
          </View>
        </>
      )}
    </View>
  );
};
