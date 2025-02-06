
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function HeadacheStart({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="headacheStart"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>When did this pain start?</FormLabel>
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
  );
}
