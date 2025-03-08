
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ContactFieldsProps {
  form: any;
}

export function ContactFields({ form }: ContactFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="accompaniedBy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accompanied By</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mobileNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile Number</FormLabel>
            <FormControl>
              <Input {...field} type="tel" placeholder="Enter mobile number" />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
