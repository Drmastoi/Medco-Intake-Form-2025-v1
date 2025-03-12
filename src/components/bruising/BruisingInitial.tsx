
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function BruisingInitial({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="hasBruising"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value === "1"}
              onCheckedChange={(checked) => {
                field.onChange(checked ? "1" : "2");
                // Set default values when checked
                if (checked) {
                  form.setValue("bruisingNoticed", "1"); // Same day
                  form.setValue("bruisingInitialSeverity", "1"); // Mild
                  form.setValue("bruisingCurrentSeverity", "1"); // Mild
                  form.setValue("hasVisibleScar", "2"); // No
                }
              }}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Is there Any Bruising or Scarring on the body due to this accident?</FormLabel>
            <FormDescription className="text-gray-500">
              Please select this if you experienced bruising or scarring due to the accident
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
