import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

export function IntakeFormSection3({ form }: { form: any }) {
  const neckPain = form.watch("neckPain");
  const neckPainStart = form.watch("neckPainStart");
  const neckPainInitialSeverity = form.watch("neckPainInitialSeverity");
  const neckPainCurrentSeverity = form.watch("neckPainCurrentSeverity");
  const hadPriorNeckPain = form.watch("hadPriorNeckPain");
  const accidentNeckPainPercentage = form.watch("accidentNeckPainPercentage");
  const priorNeckPainPercentage = form.watch("priorNeckPainPercentage");
  const neckPainResolveDays = form.watch("neckPainResolveDays");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    if (neckPain === "1") {
      // Map the values to their text representations
      const startText = neckPainStart === "1" ? "same day" : 
                        neckPainStart === "2" ? "next day" : 
                        "few days later";
                        
      const initialSeverityText = neckPainInitialSeverity === "1" ? "mild" :
                                 neckPainInitialSeverity === "2" ? "moderate" :
                                 "severe";
                                 
      const currentSeverityText = neckPainCurrentSeverity === "1" ? "mild" :
                                 neckPainCurrentSeverity === "2" ? "moderate" :
                                 neckPainCurrentSeverity === "3" ? "severe" :
                                 "resolved";
      
      let text = `Claimant suffered from neck pain after the accident. It started ${startText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}. `;
      
      // Add resolution days if pain has resolved
      if (neckPainCurrentSeverity === "4" && neckPainResolveDays) {
        text += `Claimant's neck pain resolved in ${neckPainResolveDays} days. `;
      }
      
      if (hadPriorNeckPain === "1") {
        if (accidentNeckPainPercentage && priorNeckPainPercentage) {
          text += `Claimant had previous history of neck pain before the accident. ${accidentNeckPainPercentage}% of current pain is due to this accident and ${priorNeckPainPercentage}% is due to previous condition.`;
        } else {
          text += "Claimant had previous history of neck pain before the accident.";
        }
      } else {
        text += "Claimant did not have previous history of neck pain before the accident.";
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not suffer from neck pain after the accident.");
    }
  }, [neckPain, neckPainStart, neckPainInitialSeverity, neckPainCurrentSeverity, hadPriorNeckPain, accidentNeckPainPercentage, priorNeckPainPercentage, neckPainResolveDays]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="neckPain"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? "1" : "2");
                      // Set default values for neck pain fields when checked
                      if (checked) {
                        form.setValue("neckPainStart", "1"); // Same day
                        form.setValue("neckPainInitialSeverity", "1"); // Mild
                        form.setValue("neckPainCurrentSeverity", "1"); // Mild
                        form.setValue("hadPriorNeckPain", "2"); // No
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Did you get Any Neck Pain?</FormLabel>
                  <FormDescription className="text-gray-500">
                    Please select this option if you experienced neck pain due to the accident
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {neckPain === "1" && (
            <>
              <FormField
                control={form.control}
                name="neckPainStart"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>When did this pain start?</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "1"}
                            onCheckedChange={() => field.onChange("1")}
                          />
                          <label>Same day</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "2"}
                            onCheckedChange={() => field.onChange("2")}
                          />
                          <label>Next Day</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "3"}
                            onCheckedChange={() => field.onChange("3")}
                          />
                          <label>Few days Later</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="neckPainInitialSeverity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Initial Severity of pain</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "1"}
                            onCheckedChange={() => field.onChange("1")}
                          />
                          <label>Mild</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "2"}
                            onCheckedChange={() => field.onChange("2")}
                          />
                          <label>Moderate</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "3"}
                            onCheckedChange={() => field.onChange("3")}
                          />
                          <label>Severe</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hadPriorNeckPain"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Did you have neck pain before this accident?</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "1"}
                            onCheckedChange={() => field.onChange("1")}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "2"}
                            onCheckedChange={() => field.onChange("2")}
                          />
                          <label>No</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {hadPriorNeckPain === "1" && (
                <div className="space-y-4 border p-4 rounded-md">
                  <p className="text-sm text-gray-500">
                    Please indicate what percentage of your current neck pain is attributable to this accident versus your previous condition:
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="accidentNeckPainPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Percentage due to this accident (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g. 50" 
                            min="0" 
                            max="100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter a value between 0-100
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="priorNeckPainPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Percentage due to previous condition (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g. 50" 
                            min="0" 
                            max="100" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter a value between 0-100
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="space-y-4">
          {neckPain === "1" && (
            <>
              <FormField
                control={form.control}
                name="neckPainCurrentSeverity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Current Severity of pain</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "1"}
                            onCheckedChange={() => field.onChange("1")}
                          />
                          <label>Mild</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "2"}
                            onCheckedChange={() => field.onChange("2")}
                          />
                          <label>Moderate</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "3"}
                            onCheckedChange={() => field.onChange("3")}
                          />
                          <label>Severe</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "4"}
                            onCheckedChange={() => field.onChange("4")}
                          />
                          <label>Resolved</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {neckPainCurrentSeverity === "4" && (
                <FormField
                  control={form.control}
                  name="neckPainResolveDays"
                  rules={{ required: "This field is required when pain is resolved" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-red-500">* If resolved, how many days did it take to resolve?</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter number of days" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Dynamic Summary Text */}
      {summaryText && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-xs text-gray-600 italic">{summaryText}</p>
        </div>
      )}
    </div>
  );
}
