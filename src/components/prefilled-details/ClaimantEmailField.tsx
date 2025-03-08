
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ClaimantEmailFieldProps {
  form: any;
}

export function ClaimantEmailField({ form }: ClaimantEmailFieldProps) {
  return (
    <FormField
      control={form.control}
      name="emailId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Claimant's Email Address</FormLabel>
          <FormControl>
            <Input {...field} type="email" placeholder="Enter claimant's email address" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
