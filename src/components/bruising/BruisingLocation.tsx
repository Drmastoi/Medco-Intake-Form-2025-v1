
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function BruisingLocation({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="bruisingLocation"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location of bruising or scar</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter location details" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
