
import { useEffect, useState } from "react";

interface BruisingFormData {
  hasBruising: string;
  bruisingLocation: string;
  bruisingNoticed: string;
  bruisingInitialSeverity: string;
  bruisingCurrentSeverity: string;
  bruisingResolveDays: string;
  hasVisibleScar: string;
}

export function BruisingSummary({ formData }: { formData: BruisingFormData }) {
  const [summaryText, setSummaryText] = useState<string>("");
  
  useEffect(() => {
    if (formData.hasBruising === "1") {
      const noticedText = formData.bruisingNoticed === "1" ? "same day" : 
                         formData.bruisingNoticed === "2" ? "next day" : 
                         "few days later";
                        
      const initialSeverityText = formData.bruisingInitialSeverity === "1" ? "mild" :
                                 formData.bruisingInitialSeverity === "2" ? "moderate" :
                                 "severe";
                                 
      const currentSeverityText = formData.bruisingCurrentSeverity === "1" ? "mild" :
                                 formData.bruisingCurrentSeverity === "2" ? "moderate" :
                                 formData.bruisingCurrentSeverity === "3" ? "severe" :
                                 "resolved";
      
      let text = `Claimant had bruising or scarring at ${formData.bruisingLocation} after the accident. It was noticed on the ${noticedText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
      
      if (formData.bruisingCurrentSeverity === "4" && formData.bruisingResolveDays) {
        text += ` The bruising resolved in ${formData.bruisingResolveDays} days.`;
      }
      
      if (formData.hasVisibleScar === "1") {
        text += " There is a visible scar remaining.";
      } else if (formData.hasVisibleScar === "2") {
        text += " There is no visible scar remaining.";
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not have any bruising or scarring from the accident.");
    }
  }, [formData]);

  return summaryText ? (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <p className="text-xs text-gray-600 italic">{summaryText}</p>
    </div>
  ) : null;
}
