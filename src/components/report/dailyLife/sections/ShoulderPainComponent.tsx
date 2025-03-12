
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
    let text = `I experienced ${getShoulderSideText()} pain that began ${getPainStartText()} the accident. `;
    
    // Initial severity
    text += `Initially, my symptoms were ${getSeverityText(formData.shoulderPainInitialSeverity)}. `;
    
    // Current status
    if (formData.shoulderPainCurrentSeverity === "4") {
      text += `My symptoms have now resolved ${formData.shoulderPainResolveDays ? `after ${formData.shoulderPainResolveDays} days` : ''}. `;
    } else {
      text += `Currently, my symptoms are ${getSeverityText(formData.shoulderPainCurrentSeverity)}. `;
    }
    
    // Prior history
    if (formData.hadPriorShoulderPain === "1") {
      text += "I had a history of shoulder pain prior to this accident. ";
      if (formData.accidentShoulderPainPercentage && formData.priorShoulderPainPercentage) {
        text += `I attribute ${formData.accidentShoulderPainPercentage}% of my current shoulder pain to this accident and ${formData.priorShoulderPainPercentage}% to my previous condition. `;
      }
    } else {
      text += "I had no history of shoulder pain prior to this accident. ";
    }

    return text;
  };

  return (
    <View>
      <Text style={dailyLifeStyles.text}>{generateShoulderPainText()}</Text>
    </View>
  );
};
