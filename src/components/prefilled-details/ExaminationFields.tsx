
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ExaminationFieldsProps {
  form: any;
}

export function ExaminationFields({ form }: ExaminationFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="examinationLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location of Examination</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="medcoReference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medco Reference</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
