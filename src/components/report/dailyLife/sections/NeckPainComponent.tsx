
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface NeckPainProps {
  formData: Partial<FormSchema>;
}

export const NeckPainComponent = ({ formData }: NeckPainProps) => {
  if (formData.neckPain !== "1") {
    return null;
  }

  // Function to get text description for pain start
  const getPainStartText = () => {
    switch(formData.neckPainStart) {
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

  const generateNeckPainText = () => {
    let text = `I experienced neck pain that began ${getPainStartText()} the accident. `;
    
    // Initial severity
    text += `Initially, my symptoms were ${getSeverityText(formData.neckPainInitialSeverity)}. `;
    
    // Current status
    if (formData.neckPainCurrentSeverity === "4") {
      text += `My symptoms have now resolved ${formData.neckPainResolveDays ? `after ${formData.neckPainResolveDays} days` : ''}. `;
    } else {
      text += `Currently, my symptoms are ${getSeverityText(formData.neckPainCurrentSeverity)}. `;
    }
    
    // Prior history
    if (formData.hadPriorNeckPain === "1") {
      text += "I had a history of neck pain prior to this accident. ";
      if (formData.accidentNeckPainPercentage && formData.priorNeckPainPercentage) {
        text += `I attribute ${formData.accidentNeckPainPercentage}% of my current neck pain to this accident and ${formData.priorNeckPainPercentage}% to my previous condition. `;
      }
    } else {
      text += "I had no history of neck pain prior to this accident. ";
    }

    return text;
  };

  return (
    <View>
      <Text style={dailyLifeStyles.text}>{generateNeckPainText()}</Text>
    </View>
  );
};
