
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function MobileNumberField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="mobileNumber"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="font-medium">Mobile Number</FormLabel>
          <FormControl>
            <Input 
              placeholder="Enter mobile number" 
              {...field} 
              className="w-full py-2"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
