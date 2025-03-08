
import { Text, View } from '@react-pdf/renderer';
import { impactStyles } from './impactStyles';

interface AdditionalImpactInfoProps {
  formData: any;
}

export const AdditionalImpactInfo = ({ formData }: AdditionalImpactInfoProps) => {
  if (formData.additionalInformation !== "1" || !formData.additionalInformationDetails) {
    return null;
  }

  return (
    <View style={impactStyles.subsection}>
      <Text style={impactStyles.text}>
        Additional Impact Information: {formData.additionalInformationDetails}
      </Text>
    </View>
  );
};
