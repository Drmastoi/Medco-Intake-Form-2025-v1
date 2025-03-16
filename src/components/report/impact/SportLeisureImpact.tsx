
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface SportLeisureImpactProps {
  formData: any;
}

export const SportLeisureImpact = ({ formData }: SportLeisureImpactProps) => {
  const formatSportLeisureImpact = () => {
    // Combine the sportLeisureEffects array with the otherSportLeisureEffects if present
    const allEffects = formData.sportLeisureEffects || [];
    if (formData.otherSportLeisureEffects) {
      allEffects.push(formData.otherSportLeisureEffects);
    }

    const effects = formatCheckboxList(allEffects);
    return effects ? 
      `Sport and leisure activities have been affected. The claimant reports limitations with ${effects}. ` : 
      "";
  };

  return (
    <View style={impactStyles.subsection}>
      <Text style={impactStyles.text}>{formatSportLeisureImpact()}</Text>
    </View>
  );
};
