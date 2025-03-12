
import { TravelAnxietyInitial } from "./travel-anxiety/TravelAnxietyInitial";
import { AnxietyTiming } from "./travel-anxiety/AnxietyTiming";
import { AnxietySeverity } from "./travel-anxiety/AnxietySeverity";
import { AnxietyHistory } from "./travel-anxiety/AnxietyHistory";
import { TravelAnxietySymptoms } from "./travel-anxiety/TravelAnxietySymptoms";
import { useEffect, useState } from "react";

export function IntakeFormSection7({ form }: { form: any }) {
  const travelAnxiety = form.watch("travelAnxiety");
  const anxietyInitialSeverity = form.watch("anxietyInitialSeverity");
  const anxietyCurrentSeverity = form.watch("anxietyCurrentSeverity");
  const anxietyResolveDays = form.watch("anxietyResolveDays");
  const travelAnxietySymptoms = form.watch("travelAnxietySymptoms");
  const hasAnxietyHistory = form.watch("hasAnxietyHistory");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    if (travelAnxiety === "1") {
      // Map the values to their text representations
      const initialSeverityText = anxietyInitialSeverity === "1" ? "mild" :
                                 anxietyInitialSeverity === "2" ? "moderate" :
                                 "severe";
                                 
      const currentSeverityText = anxietyCurrentSeverity === "1" ? "mild" :
                                 anxietyCurrentSeverity === "2" ? "moderate" :
                                 anxietyCurrentSeverity === "3" ? "severe" :
                                 "resolved";
      
      let text = `Claimant suffered from travel anxiety after the accident. Initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
      
      // Add symptoms if any
      if (travelAnxietySymptoms && travelAnxietySymptoms.length > 0) {
        text += ` Symptoms include: ${travelAnxietySymptoms.join(", ")}.`;
      }
      
      // Add resolution days if anxiety has resolved
      if (anxietyCurrentSeverity === "4" && anxietyResolveDays) {
        text += ` Claimant's travel anxiety resolved in ${anxietyResolveDays} days.`;
      }
      
      // Add history information
      if (hasAnxietyHistory === "yes") {
        text += " Claimant had previous history of travel anxiety before the accident.";
      } else if (hasAnxietyHistory === "no") {
        text += " Claimant did not have previous history of travel anxiety before the accident.";
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not suffer from travel anxiety after the accident.");
    }
  }, [travelAnxiety, anxietyInitialSeverity, anxietyCurrentSeverity, anxietyResolveDays, travelAnxietySymptoms, hasAnxietyHistory]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Travel Anxiety Information</h2>
      
      <TravelAnxietyInitial form={form} />

      {travelAnxiety === "1" && (
        <>
          <TravelAnxietySymptoms form={form} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnxietyTiming form={form} />
            <div className="space-y-4">
              <AnxietySeverity form={form} isInitial={true} />
              <AnxietySeverity form={form} isInitial={false} />
            </div>
          </div>
        </>
      )}

      <AnxietyHistory form={form} />
      
      {/* Dynamic Summary Text */}
      {summaryText && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-xs text-gray-600 italic">{summaryText}</p>
        </div>
      )}
    </div>
  );
}
