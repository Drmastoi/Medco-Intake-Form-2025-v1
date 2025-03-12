
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function TimeSpentField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="timeSpentWithClaimant"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="font-medium">Time Spent with Claimant (minutes)</FormLabel>
          <FormControl>
            <Input 
              placeholder="15" 
              {...field} 
              type="number" 
              min="1"
              className="w-full py-2"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
