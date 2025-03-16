
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../pdf/utils/formatUtils';
import { impactStyles } from './impactStyles';

interface WorkImpactProps {
  formData: any;
}

export const WorkImpact = ({ formData }: WorkImpactProps) => {
  const formatWorkImpact = () => {
    const daysOff = formData.daysOffWork ? 
      `The claimant required ${formData.daysOffWork} days off work following the accident. ` : 
      "The claimant did not require any time off work. ";

    const lightDuties = formData.daysLightDuties ? 
      `They subsequently worked on light duties for ${formData.daysLightDuties} days. ` : 
      "";

    // Combine the workDifficulties array with the otherWorkDifficulties if present
    let allDifficulties = Array.isArray(formData.workDifficulties) ? formData.workDifficulties : [];
    if (formData.otherWorkDifficulties) {
      allDifficulties.push(formData.otherWorkDifficulties);
    }

    const difficulties = formatCheckboxList(allDifficulties);
    const workDifficulties = difficulties ? 
      `The claimant reports experiencing difficulties at work with ${difficulties}. ` : 
      "";

    return daysOff + lightDuties + workDifficulties;
  };

  return (
    <View style={impactStyles.subsection}>
      <Text style={impactStyles.text}>{formatWorkImpact()}</Text>
    </View>
  );
};

export default WorkImpact;
