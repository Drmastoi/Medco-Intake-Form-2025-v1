
import { Text, View } from '@react-pdf/renderer';
import { GeneralPhysicalExam } from './injury-components/GeneralPhysicalExam';
import { InjuryHeader } from './injury-components/InjuryHeader';
import { SymptomsRow } from './injury-components/SymptomsRow';
import { OnsetRow } from './injury-components/OnsetRow';
import { InitialSeverityRow } from './injury-components/InitialSeverityRow';
import { CurrentStatusRow } from './injury-components/CurrentStatusRow';
import { MechanismRow } from './injury-components/MechanismRow';
import { ExaminationRow } from './injury-components/ExaminationRow';
import { OpinionRow } from './injury-components/OpinionRow';
import { SimilarSymptomsRow } from './injury-components/SimilarSymptomsRow';
import { AdditionalReportRow } from './injury-components/AdditionalReportRow';
import { OICTariffRow } from './injury-components/OICTariffRow';
import { PrognosisRow } from './injury-components/PrognosisRow';
import { TreatmentRow } from './injury-components/TreatmentRow';

interface InjurySectionDetailProps {
  title: string;
  injuryType: string;
  location?: string;
  formData: any;
  styles: any;
  sectionCount: number;
}

const InjurySectionDetail = ({ 
  title, 
  injuryType, 
  location, 
  formData, 
  styles, 
  sectionCount 
}: InjurySectionDetailProps) => {
  // Determine which data fields to use based on injury type
  const getDataPrefix = () => {
    switch(injuryType) {
      case 'Neck': return 'neck';
      case 'Back': return 'back';
      case 'Shoulder': return 'shoulder';
      case 'Headache': return 'headache';
      case 'Travel Anxiety': return 'anxiety';
      default: return 'neck';
    }
  };

  const prefix = getDataPrefix();
  const painStart = formData[`${prefix}PainStart`] || formData[`${prefix}Start`];
  const initialSeverity = formData[`${prefix}InitialSeverity`];
  const currentSeverity = formData[`${prefix}CurrentSeverity`];
  const resolveDays = formData[`${prefix}ResolveDays`];

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.injuriesSectionTitle}>6.{sectionCount} Expert Medical Assessment - {title}</Text>
      
      {/* Add General Physical Examination section before the first injury */}
      {sectionCount === 1 && <GeneralPhysicalExam styles={styles} />}
      
      <InjuryHeader 
        title={title} 
        injuryType={injuryType} 
        location={location} 
        styles={styles} 
      />
      
      <View style={styles.injuryTable}>
        <SymptomsRow injuryType={injuryType} styles={styles} />
        <OnsetRow painStart={painStart} styles={styles} />
        <InitialSeverityRow 
          initialSeverity={initialSeverity} 
          injuryType={injuryType} 
          styles={styles} 
        />
        <CurrentStatusRow 
          currentSeverity={currentSeverity} 
          resolveDays={resolveDays} 
          styles={styles} 
        />
        <MechanismRow 
          injuryType={injuryType} 
          location={location} 
          styles={styles} 
        />
        <ExaminationRow 
          injuryType={injuryType} 
          currentSeverity={currentSeverity} 
          styles={styles} 
        />
        <OpinionRow 
          injuryType={injuryType} 
          location={location} 
          styles={styles} 
        />
        <SimilarSymptomsRow 
          injuryType={injuryType} 
          hasAnxietyHistory={formData.hasAnxietyHistory} 
          anxietyPastHistory={formData.anxietyPastHistory} 
          styles={styles} 
        />
        <AdditionalReportRow styles={styles} />
        <OICTariffRow 
          injuryType={injuryType} 
          location={location} 
          styles={styles} 
        />
        <PrognosisRow 
          injuryType={injuryType} 
          currentSeverity={currentSeverity} 
          resolveDays={resolveDays} 
          styles={styles} 
        />
        <TreatmentRow 
          injuryType={injuryType} 
          currentSeverity={currentSeverity} 
          styles={styles} 
        />
      </View>
    </View>
  );
};

export default InjurySectionDetail;
