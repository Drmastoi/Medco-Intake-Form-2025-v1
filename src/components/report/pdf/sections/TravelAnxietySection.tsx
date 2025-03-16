
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { TravelAnxietyData } from '@/types/reportTypes';
import { sectionStyles } from '../styles/sectionStyles';
import { textStyles } from '../styles/textStyles';
import { formatCheckboxList } from '../utils/formatUtils';

interface TravelAnxietyProps {
  anxietyData: TravelAnxietyData;
  reportType?: "claimant" | "expert";
}

const TravelAnxietySection: React.FC<TravelAnxietyProps> = ({ 
  anxietyData, 
  reportType = "expert"
}) => {
  if (!anxietyData.hasAnxiety) {
    return (
      <View style={sectionStyles.section}>
        <Text style={textStyles.sectionTitle}>Travel Anxiety</Text>
        <Text style={textStyles.normalText}>No travel anxiety was reported following the accident.</Text>
      </View>
    );
  }

  return (
    <View style={sectionStyles.section}>
      <Text style={textStyles.sectionTitle}>Travel Anxiety</Text>
      
      <Text style={textStyles.normalText}>
        The claimant reported experiencing travel anxiety following the accident with {anxietyData.initialSeverity.toLowerCase()} 
        initial severity. Currently, the anxiety is {anxietyData.currentSeverity.toLowerCase()}.
      </Text>
      
      {anxietyData.symptoms && anxietyData.symptoms.length > 0 && (
        <View style={sectionStyles.subsection}>
          <Text style={textStyles.paragraphText}>
            Symptoms of travel anxiety include: {formatCheckboxList(anxietyData.symptoms)}
          </Text>
        </View>
      )}
      
      {anxietyData.duration && (
        <Text style={textStyles.paragraphText}>
          Duration: {anxietyData.duration}
        </Text>
      )}
      
      {reportType === "expert" && (
        <View style={sectionStyles.subsection}>
          <Text style={textStyles.paragraphText}>
            Prior history of travel anxiety: {anxietyData.hasHistory === "yes" ? "Yes" : "No"}
          </Text>
          
          {anxietyData.pastHistory && (
            <Text style={textStyles.paragraphText}>
              Details of prior history: {anxietyData.pastHistory}
            </Text>
          )}
          
          <Text style={textStyles.paragraphText}>
            Currently driving: {anxietyData.currentlyDriving || "Not specified"}
          </Text>
        </View>
      )}
    </View>
  );
};

export { TravelAnxietySection };
