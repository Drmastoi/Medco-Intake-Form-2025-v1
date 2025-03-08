
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface HouseholdFieldsProps {
  form: any;
}

export function HouseholdFields({ form }: HouseholdFieldsProps) {
  const [showOtherLivingWithField, setShowOtherLivingWithField] = useState(false);
  
  return (
    <>
      <FormField
        control={form.control}
        name="livingWith"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Who Lives with You at Home</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Wife</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>Husband</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "3"}
                    onCheckedChange={() => field.onChange("3")}
                  />
                  <label>Partner</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "4"}
                    onCheckedChange={() => field.onChange("4")}
                  />
                  <label>Parents</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "5"}
                    onCheckedChange={() => field.onChange("5")}
                  />
                  <label>Alone</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "6"}
                    onCheckedChange={(checked) => {
                      setShowOtherLivingWithField(checked === true);
                      if (checked) field.onChange("6");
                    }}
                  />
                  <label>Other</label>
                </div>
                {showOtherLivingWithField && (
                  <Input 
                    placeholder="Please specify who lives with you"
                    className="ml-6 mt-2"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="childrenCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Children at Home</FormLabel>
            <FormControl>
              <Input type="number" min="0" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
