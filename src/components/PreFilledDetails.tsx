
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

export function PreFilledDetails({ form }: { form: any }) {
  const [showOtherIdField, setShowOtherIdField] = useState(false);
  const [showOtherLivingWithField, setShowOtherLivingWithField] = useState(false);

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Enter your occupation" {...field} />
              </FormControl>
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
                      onCheckedChange={() => field.onChange("1")}
                    />
                    <label>Full Time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "2"}
                      onCheckedChange={() => field.onChange("2")}
                    />
                    <label>Part Time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "3"}
                      onCheckedChange={() => field.onChange("3")}
                    />
                    <label>N/A</label>
                  </div>
                </div>
              </FormControl>
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
                      onCheckedChange={(checked) => {
                        setShowOtherLivingWithField(checked === true);
                        if (checked) field.onChange("6");
                      }}
                    />
                    <label>Other</label>
                  </div>
                  {showOtherLivingWithField && (
                    <Input 
                      placeholder="Please specify who lives with you"
                      className="ml-6 mt-2"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                </div>
              </FormControl>
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
            </FormItem>
          )}
        />

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
      </div>
    </div>
  );
}
