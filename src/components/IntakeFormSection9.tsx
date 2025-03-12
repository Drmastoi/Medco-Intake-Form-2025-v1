
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export function IntakeFormSection9({ form }: { form: any }) {
  const hasOtherInjury = form.watch("hasOtherInjury");
  const injuryName = form.watch("injuryName");
  const injuryStart = form.watch("injuryStart");
  const injuryInitialSeverity = form.watch("injuryInitialSeverity");
  const injuryCurrentSeverity = form.watch("injuryCurrentSeverity");
  const injuryResolveDays = form.watch("injuryResolveDays");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    if (hasOtherInjury === "1" && injuryName) {
      const startText = injuryStart === "1" ? "same day" : 
                      injuryStart === "2" ? "next day" : 
                      "few days later";
                      
      const initialSeverityText = injuryInitialSeverity === "1" ? "mild" :
                               injuryInitialSeverity === "2" ? "moderate" :
                               "severe";
                               
      const currentSeverityText = injuryCurrentSeverity === "1" ? "mild" :
                               injuryCurrentSeverity === "2" ? "moderate" :
                               injuryCurrentSeverity === "3" ? "severe" :
                               "resolved";
      
      let text = `Claimant suffered from ${injuryName} after the accident. It started ${startText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
      
      // Add resolution days if injury has resolved
      if (injuryCurrentSeverity === "4" && injuryResolveDays) {
        text += ` This injury resolved in ${injuryResolveDays} days.`;
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not suffer from any other injuries after the accident.");
    }
  }, [hasOtherInjury, injuryName, injuryStart, injuryInitialSeverity, injuryCurrentSeverity, injuryResolveDays]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Other Injuries Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="hasOtherInjury"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? "1" : "2");
                      // Set default values when checked
                      if (checked) {
                        form.setValue("injuryStart", "1"); // Same day
                        form.setValue("injuryInitialSeverity", "1"); // Mild
                        form.setValue("injuryCurrentSeverity", "1"); // Mild
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Any Other Injury?</FormLabel>
                  <FormDescription className="text-gray-500">
                    Please select this if you experienced any other injuries due to the accident
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {hasOtherInjury === "1" && (
            <>
              <FormField
                control={form.control}
                name="injuryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of injury</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter injury name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="injuryStart"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>When did this injury start?</FormLabel>
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
            </>
          )}
        </div>

        <div className="space-y-4">
          {hasOtherInjury === "1" && (
            <>
              <FormField
                control={form.control}
                name="injuryInitialSeverity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Initial Severity</FormLabel>
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
                name="injuryCurrentSeverity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Current Severity</FormLabel>
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

              <FormField
                control={form.control}
                name="injuryResolveDays"
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
