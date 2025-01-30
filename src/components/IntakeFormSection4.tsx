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

export function IntakeFormSection4({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Shoulder Pain Information</h2>
      
      <FormField
        control={form.control}
        name="shoulderPain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you get Any Shoulder Pain?</FormLabel>
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
        name="shoulderSide"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Which side of shoulder?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select shoulder side" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Left</SelectItem>
                <SelectItem value="2">Right</SelectItem>
                <SelectItem value="3">Both</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shoulderPainStart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>When did this pain start?</FormLabel>
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
        name="shoulderPainInitialSeverity"
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
        name="shoulderPainCurrentSeverity"
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
        name="shoulderPainResolveDays"
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