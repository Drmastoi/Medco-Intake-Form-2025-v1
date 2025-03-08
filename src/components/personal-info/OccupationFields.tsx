
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface OccupationFieldsProps {
  form: any;
}

export function OccupationFields({ form }: OccupationFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Occupation</FormLabel>
            <FormControl>
              <Input placeholder="Enter your occupation" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="workType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Work Type</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Full Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>Part Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "3"}
                    onCheckedChange={() => field.onChange("3")}
                  />
                  <label>N/A</label>
                </div>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
