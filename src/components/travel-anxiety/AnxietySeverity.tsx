
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface AnxietySeverityProps {
  form: any;
  isInitial?: boolean;
}

export function AnxietySeverity({ form, isInitial = false }: AnxietySeverityProps) {
  const fieldName = isInitial ? "anxietyInitialSeverity" : "anxietyCurrentSeverity";
  const label = isInitial ? "Initial Severity of travel anxiety" : "Current Severity of travel anxiety";
  const currentSeverity = form.watch("anxietyCurrentSeverity");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={fieldName}
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
                {!isInitial && (
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
          name="anxietyResolveDays"
          rules={{
            required: "Please enter the number of days it took to resolve"
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                If resolved, how many days did it take to resolve?
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter number of days" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
