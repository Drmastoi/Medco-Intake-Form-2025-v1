
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
import { HeadacheStart } from "./headache/HeadacheStart";
import { HeadacheSeverity } from "./headache/HeadacheSeverity";
import { HeadacheHistory } from "./headache/HeadacheHistory";
import { useEffect, useState } from "react";

export function IntakeFormSection6({ form }: { form: any }) {
  const headache = form.watch("headache");
  const headacheStart = form.watch("headacheStart");
  const headacheInitialSeverity = form.watch("headacheInitialSeverity");
  const headacheCurrentSeverity = form.watch("headacheCurrentSeverity");
  const headacheResolveDays = form.watch("headacheResolveDays");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    if (headache === "1") {
      // Map the values to their text representations
      const startText = headacheStart === "1" ? "same day" : 
                        headacheStart === "2" ? "next day" : 
                        "few days later";
                        
      const initialSeverityText = headacheInitialSeverity === "1" ? "mild" :
                                 headacheInitialSeverity === "2" ? "moderate" :
                                 "severe";
                                 
      const currentSeverityText = headacheCurrentSeverity === "1" ? "mild" :
                                 headacheCurrentSeverity === "2" ? "moderate" :
                                 headacheCurrentSeverity === "3" ? "severe" :
                                 "resolved";
      
      let text = `Claimant suffered from headache after the accident. It started ${startText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
      
      // Add resolution days if pain has resolved
      if (headacheCurrentSeverity === "4" && headacheResolveDays) {
        text += ` Claimant's headache resolved in ${headacheResolveDays} days.`;
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not suffer from headache after the accident.");
    }
  }, [headache, headacheStart, headacheInitialSeverity, headacheCurrentSeverity, headacheResolveDays]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Headache Information</h2>
      
      <FormField
        control={form.control}
        name="headache"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value === "1"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "1" : "2");
                  // Set default values for headache fields when checked
                  if (checked) {
                    form.setValue("headacheStart", "1"); // Same day
                    form.setValue("headacheInitialSeverity", "1"); // Mild
                    form.setValue("headacheCurrentSeverity", "1"); // Mild
                  }
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Did you get Any Headache?</FormLabel>
              <FormDescription className="text-gray-500">
                Please select this option if you experienced headache due to the accident
              </FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {headache === "1" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <HeadacheStart form={form} />
            <HeadacheSeverity 
              form={form}
              name="headacheInitialSeverity"
              label="Initial Severity of pain"
            />
          </div>

          <div className="space-y-4">
            <HeadacheSeverity 
              form={form}
              name="headacheCurrentSeverity"
              label="Current Severity of pain"
              includeResolved={true}
            />

            {headacheCurrentSeverity === "4" && (
              <FormField
                control={form.control}
                name="headacheResolveDays"
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
          </div>
        </div>
      )}

      <HeadacheHistory form={form} />
      
      {/* Dynamic Summary Text */}
      {summaryText && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-xs text-gray-600 italic">{summaryText}</p>
        </div>
      )}
    </div>
  );
}
