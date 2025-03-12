
import { useEffect, useState } from "react";

interface ShoulderSummaryProps {
  formData: {
    shoulderPain: string;
    shoulderSide: string;
    shoulderPainStart: string;
    shoulderPainInitialSeverity: string;
    shoulderPainCurrentSeverity: string;
    shoulderPainResolveDays: string;
    hadPriorShoulderPain: string;
    accidentShoulderPainPercentage: string;
    priorShoulderPainPercentage: string;
  };
}

export function ShoulderSummary({ formData }: ShoulderSummaryProps) {
  const {
    shoulderPain,
    shoulderSide,
    shoulderPainStart,
    shoulderPainInitialSeverity,
    shoulderPainCurrentSeverity,
    shoulderPainResolveDays,
    hadPriorShoulderPain,
    accidentShoulderPainPercentage,
    priorShoulderPainPercentage
  } = formData;
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    if (shoulderPain === "1") {
      // Map the values to their text representations
      const sideText = shoulderSide === "1" ? "left shoulder" : 
                      shoulderSide === "2" ? "right shoulder" : 
                      "both shoulders";
                      
      const startText = shoulderPainStart === "1" ? "same day" : 
                        shoulderPainStart === "2" ? "next day" : 
                        "few days later";
                        
      const initialSeverityText = shoulderPainInitialSeverity === "1" ? "mild" :
                                 shoulderPainInitialSeverity === "2" ? "moderate" :
                                 "severe";
                                 
      const currentSeverityText = shoulderPainCurrentSeverity === "1" ? "mild" :
                                 shoulderPainCurrentSeverity === "2" ? "moderate" :
                                 shoulderPainCurrentSeverity === "3" ? "severe" :
                                 "resolved";
      
      let text = `Claimant suffered from ${sideText} pain after the accident. It started ${startText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}. `;
      
      // Add resolution days if pain has resolved
      if (shoulderPainCurrentSeverity === "4" && shoulderPainResolveDays) {
        text += `Claimant's shoulder pain resolved in ${shoulderPainResolveDays} days. `;
      }
      
      if (hadPriorShoulderPain === "1") {
        if (accidentShoulderPainPercentage && priorShoulderPainPercentage) {
          text += `Claimant had previous history of shoulder pain before the accident. ${accidentShoulderPainPercentage}% of current pain is due to this accident and ${priorShoulderPainPercentage}% is due to previous condition.`;
        } else {
          text += "Claimant had previous history of shoulder pain before the accident.";
        }
      } else {
        text += "Claimant did not have previous history of shoulder pain before the accident.";
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not suffer from shoulder pain after the accident.");
    }
  }, [
    shoulderPain, 
    shoulderSide, 
    shoulderPainStart, 
    shoulderPainInitialSeverity, 
    shoulderPainCurrentSeverity, 
    hadPriorShoulderPain, 
    accidentShoulderPainPercentage, 
    priorShoulderPainPercentage, 
    shoulderPainResolveDays
  ]);

  if (!summaryText) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <p className="text-xs text-gray-600 italic">{summaryText}</p>
    </div>
  );
}
