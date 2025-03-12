
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";

export function IntakeFormSection12({ form }: { form: any }) {
  const previousAccident = form.watch("previousAccident");
  const additionalInformation = form.watch("additionalInformation");
  const previousAccidentDate = form.watch("previousAccidentDate");
  const previousAccidentRecovery = form.watch("previousAccidentRecovery");
  const previousInjuriesWorse = form.watch("previousInjuriesWorse");
  const previousConditionWorse = form.watch("previousConditionWorse");
  const additionalInformationDetails = form.watch("additionalInformationDetails");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    let text = "Medical History Summary: ";
    
    // Previous accident
    if (previousAccident === "1") {
      text += "The claimant reports having been involved in a previous road traffic accident";
      
      if (previousAccidentDate) {
        // Format the date for display
        const formattedDate = new Date(previousAccidentDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        text += ` on ${formattedDate}`;
      }
      text += ". ";
      
      // Recovery from previous accident
      if (previousAccidentRecovery === "1") {
        text += "They report having made a complete recovery from that accident. ";
      } else if (previousAccidentRecovery === "2") {
        text += "They report that they had not made a complete recovery from that accident. ";
      }
      
      // Effect of current accident on previous injuries
      if (previousInjuriesWorse === "1") {
        text += "The claimant reports that the current accident has made their previous injuries worse. ";
      } else if (previousInjuriesWorse === "2") {
        text += "The claimant reports that the current accident has not made their previous injuries worse. ";
      }
    } else {
      text += "The claimant reports no previous road traffic accidents. ";
    }
    
    // Previous medical conditions
    if (previousConditionWorse) {
      text += `The claimant reports having previous medical conditions that have been made worse by this accident: ${previousConditionWorse}. `;
    } else {
      text += "The claimant has not reported any pre-existing medical conditions that have been exacerbated by this accident. ";
    }
    
    // Additional information
    if (additionalInformation === "1" && additionalInformationDetails) {
      text += `Additional information provided by the claimant: ${additionalInformationDetails}.`;
    }
    
    setSummaryText(text);
  }, [
    previousAccident,
    previousAccidentDate,
    previousAccidentRecovery,
    previousInjuriesWorse,
    previousConditionWorse,
    additionalInformation,
    additionalInformationDetails
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Previous Medical History</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="previousAccident"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? "1" : "2");
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Did you have previous road traffic accident?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {previousAccident === "1" && (
            <FormField
              control={form.control}
              name="previousAccidentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When was it?</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="previousAccidentRecovery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Did you recover completely from previous accident?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="previousInjuriesWorse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Has this accident made previous injuries worse?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousConditionWorse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any previous medical condition which is worse because of this accident?</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter details if yes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInformation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? "1" : "2");
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is there anything else you want to add?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {additionalInformation === "1" && (
            <FormField
              control={form.control}
              name="additionalInformationDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter additional details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
