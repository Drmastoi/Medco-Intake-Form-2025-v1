
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface DomesticImpactProps {
  formData: any;
}

export const DomesticImpact = ({ formData }: DomesticImpactProps) => {
  const formatDomesticImpact = () => {
    // Combine the domesticEffects array with the otherDomesticEffects if present
    const allEffects = formData.domesticEffects || [];
    if (formData.otherDomesticEffects) {
      allEffects.push(formData.otherDomesticEffects);
    }

    const effects = formatCheckboxList(allEffects);
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
