
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function AnxietyHistory({ form }: { form: any }) {
  const hasAnxietyHistory = form.watch("hasAnxietyHistory");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="hasAnxietyHistory"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <RadioGroupItem
                value="yes"
                checked={field.value === "yes"}
                onClick={() => field.onChange(field.value === "yes" ? "no" : "yes")}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Do you have any past medical history of anxiety before the accident?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {hasAnxietyHistory === "yes" && (
        <FormField
          control={form.control}
          name="anxietyPastHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please describe your past medical history of anxiety</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter past medical history" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
