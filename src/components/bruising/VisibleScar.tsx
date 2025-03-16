
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function VisibleScar({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="hasVisibleScar"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Is there any visible scar?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ""}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select yes or no" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1">Yes</SelectItem>
              <SelectItem value="2">No</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
