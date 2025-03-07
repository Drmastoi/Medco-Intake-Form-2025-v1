
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function TravelAnxietyInitial({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="travelAnxiety"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value === "1"}
              onCheckedChange={(checked) => {
                field.onChange(checked ? "1" : "2");
              }}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Did you experience Travel Anxiety after the accident?</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
