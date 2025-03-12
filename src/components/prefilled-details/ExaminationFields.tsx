
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select examination location" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Meeting Room, North, Ibis, 398 Garstang Rd, Preston, PR3 5JE">
                  Meeting Room, North, Ibis, 398 Garstang Rd, Preston, PR3 5JE
                </SelectItem>
                <SelectItem value="Regus Office, Centenary Way, Manchester M50 1RF">
                  Regus Office, Centenary Way, Manchester M50 1RF
                </SelectItem>
              </SelectContent>
            </Select>
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
