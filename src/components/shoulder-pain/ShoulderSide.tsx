
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function ShoulderSide({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="shoulderSide"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Which side of shoulder?</FormLabel>
          <FormControl>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value === "1"}
                  onCheckedChange={() => field.onChange("1")}
                />
                <label>Left</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value === "2"}
                  onCheckedChange={() => field.onChange("2")}
                />
                <label>Right</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value === "3"}
                  onCheckedChange={() => field.onChange("3")}
                />
                <label>Both</label>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
