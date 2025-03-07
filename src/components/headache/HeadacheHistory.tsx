
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function HeadacheHistory({ form }: { form: any }) {
  const hasHeadacheHistory = form.watch("hasHeadacheHistory");

  return (
    <>
      <FormField
        control={form.control}
        name="hasHeadacheHistory"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Do you have any past medical history of headache before the accident?</FormLabel>
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

      {hasHeadacheHistory === "yes" && (
        <FormField
          control={form.control}
          name="headachePastHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please describe your past medical history of headache</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter past medical history" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
