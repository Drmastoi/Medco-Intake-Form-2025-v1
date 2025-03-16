
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DateFieldsProps {
  form: any;
}

export function DateFields({ form }: DateFieldsProps) {
  // Use today's date as default
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <FormField
        control={form.control}
        name="dateOfExamination"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Examination</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                defaultValue={field.value || today}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dateOfReport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Report</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field}
                defaultValue={field.value || today}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
