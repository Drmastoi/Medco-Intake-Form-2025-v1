import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function IntakeFormSection5({ form }: { form: any }) {
  const backPain = form.watch("backPain");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Back Pain Information</h2>
      
      <FormField
        control={form.control}
        name="backPain"
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
              <FormLabel>Did you get Any Back Pain?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {backPain === "1" && (
        <>
          <FormField
            control={form.control}
            name="backLocation"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Where in the back?</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "1"}
                        onCheckedChange={() => field.onChange("1")}
                      />
                      <label>Upper back</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "2"}
                        onCheckedChange={() => field.onChange("2")}
                      />
                      <label>Middle Back</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "3"}
                        onCheckedChange={() => field.onChange("3")}
                      />
                      <label>Lower Back</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "4"}
                        onCheckedChange={() => field.onChange("4")}
                      />
                      <label>All over back</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="backPainStart"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>When did this back pain start?</FormLabel>
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
            name="backPainInitialSeverity"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Initial Severity of pain</FormLabel>
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
            name="backPainCurrentSeverity"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Current Severity of pain</FormLabel>
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
            name="backPainResolveDays"
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