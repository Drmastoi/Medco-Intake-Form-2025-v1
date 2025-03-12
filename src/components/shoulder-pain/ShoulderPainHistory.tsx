
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function ShoulderPainHistory({ form }: { form: any }) {
  const hadPriorShoulderPain = form.watch("hadPriorShoulderPain");

  return (
    <>
      <FormField
        control={form.control}
        name="hadPriorShoulderPain"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Did you have shoulder pain before this accident?</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>No</label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {hadPriorShoulderPain === "1" && (
        <div className="space-y-4 border p-4 rounded-md">
          <p className="text-sm text-gray-500">
            Please indicate what percentage of your current shoulder pain is attributable to this accident versus your previous condition:
          </p>
          
          <FormField
            control={form.control}
            name="accidentShoulderPainPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentage due to this accident (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g. 50" 
                    min="0" 
                    max="100" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Enter a value between 0-100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priorShoulderPainPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentage due to previous condition (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g. 50" 
                    min="0" 
                    max="100" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Enter a value between 0-100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </>
  );
}
