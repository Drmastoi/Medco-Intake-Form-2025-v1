
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

export function MedicalConditionsSection({ form }: { form: any }) {
  const exceptionalInjuries = form.watch("exceptionalInjuries");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Medical Conditions & Additional Information</h3>
      
      <FormField
        control={form.control}
        name="previousConditionWorse"
        render={({ field }) => (
          <FormItem className="rounded-md border p-4 bg-card/30 shadow-sm">
            <FormLabel>Previous medical conditions worsened by this accident</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter details if yes, or leave blank if none" 
                {...field} 
                className="bg-white resize-none h-24"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="exceptionalInjuries"
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
              <FormLabel>Exceptionally severe physical or psychological injuries?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {exceptionalInjuries === "1" && (
        <FormField
          control={form.control}
          name="exceptionalInjuriesDetails"
          render={({ field }) => (
            <FormItem className="rounded-md border p-4 bg-card/30 shadow-sm">
              <FormLabel>Please explain why they are exceptionally severe</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide details"
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
