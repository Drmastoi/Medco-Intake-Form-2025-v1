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

export function IntakeFormSection7({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Travel Anxiety Information</h2>
      
      <FormField
        control={form.control}
        name="travelAnxiety"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you experience Travel Anxiety after the accident?</FormLabel>
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
        name="currentlyDriving"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Are you back to driving currently?</FormLabel>
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
        name="moreCautious"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Are you more cautious driver after the accident?</FormLabel>
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
        name="checkingMirrors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you keep looking in the rear mirror or over the shoulders and worry of being hit again?</FormLabel>
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
        name="preventedDriving"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Has it prevented you from driving for leisure and work?</FormLabel>
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
        name="anxietyStart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>When did your travel anxiety start?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select when anxiety started" />
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
        name="anxietyInitialSeverity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Initial Severity of travel anxiety</FormLabel>
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
        name="anxietyCurrentSeverity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Severity of travel anxiety</FormLabel>
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
        name="anxietyResolveDays"
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
        name="anxietyPastHistory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Past Medical History of anxiety before the accident</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter past medical history" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}