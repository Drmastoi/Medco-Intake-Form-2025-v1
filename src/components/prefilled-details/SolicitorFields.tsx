
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SolicitorFieldsProps {
  form: any;
}

export function SolicitorFields({ form }: SolicitorFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="solicitorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Solicitor's Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="solicitorReference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Solicitor's Reference</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
