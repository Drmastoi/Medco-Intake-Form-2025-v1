
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InstructingPartyFieldsProps {
  form: any;
}

export function InstructingPartyFields({ form }: InstructingPartyFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="instructingPartyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instructing Party Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="instructingPartyReference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instructing Party Reference</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
