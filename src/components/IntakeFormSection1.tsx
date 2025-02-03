import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { type CheckedState } from "@radix-ui/react-checkbox";

export function IntakeFormSection1({ form }: { form: any }) {
  const [showOtherIdField, setShowOtherIdField] = useState(false);
  const [showOtherLivingWithField, setShowOtherLivingWithField] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
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
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>ID Type (Select all that apply)</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes("1")}
                    onCheckedChange={(checked: CheckedState) => {
                      const currentValue = field.value || [];
                      if (checked === true) {
                        field.onChange([...currentValue, "1"]);
                      } else {
                        field.onChange(currentValue.filter((v: string) => v !== "1"));
                      }
                    }}
                  />
                  <label>Driving License</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes("2")}
                    onCheckedChange={(checked: CheckedState) => {
                      const currentValue = field.value || [];
                      if (checked === true) {
                        field.onChange([...currentValue, "2"]);
                      } else {
                        field.onChange(currentValue.filter((v: string) => v !== "2"));
                      }
                    }}
                  />
                  <label>Passport</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes("3")}
                    onCheckedChange={(checked: CheckedState) => {
                      const currentValue = field.value || [];
                      if (checked === true) {
                        field.onChange([...currentValue, "3"]);
                      } else {
                        field.onChange(currentValue.filter((v: string) => v !== "3"));
                      }
                    }}
                  />
                  <label>ID Card</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes("4")}
                    onCheckedChange={(checked: CheckedState) => {
                      const currentValue = field.value || [];
                      setShowOtherIdField(checked === true);
                      if (checked === true) {
                        field.onChange([...currentValue, "4"]);
                      } else {
                        field.onChange(currentValue.filter((v: string) => v !== "4"));
                      }
                    }}
                  />
                  <label>Other</label>
                </div>
                {showOtherIdField && (
                  <Input 
                    placeholder="Please specify other ID type"
                    className="ml-6 mt-2"
                    onChange={(e) => {
                      const currentValue = field.value || [];
                      field.onChange([...currentValue.filter((v: string) => v !== "other"), e.target.value]);
                    }}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Occupation at Time of Accident</FormLabel>
            <FormControl>
              <Input placeholder="Enter your occupation" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="workType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Work Type</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked: CheckedState) => {
                      if (checked === true) field.onChange("1");
                    }}
                  />
                  <label>Full Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={(checked: CheckedState) => {
                      if (checked === true) field.onChange("2");
                    }}
                  />
                  <label>Part Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "3"}
                    onCheckedChange={(checked: CheckedState) => {
                      if (checked === true) field.onChange("3");
                    }}
                  />
                  <label>N/A</label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="livingWith"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Who Lives with You at Home</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Wife</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>Husband</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "3"}
                    onCheckedChange={() => field.onChange("3")}
                  />
                  <label>Partner</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "4"}
                    onCheckedChange={() => field.onChange("4")}
                  />
                  <label>Parents</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "5"}
                    onCheckedChange={() => field.onChange("5")}
                  />
                  <label>Alone</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "6"}
                    onCheckedChange={(checked: CheckedState) => {
                      setShowOtherLivingWithField(checked === true);
                      if (checked === true) field.onChange("6");
                    }}
                  />
                  <label>Other</label>
                </div>
                {showOtherLivingWithField && (
                  <Input 
                    placeholder="Please specify who lives with you"
                    className="ml-6 mt-2"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="childrenCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Children at Home</FormLabel>
            <FormControl>
              <Input type="number" min="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
