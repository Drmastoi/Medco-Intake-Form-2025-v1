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

export function IntakeFormSection5({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Back Pain Information</h2>
      
      <FormField
        control={form.control}
        name="backPain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you get Any Back Pain?</FormLabel>
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
        name="backLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Where in the back?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select back location" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Upper back</SelectItem>
                <SelectItem value="2">Middle Back</SelectItem>
                <SelectItem value="3">Lower Back</SelectItem>
                <SelectItem value="4">All over back</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="backPainStart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>When did this back pain start?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select when pain started" />
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
        name="backPainInitialSeverity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Initial Severity of pain</FormLabel>
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
        name="backPainCurrentSeverity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Severity of pain</FormLabel>
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
    </div>
  );
}