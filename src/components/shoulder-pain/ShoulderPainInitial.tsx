
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function ShoulderPainInitial({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="shoulderPain"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value === "1"}
              onCheckedChange={(checked) => {
                field.onChange(checked ? "1" : "2");
                // Set default values for shoulder pain fields when checked
                if (checked) {
                  form.setValue("shoulderPainStart", "1"); // Same day
                  form.setValue("shoulderPainInitialSeverity", "1"); // Mild
                  form.setValue("shoulderPainCurrentSeverity", "1"); // Mild
                  form.setValue("hadPriorShoulderPain", "2"); // No
                  form.setValue("shoulderSide", "1"); // Left
                }
              }}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Did you get Any Shoulder Pain?</FormLabel>
            <FormDescription className="text-gray-500">
              Please select this option if you experienced shoulder pain due to the accident
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
