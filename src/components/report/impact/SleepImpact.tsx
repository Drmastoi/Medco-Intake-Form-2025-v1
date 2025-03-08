
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface SleepImpactProps {
  formData: any;
}

export const SleepImpact = ({ formData }: SleepImpactProps) => {
  const formatSleepImpact = () => {
    const disturbances = formatCheckboxList(formData.sleepDisturbances, formData.otherSleepDisturbances);
    return disturbances ? 
      `Sleep has been significantly affected. The claimant reports experiencing ${disturbances}. ` : 
      "";
  };

  return (
    <View style={impactStyles.subsection}>
      <Text style={impactStyles.text}>{formatSleepImpact()}</Text>
    </View>
  );
};
