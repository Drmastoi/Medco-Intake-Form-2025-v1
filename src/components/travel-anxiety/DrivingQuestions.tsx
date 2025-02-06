
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function DrivingQuestions({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="currentlyDriving"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Are you back to driving currently?</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>No</label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="moreCautious"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Are you more cautious driver after the accident?</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>No</label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="checkingMirrors"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Do you keep looking in the rear mirror or over the shoulders and worry of being hit again?</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>No</label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preventedDriving"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Has it prevented you from driving for leisure and work?</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>No</label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
