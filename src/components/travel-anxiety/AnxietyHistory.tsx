
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function AnxietyHistory({ form }: { form: any }) {
  const hasAnxietyHistory = form.watch("hasAnxietyHistory");

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-muted">
      <CardContent className="pt-6 space-y-4">
        <FormField
          control={form.control}
          name="hasAnxietyHistory"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="font-medium">Do you have any past medical history of anxiety before the accident?</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
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

        {hasAnxietyHistory === "yes" && (
          <FormField
            control={form.control}
            name="anxietyPastHistory"
            render={({ field }) => (
              <FormItem className="rounded-md border p-3 bg-card/50">
                <FormLabel>Please describe your past medical history of anxiety</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter past medical history" 
                    {...field} 
                    className="bg-white resize-none h-24"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
