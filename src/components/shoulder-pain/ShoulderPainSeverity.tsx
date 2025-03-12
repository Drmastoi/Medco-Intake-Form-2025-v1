
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface ShoulderPainSeverityProps {
  form: any;
  isInitial: boolean;
}

export function ShoulderPainSeverity({ form, isInitial }: ShoulderPainSeverityProps) {
  const name = isInitial ? "shoulderPainInitialSeverity" : "shoulderPainCurrentSeverity";
  const label = isInitial ? "Initial Severity of pain" : "Current Severity of pain";
  const includeResolved = !isInitial;
  const currentSeverity = form.watch("shoulderPainCurrentSeverity");

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Mild</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>Moderate</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "3"}
                    onCheckedChange={() => field.onChange("3")}
                  />
                  <label>Severe</label>
                </div>
                {includeResolved && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "4"}
                      onCheckedChange={() => field.onChange("4")}
                    />
                    <label>Resolved</label>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!isInitial && currentSeverity === "4" && (
        <FormField
          control={form.control}
          name="shoulderPainResolveDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-red-500">* If resolved, how many days did it take to resolve?</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter number of days" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
