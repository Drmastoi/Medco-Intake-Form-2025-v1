
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export function IntakeFormSection8({ form }: { form: any }) {
  const hasBruising = form.watch("hasBruising");
  const bruisingLocation = form.watch("bruisingLocation");
  const bruisingNoticed = form.watch("bruisingNoticed");
  const bruisingInitialSeverity = form.watch("bruisingInitialSeverity");
  const bruisingCurrentSeverity = form.watch("bruisingCurrentSeverity");
  const bruisingResolveDays = form.watch("bruisingResolveDays");
  const hasVisibleScar = form.watch("hasVisibleScar");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    if (hasBruising === "1") {
      const noticedText = bruisingNoticed === "1" ? "same day" : 
                         bruisingNoticed === "2" ? "next day" : 
                         "few days later";
                        
      const initialSeverityText = bruisingInitialSeverity === "1" ? "mild" :
                                 bruisingInitialSeverity === "2" ? "moderate" :
                                 "severe";
                                 
      const currentSeverityText = bruisingCurrentSeverity === "1" ? "mild" :
                                 bruisingCurrentSeverity === "2" ? "moderate" :
                                 bruisingCurrentSeverity === "3" ? "severe" :
                                 "resolved";
      
      let text = `Claimant had bruising or scarring at ${bruisingLocation} after the accident. It was noticed on the ${noticedText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
      
      // Add resolution days if bruising has resolved
      if (bruisingCurrentSeverity === "4" && bruisingResolveDays) {
        text += ` The bruising resolved in ${bruisingResolveDays} days.`;
      }
      
      // Add scar information
      if (hasVisibleScar === "1") {
        text += " There is a visible scar remaining.";
      } else if (hasVisibleScar === "2") {
        text += " There is no visible scar remaining.";
      }
      
      setSummaryText(text);
    } else {
      setSummaryText("Claimant did not have any bruising or scarring from the accident.");
    }
  }, [hasBruising, bruisingLocation, bruisingNoticed, bruisingInitialSeverity, bruisingCurrentSeverity, bruisingResolveDays, hasVisibleScar]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Bruising and Scarring Information</h2>
      
      <FormField
        control={form.control}
        name="hasBruising"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value === "1"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "1" : "2");
                  // Set default values when checked
                  if (checked) {
                    form.setValue("bruisingNoticed", "1"); // Same day
                    form.setValue("bruisingInitialSeverity", "1"); // Mild
                    form.setValue("bruisingCurrentSeverity", "1"); // Mild
                    form.setValue("hasVisibleScar", "2"); // No
                  }
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Is there Any Bruising or Scarring on the body due to this accident?</FormLabel>
              <FormDescription className="text-gray-500">
                Please select this if you experienced bruising or scarring due to the accident
              </FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {hasBruising === "1" && (
        <>
          <FormField
            control={form.control}
            name="bruisingLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location of bruising or scar</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter location details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bruisingNoticed"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>When did you notice it?</FormLabel>
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
            name="bruisingInitialSeverity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Severity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select initial severity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Mild</SelectItem>
                    <SelectItem value="2">Moderate</SelectItem>
                    <SelectItem value="3">Severe</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bruisingCurrentSeverity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Severity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current severity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Mild</SelectItem>
                    <SelectItem value="2">Moderate</SelectItem>
                    <SelectItem value="3">Severe</SelectItem>
                    <SelectItem value="4">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bruisingResolveDays"
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

          <FormField
            control={form.control}
            name="hasVisibleScar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is there any visible scar?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select yes or no" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="2">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      
      {/* Dynamic Summary Text */}
      {summaryText && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-xs text-gray-600 italic">{summaryText}</p>
        </div>
      )}
    </div>
  );
}
