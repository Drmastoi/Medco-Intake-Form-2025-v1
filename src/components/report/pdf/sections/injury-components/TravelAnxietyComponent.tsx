
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../../styles/layoutStyles';
import { textStyles } from '../../styles/textStyles';
import { colorScheme } from '../../styles/colorScheme';
import { formatCheckboxList } from '../../utils/formatUtils';

interface TravelAnxietyProps {
  travelAnxiety: {
    hasAnxiety: boolean;
    symptoms: string[];
    initialSeverity: string;
    currentSeverity: string;
    resolveDays: string;
    pastHistory: string;
    hasHistory: string;
    currentlyDriving: string;
    duration?: string;
  };
}

export const TravelAnxietyComponent: React.FC<TravelAnxietyProps> = ({ travelAnxiety }) => {
  const formatSymptoms = () => {
    const symptoms = travelAnxiety.symptoms || [];
    if (symptoms.length === 0) return "No specific symptoms reported.";
    
    return formatCheckboxList(symptoms);
  };

  return (
    <View style={[layoutStyles.section, { backgroundColor: colorScheme.altSectionBg, marginBottom: 10 }]}>
      <Text style={textStyles.sectionTitle}>Travel Anxiety</Text>
      
      <View>
        <Text style={textStyles.normalText}>
          The claimant reports experiencing travel anxiety following the accident. 
          The initial severity was {travelAnxiety.initialSeverity.toLowerCase()} and the 
          current severity is {travelAnxiety.currentSeverity.toLowerCase()}.
        </Text>
        
        <Text style={[textStyles.normalText, { marginTop: 5 }]}>
          Symptoms include: {formatSymptoms()}
        </Text>
        
        {travelAnxiety.duration && (
          <Text style={[textStyles.normalText, { marginTop: 5 }]}>
            The anxiety symptoms lasted for approximately {travelAnxiety.duration}.
          </Text>
        )}
        
        {travelAnxiety.currentlyDriving && travelAnxiety.currentlyDriving !== "Not Specified" && (
          <Text style={[textStyles.normalText, { marginTop: 5 }]}>
            Currently driving status: {travelAnxiety.currentlyDriving}
          </Text>
        )}
        
        {travelAnxiety.pastHistory && (
          <Text style={[textStyles.normalText, { marginTop: 5 }]}>
            Past history: {travelAnxiety.pastHistory}
          </Text>
        )}
      </View>
    </View>
  );
};
