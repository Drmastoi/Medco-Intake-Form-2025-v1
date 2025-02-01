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

export function IntakeFormSection10({ form }: { form: any }) {
  const sceneOfAccidentTreatment = form.watch("sceneOfAccidentTreatment");
  const wentToAE = form.watch("wentToAE");
  const wentToWalkInGP = form.watch("wentToWalkInGP");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Treatment Information</h2>
      
      <FormField
        control={form.control}
        name="sceneOfAccidentTreatment"
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
              <FormLabel>Did you receive any treatment at the scene of accident?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {sceneOfAccidentTreatment === "1" && (
        <FormField
          control={form.control}
          name="sceneOfAccidentTreatmentDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What treatment did you receive?</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter treatment details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="wentToAE"
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
              <FormLabel>Did you go to A&E after accident?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {wentToAE === "1" && (
        <>
          <FormField
            control={form.control}
            name="hospitalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which hospital A&E did you go to?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hospitalTreatment"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What treatment did you receive at the hospital?</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "1"}
                        onCheckedChange={() => field.onChange("1")}
                      />
                      <label>None</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "2"}
                        onCheckedChange={() => field.onChange("2")}
                      />
                      <label>X-ray</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "3"}
                        onCheckedChange={() => field.onChange("3")}
                      />
                      <label>CT Scan</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "4"}
                        onCheckedChange={() => field.onChange("4")}
                      />
                      <label>Bandage</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "5"}
                        onCheckedChange={() => field.onChange("5")}
                      />
                      <label>Neck Collar</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="wentToWalkInGP"
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
              <FormLabel>Did you go to Walk-in centre/GP after accident?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {wentToWalkInGP === "1" && (
        <>
          <FormField
            control={form.control}
            name="daysBeforeGPVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many days after the accident did you consult Walk-in/centre/GP?</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter number of days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentTreatment"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What is your Current Treatment (Pain killers)?</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "1"}
                        onCheckedChange={() => field.onChange("1")}
                      />
                      <label>Paracetamol</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "2"}
                        onCheckedChange={() => field.onChange("2")}
                      />
                      <label>Ibuprofen, Naproxen</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "3"}
                        onCheckedChange={() => field.onChange("3")}
                      />
                      <label>Codeine</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "4"}
                        onCheckedChange={() => field.onChange("4")}
                      />
                      <label>Others prescribed medicines</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="physiotherapySessions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many sessions of Physiotherapy have you had so far?</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of sessions" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}