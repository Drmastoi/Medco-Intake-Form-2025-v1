import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function IntakeFormSection2({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Accident Information</h2>
      
      <FormField
        control={form.control}
        name="accidentDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Accident</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accidentTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accident Time</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select time of day" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Morning</SelectItem>
                <SelectItem value="2">Afternoon</SelectItem>
                <SelectItem value="3">Evening</SelectItem>
                <SelectItem value="4">Night</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vehiclePosition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position in Vehicle</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your position" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Driver</SelectItem>
                <SelectItem value="2">Front Passenger</SelectItem>
                <SelectItem value="3">Back Passenger</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Add more accident-related fields here */}
    </div>
  );
}