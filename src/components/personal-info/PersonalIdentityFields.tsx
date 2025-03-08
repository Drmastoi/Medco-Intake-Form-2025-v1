
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface PersonalIdentityFieldsProps {
  form: any;
}

export function PersonalIdentityFields({ form }: PersonalIdentityFieldsProps) {
  const [showOtherIdField, setShowOtherIdField] = useState(false);

  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>ID Type</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Driving License</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>Passport</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "3"}
                    onCheckedChange={() => field.onChange("3")}
                  />
                  <label>ID Card</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "4"}
                    onCheckedChange={(checked) => {
                      setShowOtherIdField(checked === true);
                      if (checked) field.onChange("4");
                    }}
                  />
                  <label>Other</label>
                </div>
                {showOtherIdField && (
                  <Input 
                    placeholder="Please specify other ID type"
                    className="ml-6 mt-2"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
