
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
          <FormItem className="space-y-3">
            <FormLabel>Do you have any past medical history of anxiety before the accident?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
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
