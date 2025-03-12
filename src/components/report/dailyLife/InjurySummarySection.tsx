
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';

interface InjurySummaryProps {
  formData: Partial<FormSchema>;
}

export const InjurySummarySection = ({ formData }: InjurySummaryProps) => {
  // Extract relevant form data
  const {
    neckPain, 
    neckPainInitialSeverity,
    neckPainCurrentSeverity,
    shoulderPain,
    shoulderPainInitialSeverity,
    shoulderPainCurrentSeverity,
    shoulderSide,
    backPain,
    backPainInitialSeverity,
    backPainCurrentSeverity,
    backLocation,
    headache,
    headacheInitialSeverity,
    headacheCurrentSeverity,
    travelAnxiety,
    anxietyInitialSeverity,
    anxietyCurrentSeverity,
    exceptionalInjuries,
    exceptionalInjuriesDetails
  } = formData;

  // Helper function to convert severity codes to readable text
  const getSeverityText = (code: string | undefined) => {
    switch(code) {
      case '1': return 'mild';
      case '2': return 'moderate';
      case '3': return 'severe';
      case '4': return 'resolved';
      default: return 'unknown';
    }
  };

  // Helper function to get shoulder side text
  const getShoulderSideText = (side: string | undefined) => {
    switch(side) {
      case '1': return 'right';
      case '2': return 'left';
      case '3': return 'both';
      default: return '';
    }
  };

  // Helper function to get back location text
  const getBackLocationText = (location: string | undefined) => {
    switch(location) {
      case '1': return 'upper';
      case '2': return 'middle';
      case '3': return 'lower';
      case '4': return 'entire';
      default: return '';
    }
  };

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.title}>Summary of Injuries and Symptoms</Text>
      
      <Text style={dailyLifeStyles.text}>
        The following is a summary of the injuries and symptoms reported by the claimant 
        as a result of the accident:
      </Text>

      {/* Neck Pain */}
      {neckPain === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>Neck Pain</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant reported experiencing neck pain following the accident. 
            The initial severity was {getSeverityText(neckPainInitialSeverity)}.
            The current severity is {getSeverityText(neckPainCurrentSeverity)}.
          </Text>
        </View>
      )}

      {/* Shoulder Pain */}
      {shoulderPain === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>Shoulder Pain</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant reported {getShoulderSideText(shoulderSide)} shoulder pain following the accident.
            The initial severity was {getSeverityText(shoulderPainInitialSeverity)}.
            The current severity is {getSeverityText(shoulderPainCurrentSeverity)}.
          </Text>
        </View>
      )}

      {/* Back Pain */}
      {backPain === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>Back Pain</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant reported {getBackLocationText(backLocation)} back pain following the accident.
            The initial severity was {getSeverityText(backPainInitialSeverity)}.
            The current severity is {getSeverityText(backPainCurrentSeverity)}.
          </Text>
        </View>
      )}

      {/* Headache */}
      {headache === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>Headache</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant reported experiencing headaches following the accident.
            The initial severity was {getSeverityText(headacheInitialSeverity)}.
            The current severity is {getSeverityText(headacheCurrentSeverity)}.
          </Text>
        </View>
      )}

      {/* Travel Anxiety */}
      {travelAnxiety === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>Travel Anxiety</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant reported experiencing travel anxiety following the accident.
            The initial severity was {getSeverityText(anxietyInitialSeverity)}.
            The current severity is {getSeverityText(anxietyCurrentSeverity)}.
          </Text>
        </View>
      )}

      {/* Exceptional Injuries */}
      {exceptionalInjuries === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>Exceptionally Severe Injuries</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant reported experiencing exceptionally severe physical or psychological injuries.
            Details: {exceptionalInjuriesDetails || "No additional details provided."}
          </Text>
        </View>
      )}
    </View>
  );
};
