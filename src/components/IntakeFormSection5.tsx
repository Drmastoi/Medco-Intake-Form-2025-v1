
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

export function IntakeFormSection5({ form }: { form: any }) {
  const backPain = form.watch("backPain");
  const backLocation = form.watch("backLocation");
  const backPainStart = form.watch("backPainStart");
  const backPainInitialSeverity = form.watch("backPainInitialSeverity");
  const backPainCurrentSeverity = form.watch("backPainCurrentSeverity");
  const backPainResolveDays = form.watch("backPainResolveDays");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Helper function to get location text
  const getBackLocationText = (code: string) => {
    switch(code) {
      case "1": return "upper back";
      case "2": return "middle back";
      case "3": return "lower back";
      case "4": return "all over back";
      default: return "back";
    }
  };
  
  // Generate summary text based on selected options
  useEffect(() => {
    if (backPain === "1") {
      // Map the values to their text representations
      const locationText = getBackLocationText(backLocation);
                      
      const startText = backPainStart === "1" ? "same day" : 
                        backPainStart === "2" ? "next day" : 
                        "few days later";
                        
      const initialSeverityText = backPainInitialSeverity === "1" ? "mild" :
                                 backPainInitialSeverity === "2" ? "moderate" :
                                 "severe";
                                 
      const currentSeverityText = backPainCurrentSeverity === "1" ? "mild" :
                                 backPainCurrentSeverity === "2" ? "moderate" :
                                 backPainCurrentSeverity === "3" ? "severe" :
                                 "resolved";
      
      let text = `Claimant suffered from ${locationText} pain after the accident. It started ${startText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
      
      // Add resolution days if pain has resolved
      if (backPainCurrentSeverity === "4" && backPainResolveDays) {
        text += ` Claimant's back pain resolved in ${backPainResolveDays} days.`;
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not suffer from back pain after the accident.");
    }
  }, [backPain, backLocation, backPainStart, backPainInitialSeverity, backPainCurrentSeverity, backPainResolveDays]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Back Pain Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="backPain"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? "1" : "2");
                      // Set default values for back pain fields when checked
                      if (checked) {
                        form.setValue("backLocation", "1"); // Upper back
                        form.setValue("backPainStart", "1"); // Same day
                        form.setValue("backPainInitialSeverity", "1"); // Mild
                        form.setValue("backPainCurrentSeverity", "1"); // Mild
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Did you get Any Back Pain?</FormLabel>
                  <FormDescription className="text-gray-500">
                    Please select this option if you experienced back pain due to the accident
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {backPain === "1" && (
            <>
              <FormField
                control={form.control}
                name="backLocation"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Where in the back?</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "1"}
                            onCheckedChange={() => field.onChange("1")}
                          />
                          <label>Upper back</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "2"}
                            onCheckedChange={() => field.onChange("2")}
                          />
                          <label>Middle Back</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "3"}
                            onCheckedChange={() => field.onChange("3")}
                          />
                          <label>Lower Back</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value === "4"}
                            onCheckedChange={() => field.onChange("4")}
                          />
                          <label>All over back</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backPainInitialSeverity"
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
            </>
          )}
        </div>

        <div className="space-y-4">
          {backPain === "1" && (
            <>
              <FormField
                control={form.control}
                name="backPainCurrentSeverity"
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

              {backPainCurrentSeverity === "4" && (
                <FormField
                  control={form.control}
                  name="backPainResolveDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>If resolved, how many days did it take to resolve?</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter number of days" {...field} />
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
