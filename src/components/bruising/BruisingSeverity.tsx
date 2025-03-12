
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface BruisingSeverityProps {
  form: any;
  isInitial?: boolean;
}

export function BruisingSeverity({ form, isInitial = false }: BruisingSeverityProps) {
  const fieldName = isInitial ? "bruisingInitialSeverity" : "bruisingCurrentSeverity";
  const label = isInitial ? "Initial Severity" : "Current Severity";
  const currentSeverity = form.watch("bruisingCurrentSeverity");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Mild</SelectItem>
                <SelectItem value="2">Moderate</SelectItem>
                <SelectItem value="3">Severe</SelectItem>
                {!isInitial && <SelectItem value="4">Resolved</SelectItem>}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {!isInitial && currentSeverity === "4" && (
        <FormField
          control={form.control}
          name="bruisingResolveDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If resolved, how many days did it take to resolve?</FormLabel>
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
