
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface SocialLifeImpactProps {
  formData: any;
}

export const SocialLifeImpact = ({ formData }: SocialLifeImpactProps) => {
  const formatSocialLifeImpact = () => {
    const effects = formatCheckboxList(formData.socialLifeEffects, formData.otherSocialLifeEffects);
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
