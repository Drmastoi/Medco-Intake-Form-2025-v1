
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface TravelAnxietyProps {
  formData: Partial<FormSchema>;
}

export const TravelAnxietyComponent = ({ formData }: TravelAnxietyProps) => {
  if (formData.travelAnxiety !== "1") {
    return null;
  }

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

  const formatSymptomsText = () => {
    if (!formData.travelAnxietySymptoms || formData.travelAnxietySymptoms.length === 0) {
      return "";
    }

    const symptoms = [...formData.travelAnxietySymptoms];
    const hasOther = symptoms.includes("other");
    
    // Map symptom ids to readable text
    const readableSymptoms = symptoms.map(symptom => {
      switch(symptom) {
        case "cautious-driver": return "being a more cautious driver";
        case "frequent-mirror-checking": return "looking in the mirror more frequently";
        case "avoid-accident-road": return "avoiding the road where the accident happened";
        case "avoid-passenger": return "avoiding being a passenger";
        case "avoid-driving": return "avoiding driving";
        case "panic-attacks": return "panic attacks when in a car";
        case "passenger-anxiety": return "anxiety when traveling as a passenger";
        case "busy-road-anxiety": return "anxiety on busy roads or highways";
        case "prevented-driving": return "being prevented from driving for leisure or work";
        case "other": return "";
        default: return symptom;
      }
    }).filter(s => s !== "");

    // Add other symptom if specified
    if (hasOther && formData.otherTravelAnxietySymptom) {
      readableSymptoms.push(formData.otherTravelAnxietySymptom);
    }

    // Format the symptoms list
    if (readableSymptoms.length === 0) {
      return "";
    } else if (readableSymptoms.length === 1) {
      return `The symptoms include ${readableSymptoms[0]}. `;
    } else {
      const lastSymptom = readableSymptoms.pop();
      return `The symptoms include ${readableSymptoms.join(", ")} and ${lastSymptom}. `;
    }
  };

  const generateTravelAnxietyText = () => {
    let text = "The Claimant reports experiencing travel anxiety following the accident. ";
    
    // Initial severity
    text += `Initially, the anxiety was ${getSeverityText(formData.anxietyInitialSeverity)}. `;
    
    // Current status
    if (formData.anxietyCurrentSeverity === "4") {
      text += `The anxiety has now resolved ${formData.anxietyResolveDays ? `after ${formData.anxietyResolveDays} days` : ''}. `;
    } else {
      text += `Currently, the anxiety is ${getSeverityText(formData.anxietyCurrentSeverity)}. `;
    }

    // Symptoms
    text += formatSymptomsText();
    
    // Driving status
    if (formData.currentlyDriving === "1") {
      text += "The Claimant has returned to driving. ";
    } else if (formData.currentlyDriving === "2") {
      text += "The Claimant has not yet returned to driving. ";
    }
    
    // Prior history
    if (formData.hasAnxietyHistory === "yes") {
      text += "The Claimant reports a history of anxiety prior to this accident. ";
      if (formData.anxietyPastHistory) {
        text += `${formData.anxietyPastHistory} `;
      }
    } else if (formData.hasAnxietyHistory === "no") {
      text += "The Claimant reports no history of anxiety prior to this accident. ";
    }

    return text;
  };

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.title}>6.5 Travel Anxiety</Text>
      <Text style={dailyLifeStyles.text}>{generateTravelAnxietyText()}</Text>
    </View>
  );
};
