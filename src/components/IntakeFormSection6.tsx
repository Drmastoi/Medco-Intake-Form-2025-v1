
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HeadacheStart } from "./headache/HeadacheStart";
import { HeadacheSeverity } from "./headache/HeadacheSeverity";
import { HeadacheHistory } from "./headache/HeadacheHistory";

export function IntakeFormSection6({ form }: { form: any }) {
  const headache = form.watch("headache");
  const headacheCurrentSeverity = form.watch("headacheCurrentSeverity");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Headache Information</h2>
      
      <FormField
        control={form.control}
        name="headache"
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
              <FormLabel>Did you get Any Headache?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {headache === "1" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <HeadacheStart form={form} />
            <HeadacheSeverity 
              form={form}
              name="headacheInitialSeverity"
              label="Initial Severity of pain"
            />
          </div>

          <div className="space-y-4">
            <HeadacheSeverity 
              form={form}
              name="headacheCurrentSeverity"
              label="Current Severity of pain"
              includeResolved={true}
            />

            {headacheCurrentSeverity === "4" && (
              <FormField
                control={form.control}
                name="headacheResolveDays"
                rules={{ required: "This field is required when pain is resolved" }}
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
          </div>
        </div>
      )}

      <HeadacheHistory form={form} />
    </div>
  );
}
