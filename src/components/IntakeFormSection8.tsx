import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function IntakeFormSection8({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Bruising and Scarring Information</h2>
      
      <FormField
        control={form.control}
        name="hasBruising"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is there Any Bruising or Scarring on the body due to this accident?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select yes or no" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Yes</SelectItem>
                <SelectItem value="2">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bruisingLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location of bruising or scar</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter location details" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bruisingNoticed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>When did you notice it?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select when noticed" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Same day</SelectItem>
                <SelectItem value="2">Next Day</SelectItem>
                <SelectItem value="3">Few days Later</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bruisingInitialSeverity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Initial Severity</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select initial severity" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Mild</SelectItem>
                <SelectItem value="2">Moderate</SelectItem>
                <SelectItem value="3">Severe</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bruisingCurrentSeverity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Severity</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select current severity" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Mild</SelectItem>
                <SelectItem value="2">Moderate</SelectItem>
                <SelectItem value="3">Severe</SelectItem>
                <SelectItem value="4">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

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

      <FormField
        control={form.control}
        name="hasVisibleScar"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is there any visible scar?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select yes or no" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Yes</SelectItem>
                <SelectItem value="2">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}