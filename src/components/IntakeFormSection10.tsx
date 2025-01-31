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

export function IntakeFormSection10({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Treatment Information</h2>
      
      <FormField
        control={form.control}
        name="sceneOfAccidentTreatment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you receive any treatment at the scene of accident?</FormLabel>
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

      <FormField
        control={form.control}
        name="wentToAE"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you go to A&E after accident?</FormLabel>
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
          <FormItem>
            <FormLabel>What treatment did you receive at the hospital?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select treatment type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">None</SelectItem>
                <SelectItem value="2">X-ray</SelectItem>
                <SelectItem value="3">CT Scan</SelectItem>
                <SelectItem value="4">Bandage</SelectItem>
                <SelectItem value="5">Neck Collar</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="wentToWalkInGP"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you go to Walk-in centre/GP after accident?</FormLabel>
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
          <FormItem>
            <FormLabel>What is your Current Treatment (Pain killers)?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select treatment type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">Paracetamol</SelectItem>
                <SelectItem value="2">Ibuprofen, Naproxen</SelectItem>
                <SelectItem value="3">Codeine</SelectItem>
                <SelectItem value="4">Others prescribed medicines</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

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