
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface HeadacheProps {
  formData: Partial<FormSchema>;
}

export const HeadacheComponent = ({ formData }: HeadacheProps) => {
  if (formData.headache !== "1") {
    return null;
  }

  // Function to get text description for pain start
  const getPainStartText = () => {
    switch(formData.headacheStart) {
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

  const generateHeadacheText = () => {
    let text = `I experienced headaches that began ${getPainStartText()} the accident. `;
    
    // Initial severity
    text += `Initially, my symptoms were ${getSeverityText(formData.headacheInitialSeverity)}. `;
    
    // Current status
    if (formData.headacheCurrentSeverity === "4") {
      text += `My symptoms have now resolved ${formData.headacheResolveDays ? `after ${formData.headacheResolveDays} days` : ''}. `;
    } else {
      text += `Currently, my symptoms are ${getSeverityText(formData.headacheCurrentSeverity)}. `;
    }
    
    // Prior history - using headachePastHistory instead of hasHeadacheHistory
    if (formData.headachePastHistory) {
      text += "I had a history of headaches prior to this accident. ";
      text += `${formData.headachePastHistory} `;
    } else {
      text += "I had no history of headaches prior to this accident. ";
    }

    return text;
  };

  return (
    <View>
      <Text style={dailyLifeStyles.text}>{generateHeadacheText()}</Text>
    </View>
  );
};
