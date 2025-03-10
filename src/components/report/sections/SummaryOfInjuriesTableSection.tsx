
import { Text, View } from '@react-pdf/renderer';
import { InjuriesTable } from './InjuriesTable';
import { InjuryTableRow } from './InjuryTableRow';
import { ExceptionalCircumstancesTable } from './ExceptionalCircumstancesTable';

interface SummaryOfInjuriesTableSectionProps {
  formData: any;
  styles: any;
}

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 4 - Summary of Injuries</Text>
      
      <InjuriesTable styles={styles}>
        {/* Neck Injury */}
        {formData.neckPain === "1" && (
          <InjuryTableRow
            injuryName="Neck"
            additionalInfo="Pain, Stiffness, Discomfort"
            currentSeverity={formData.neckPainCurrentSeverity}
            resolveDays={formData.neckPainResolveDays}
            injuryType="Neck"
            styles={styles}
          />
        )}
        
        {/* Shoulder Injury */}
        {formData.shoulderPain === "1" && (
          <InjuryTableRow
            injuryName="Shoulder"
            additionalInfo={formData.shoulderSide === "1" ? "Left" : formData.shoulderSide === "2" ? "Right" : "Both"} 
            currentSeverity={formData.shoulderPainCurrentSeverity}
            resolveDays={formData.shoulderPainResolveDays}
            injuryType="Shoulder"
            styles={styles}
          />
        )}
        
        {/* Back Injury */}
        {formData.backPain === "1" && (
          <InjuryTableRow
            injuryName="Back"
            additionalInfo={formData.backLocation === "1" ? "Upper" : formData.backLocation === "2" ? "Middle" : formData.backLocation === "3" ? "Lower" : "Full"} 
            currentSeverity={formData.backPainCurrentSeverity}
            resolveDays={formData.backPainResolveDays}
            injuryType="Back"
            location={formData.backLocation}
            styles={styles}
          />
        )}
        
        {/* Headache */}
        {formData.headache === "1" && (
          <InjuryTableRow
            injuryName="Headaches"
            currentSeverity={formData.headacheCurrentSeverity}
            resolveDays={formData.headacheResolveDays}
            injuryType="Headache"
            styles={styles}
          />
        )}
        
        {/* Anxiety */}
        {formData.travelAnxiety === "1" && (
          <InjuryTableRow
            injuryName="Anxiety"
            currentSeverity={formData.anxietyCurrentSeverity}
            resolveDays={formData.anxietyDuration}
            injuryType="Anxiety"
            styles={styles}
          />
        )}
        
        {/* Dizziness */}
        {formData.dizziness === "1" && (
          <InjuryTableRow
            injuryName="Dizziness"
            currentSeverity={formData.dizzinessCurrentSeverity}
            resolveDays={formData.dizzinessResolveDays}
            injuryType="Dizziness"
            styles={styles}
          />
        )}

        {/* Other Injury */}
        {formData.hasOtherInjury === "1" && (
          <InjuryTableRow
            injuryName={formData.injuryName || "Other Injury"}
            currentSeverity={formData.injuryCurrentSeverity}
            resolveDays={formData.injuryResolveDays}
            injuryType="Other"
            styles={styles}
          />
        )}

        {/* Bruising */}
        {formData.hasBruising === "1" && (
          <InjuryTableRow
            injuryName="Bruising/Scarring"
            currentSeverity={formData.bruisingCurrentSeverity}
            resolveDays={formData.bruisingResolveDays}
            injuryType="Other"
            styles={styles}
          />
        )}
      </InjuriesTable>
      
      {/* Exceptional Injuries Section */}
      <ExceptionalCircumstancesTable formData={formData} styles={styles} />
    </View>
  );
};
