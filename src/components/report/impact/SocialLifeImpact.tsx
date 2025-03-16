
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface SocialLifeImpactProps {
  formData: any;
}

export const SocialLifeImpact = ({ formData }: SocialLifeImpactProps) => {
  const formatSocialLifeImpact = () => {
    // Combine the socialLifeEffects array with the otherSocialLifeEffects if present
    const allEffects = formData.socialLifeEffects || [];
    if (formData.otherSocialLifeEffects) {
      allEffects.push(formData.otherSocialLifeEffects);
    }

    const effects = formatCheckboxList(allEffects);
    return effects ? 
      `Social activities have been impacted. The claimant experiences difficulties with ${effects}. ` : 
      "";
  };

  return (
    <View style={impactStyles.subsection}>
      <Text style={impactStyles.text}>{formatSocialLifeImpact()}</Text>
    </View>
  );
};
