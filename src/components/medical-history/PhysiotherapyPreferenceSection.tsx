
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function PhysiotherapyPreferenceSection({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="physiotherapyPreference"
      render={({ field }) => (
        <FormItem className="rounded-md border p-4 bg-card/30 shadow-sm">
          <FormLabel>Would you prefer to have physiotherapy if offered?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-1 pt-2"
            >
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <RadioGroupItem value="1" />
                </FormControl>
                <FormLabel className="font-normal">Yes</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <RadioGroupItem value="2" />
                </FormControl>
                <FormLabel className="font-normal">No</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <RadioGroupItem value="3" />
                </FormControl>
                <FormLabel className="font-normal">Already ongoing</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <RadioGroupItem value="4" />
                </FormControl>
                <FormLabel className="font-normal">Already recovered</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
