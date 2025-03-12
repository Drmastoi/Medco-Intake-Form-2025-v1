
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface ShoulderPainProps {
  formData: Partial<FormSchema>;
}

export const ShoulderPainComponent = ({ formData }: ShoulderPainProps) => {
  if (formData.shoulderPain !== "1") {
    return null;
  }

  // Function to get text description for shoulder side
  const getShoulderSideText = () => {
    switch(formData.shoulderSide) {
      case "1": return "left shoulder";
      case "2": return "right shoulder";
      case "3": return "both shoulders";
      default: return "shoulder";
    }
  };

  // Function to get text description for pain start
  const getPainStartText = () => {
    switch(formData.shoulderPainStart) {
      case "1": return "immediately after";
      case "2": return "the day after";
      case "3": return "a few days after";
      default: return "sometime after";
    }
  };

  // Function to get severity description
  const getSeverityText = (severity: string | undefined) => {
    switch(severity) {
      case "1": return "mild";
      case "2": return "moderate";
      case "3": return "severe";
      case "4": return "resolved";
      default: return "unknown";
    }
  };

  const generateShoulderPainText = () => {
    let text = `The Claimant reports experiencing ${getShoulderSideText()} pain that began ${getPainStartText()} the accident. `;
    
    // Initial severity
    text += `Initially, the symptoms were ${getSeverityText(formData.shoulderPainInitialSeverity)}. `;
    
    // Current status
    if (formData.shoulderPainCurrentSeverity === "4") {
      text += `The symptoms have now resolved ${formData.shoulderPainResolveDays ? `after ${formData.shoulderPainResolveDays} days` : ''}. `;
    } else {
      text += `Currently, the symptoms are ${getSeverityText(formData.shoulderPainCurrentSeverity)}. `;
    }
    
    // Prior history
    if (formData.hadPriorShoulderPain === "1") {
      text += "The Claimant reports a history of shoulder pain prior to this accident. ";
      if (formData.accidentShoulderPainPercentage && formData.priorShoulderPainPercentage) {
        text += `They attribute ${formData.accidentShoulderPainPercentage}% of their current shoulder pain to this accident and ${formData.priorShoulderPainPercentage}% to their previous condition. `;
      }
    } else {
      text += "The Claimant reports no history of shoulder pain prior to this accident. ";
    }

    return text;
  };

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.title}>6.2 Shoulder Pain</Text>
      <Text style={dailyLifeStyles.text}>{generateShoulderPainText()}</Text>
    </View>
  );
};
