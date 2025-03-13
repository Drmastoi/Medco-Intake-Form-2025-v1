
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface BackPainProps {
  formData: Partial<FormSchema>;
}

export const BackPainComponent = ({ formData }: BackPainProps) => {
  if (formData.backPain !== "1") {
    return null;
  }

  // Function to get text description for back location
  const getBackLocationText = () => {
    switch(formData.backLocation) {
      case "1": return "upper back";
      case "2": return "middle back";
      case "3": return "lower back";
      case "4": return "all over back";
      default: return "back";
    }
  };

  // Function to get text description for pain start
  const getPainStartText = () => {
    switch(formData.backPainStart) {
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

  const generateBackPainText = () => {
    let text = `I experienced ${getBackLocationText()} pain that began ${getPainStartText()} the accident. `;
    
    // Initial severity
    text += `Initially, my symptoms were ${getSeverityText(formData.backPainInitialSeverity)}. `;
    
    // Current status
    if (formData.backPainCurrentSeverity === "4") {
      text += `My symptoms have now resolved ${formData.backPainResolveDays ? `after ${formData.backPainResolveDays} days` : ''}. `;
    } else {
      text += `Currently, my symptoms are ${getSeverityText(formData.backPainCurrentSeverity)}. `;
    }

    return text;
  };

  return (
    <View>
      <Text style={dailyLifeStyles.text}>{generateBackPainText()}</Text>
    </View>
  );
};
