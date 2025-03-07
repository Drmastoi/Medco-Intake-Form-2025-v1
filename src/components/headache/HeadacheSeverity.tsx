
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface HeadacheSeverityProps {
  form: any;
  name: string;
  label: string;
  includeResolved?: boolean;
}

export function HeadacheSeverity({ form, name, label, includeResolved = false }: HeadacheSeverityProps) {
  return (
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
  );
}
