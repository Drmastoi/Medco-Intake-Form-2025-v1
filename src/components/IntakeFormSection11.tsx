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

export function IntakeFormSection11({ form }: { form: any }) {
  const sleepDisturbance = form.watch("sleepDisturbance");
  const effectOnDomesticLiving = form.watch("effectOnDomesticLiving");
  const effectOnSportLeisure = form.watch("effectOnSportLeisure");
  const effectOnSocialLife = form.watch("effectOnSocialLife");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Impact on Daily Life</h2>
      
      <FormField
        control={form.control}
        name="daysOffWork"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many days did you Take Off Work because of the accident?</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of days" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="daysLightDuties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many Days of Light Duties or reduced hours did you take?</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of days" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="workDifficulties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What things are hard to do at work?</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter details of work difficulties" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sleepDisturbance"
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
              <FormLabel>Do you have Sleep Disturbance?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {sleepDisturbance === "1" && (
        <FormField
          control={form.control}
          name="sleepDisturbanceDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details of sleep disturbance</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter details of sleep disturbance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="effectOnDomesticLiving"
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
              <FormLabel>Do you have Effect on Domestic Living?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {effectOnDomesticLiving === "1" && (
        <FormField
          control={form.control}
          name="domesticLivingDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details of effect on domestic living</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="effectOnSportLeisure"
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
              <FormLabel>Do you have Effect on Sport & Leisure activity?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {effectOnSportLeisure === "1" && (
        <FormField
          control={form.control}
          name="sportLeisureDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details of effect on sport & leisure</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="effectOnSocialLife"
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
              <FormLabel>Do you have Effect on Social life?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {effectOnSocialLife === "1" && (
        <FormField
          control={form.control}
          name="socialLifeDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details of effect on social life</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}