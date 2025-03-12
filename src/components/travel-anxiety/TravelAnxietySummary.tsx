
import { useEffect, useState } from "react";

interface TravelAnxietyFormData {
  travelAnxiety: string;
  anxietyInitialSeverity: string;
  anxietyCurrentSeverity: string;
  anxietyResolveDays: string;
  travelAnxietySymptoms: string[];
  hasAnxietyHistory: string;
  anxietyPastHistory?: string;
}

export function TravelAnxietySummary({ formData }: { formData: TravelAnxietyFormData }) {
  const [summaryText, setSummaryText] = useState<string>("");
  
  useEffect(() => {
    if (formData.travelAnxiety === "1") {
      // Map the values to their text representations
      const initialSeverityText = formData.anxietyInitialSeverity === "1" ? "mild" :
                                formData.anxietyInitialSeverity === "2" ? "moderate" :
                                "severe";
                                
      const currentSeverityText = formData.anxietyCurrentSeverity === "1" ? "mild" :
                                formData.anxietyCurrentSeverity === "2" ? "moderate" :
                                formData.anxietyCurrentSeverity === "3" ? "severe" :
                                "resolved";
      
      let text = `Claimant suffered from travel anxiety after the accident. Initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
      
      // Add symptoms if any
      if (formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0) {
        // Convert IDs to readable symptoms
        const readableSymptoms = formData.travelAnxietySymptoms.map(symptom => {
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
            default: return symptom;
          }
        });
        text += ` Symptoms include: ${readableSymptoms.join(", ")}.`;
      }
      
      // Add resolution days if anxiety has resolved
      if (formData.anxietyCurrentSeverity === "4" && formData.anxietyResolveDays) {
        text += ` Claimant's travel anxiety resolved in ${formData.anxietyResolveDays} days.`;
      }
      
      // Add history information
      if (formData.hasAnxietyHistory === "yes") {
        text += " Claimant had previous history of travel anxiety before the accident.";
        if (formData.anxietyPastHistory) {
          text += ` History details: ${formData.anxietyPastHistory}.`;
        }
      } else if (formData.hasAnxietyHistory === "no") {
        text += " Claimant did not have previous history of travel anxiety before the accident.";
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not suffer from travel anxiety after the accident.");
    }
  }, [formData]);

  return summaryText ? (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <p className="text-xs text-gray-600 italic">{summaryText}</p>
    </div>
  ) : null;
}
