
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AnxietyTimingProps {
  form: any;
}

export function AnxietyTiming({ form }: AnxietyTimingProps) {
  return (
    <FormField
      control={form.control}
      name="anxietyResolveDays"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            How long did it take for your travel anxiety to resolve? (days)
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Number of days"
              min="0"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
