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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function IntakeFormSection6({ form }: { form: any }) {
  const headache = form.watch("headache");
  const headacheCurrentSeverity = form.watch("headacheCurrentSeverity");
  const hasHeadacheHistory = form.watch("hasHeadacheHistory");

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
        <>
          <FormField
            control={form.control}
            name="headacheStart"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>When did this pain start?</FormLabel>
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
            name="headacheInitialSeverity"
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
            name="headacheCurrentSeverity"
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

          <FormField
            control={form.control}
            name="headachePastHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Past Medical History of headache before the accident</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter past medical history" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="hasHeadacheHistory"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Do you have any past medical history of headache before the accident?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {hasHeadacheHistory === "yes" && (
        <FormField
          control={form.control}
          name="headachePastHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please describe your past medical history of headache</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter past medical history" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
