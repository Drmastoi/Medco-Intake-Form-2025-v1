
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface SportLeisureImpactProps {
  formData: any;
}

export const SportLeisureImpact = ({ formData }: SportLeisureImpactProps) => {
  const formatSportLeisureImpact = () => {
    const effects = formatCheckboxList(formData.sportLeisureEffects, formData.otherSportLeisureEffects);
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
