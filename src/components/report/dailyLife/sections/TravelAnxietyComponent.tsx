
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
      return `My symptoms include ${readableSymptoms[0]}. `;
    } else {
      const lastSymptom = readableSymptoms.pop();
      return `My symptoms include ${readableSymptoms.join(", ")} and ${lastSymptom}. `;
    }
  };

  const generateTravelAnxietyText = () => {
    let text = "I experienced travel anxiety following the accident. ";
    
    // Initial severity
    text += `Initially, my anxiety was ${getSeverityText(formData.anxietyInitialSeverity)}. `;
    
    // Current status
    if (formData.anxietyCurrentSeverity === "4") {
      text += `My anxiety has now resolved ${formData.anxietyResolveDays ? `after ${formData.anxietyResolveDays} days` : ''}. `;
    } else {
      text += `Currently, my anxiety is ${getSeverityText(formData.anxietyCurrentSeverity)}. `;
    }

    // Symptoms
    text += formatSymptomsText();
    
    // Driving status
    if (formData.currentlyDriving === "1") {
      text += "I have returned to driving. ";
    } else if (formData.currentlyDriving === "2") {
      text += "I have not yet returned to driving. ";
    }
    
    // Prior history
    if (formData.hasAnxietyHistory === "yes") {
      text += "I had a history of anxiety prior to this accident. ";
      if (formData.anxietyPastHistory) {
        text += `${formData.anxietyPastHistory} `;
      }
    } else if (formData.hasAnxietyHistory === "no") {
      text += "I had no history of anxiety prior to this accident. ";
    }

    return text;
  };

  return (
    <View>
      <Text style={dailyLifeStyles.text}>{generateTravelAnxietyText()}</Text>
    </View>
  );
};
