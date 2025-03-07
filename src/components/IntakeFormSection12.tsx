import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function IntakeFormSection12({ form }: { form: any }) {
  const previousAccident = form.watch("previousAccident");
  const additionalInformation = form.watch("additionalInformation");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Previous Medical History</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="previousAccident"
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
                  <FormLabel>Did you have previous road traffic accident?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {previousAccident === "1" && (
            <FormField
              control={form.control}
              name="previousAccidentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When was it?</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="previousAccidentRecovery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Did you recover completely from previous accident?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="previousInjuriesWorse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Has this accident made previous injuries worse?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousConditionWorse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any previous medical condition which is worse because of this accident?</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter details if yes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInformation"
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
                  <FormLabel>Is there anything else you want to add?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {additionalInformation === "1" && (
            <FormField
              control={form.control}
              name="additionalInformationDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter additional details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}