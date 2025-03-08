
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface DomesticImpactProps {
  formData: any;
}

export const DomesticImpact = ({ formData }: DomesticImpactProps) => {
  const formatDomesticImpact = () => {
    const effects = formatCheckboxList(formData.domesticEffects, formData.otherDomesticEffects);
    return effects ? 
      `Daily domestic activities have been impacted. The claimant has difficulty with ${effects}. ` : 
      "";
  };

  return (
    <View style={impactStyles.subsection}>
      <Text style={impactStyles.text}>{formatDomesticImpact()}</Text>
    </View>
  );
};
