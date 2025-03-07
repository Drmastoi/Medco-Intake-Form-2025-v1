import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function IntakeFormSection9({ form }: { form: any }) {
  const hasOtherInjury = form.watch("hasOtherInjury");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Other Injuries Information</h2>
      
      <FormField
        control={form.control}
        name="hasOtherInjury"
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
              <FormLabel>Any Other Injury?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {hasOtherInjury === "1" && (
        <>
          <FormField
            control={form.control}
            name="injuryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of injury</FormLabel>
                <FormControl>
                  <Input placeholder="Enter injury name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="injuryStart"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>When did this injury start?</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "1"}
                        onCheckedChange={() => field.onChange("1")}
                      />
                      <label>Same day</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "2"}
                        onCheckedChange={() => field.onChange("2")}
                      />
                      <label>Next Day</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "3"}
                        onCheckedChange={() => field.onChange("3")}
                      />
                      <label>Few days Later</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="injuryInitialSeverity"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Initial Severity</FormLabel>
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
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="injuryCurrentSeverity"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Current Severity</FormLabel>
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
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "4"}
                        onCheckedChange={() => field.onChange("4")}
                      />
                      <label>Resolved</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="injuryResolveDays"
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
        </>
      )}
    </div>
  );
}