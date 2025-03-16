
import { Text, View } from '@react-pdf/renderer';
import { formatCheckboxList } from '../utils/formatUtils';
import { impactStyles } from './impactStyles';

interface SleepImpactProps {
  formData: any;
}

export const SleepImpact = ({ formData }: SleepImpactProps) => {
  const formatSleepImpact = () => {
    // Combine the sleepDisturbances array with the otherSleepDisturbances if present
    const allDisturbances = formData.sleepDisturbances || [];
    if (formData.otherSleepDisturbances) {
      allDisturbances.push(formData.otherSleepDisturbances);
    }

    const disturbances = formatCheckboxList(allDisturbances);
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
