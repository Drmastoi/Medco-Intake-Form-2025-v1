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

export function IntakeFormSection4({ form }: { form: any }) {
  const shoulderPain = form.watch("shoulderPain");
  const shoulderPainStart = form.watch("shoulderPainStart");
  const shoulderPainInitialSeverity = form.watch("shoulderPainInitialSeverity");
  const shoulderPainCurrentSeverity = form.watch("shoulderPainCurrentSeverity");
  const hadPriorShoulderPain = form.watch("hadPriorShoulderPain");
  const accidentShoulderPainPercentage = form.watch("accidentShoulderPainPercentage");
  const priorShoulderPainPercentage = form.watch("priorShoulderPainPercentage");
  const shoulderSide = form.watch("shoulderSide");
  const shoulderPainResolveDays = form.watch("shoulderPainResolveDays");
  
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
  }, [shoulderPain, shoulderSide, shoulderPainStart, shoulderPainInitialSeverity, shoulderPainCurrentSeverity, hadPriorShoulderPain, accidentShoulderPainPercentage, priorShoulderPainPercentage, shoulderPainResolveDays]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Shoulder Pain Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="shoulderPain"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? "1" : "2");
                      // Set default values for shoulder pain fields when checked
                      if (checked) {
                        form.setValue("shoulderPainStart", "1"); // Same day
                        form.setValue("shoulderPainInitialSeverity", "1"); // Mild
                        form.setValue("shoulderPainCurrentSeverity", "1"); // Mild
                        form.setValue("hadPriorShoulderPain", "2"); // No
                        form.setValue("shoulderSide", "1"); // Left
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Did you get Any Shoulder Pain?</FormLabel>
                  <FormDescription className="text-gray-500">
                    Please select this option if you experienced shoulder pain due to the accident
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {shoulderPain === "1" && (
            <>
              <FormField
                control={form.control}
                name="shoulderSide"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Which side of shoulder?</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "1"}
                            onCheckedChange={() => field.onChange("1")}
                          />
                          <label>Left</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "2"}
                            onCheckedChange={() => field.onChange("2")}
                          />
                          <label>Right</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "3"}
                            onCheckedChange={() => field.onChange("3")}
                          />
                          <label>Both</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shoulderPainStart"
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
                name="shoulderPainInitialSeverity"
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
                name="hadPriorShoulderPain"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Did you have shoulder pain before this accident?</FormLabel>
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

              {hadPriorShoulderPain === "1" && (
                <div className="space-y-4 border p-4 rounded-md">
                  <p className="text-sm text-gray-500">
                    Please indicate what percentage of your current shoulder pain is attributable to this accident versus your previous condition:
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="accidentShoulderPainPercentage"
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
                    name="priorShoulderPainPercentage"
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
          {shoulderPain === "1" && (
            <>
              <FormField
                control={form.control}
                name="shoulderPainCurrentSeverity"
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

              {shoulderPainCurrentSeverity === "4" && (
                <FormField
                  control={form.control}
                  name="shoulderPainResolveDays"
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
