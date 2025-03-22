
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function AdditionalInformationSection({ form }: { form: any }) {
  const additionalInformation = form.watch("additionalInformation");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="additionalInformation"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-card/30 shadow-sm">
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
            <FormItem className="rounded-md border p-4 bg-card/30 shadow-sm">
              <FormLabel>Additional details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter additional details" 
                  {...field} 
                  className="bg-white resize-none h-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
