import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function IntakeFormSection10({ form }: { form: any }) {
  const [showOtherTreatmentField, setShowOtherTreatmentField] = useState(false);
  const [showHospitalOtherField, setShowHospitalOtherField] = useState(false);
  const sceneOfAccidentTreatment = form.watch("sceneOfAccidentTreatment");
  const wentToAE = form.watch("wentToAE");
  const wentToWalkInGP = form.watch("wentToWalkInGP");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Treatment Information</h2>
      
      <FormField
        control={form.control}
        name="sceneOfAccidentTreatment"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value === "1"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "1" : "2");
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Did you receive any treatment at the scene of accident?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {sceneOfAccidentTreatment === "1" && (
        <>
          <FormField
            control={form.control}
            name="sceneOfAccidentTreatmentTypes"
            render={({ field }) => (
              <FormItem className="space-y-3 ml-6">
                <FormLabel>What treatment did you receive?</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("firstAid")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "firstAid"]
                            : currentValue.filter((v: string) => v !== "firstAid");
                          field.onChange(newValue);
                        }}
                      />
                      <label>First Aid</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("neckCollar")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "neckCollar"]
                            : currentValue.filter((v: string) => v !== "neckCollar");
                          field.onChange(newValue);
                        }}
                      />
                      <label>Neck Collar</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("ambulance")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "ambulance"]
                            : currentValue.filter((v: string) => v !== "ambulance");
                          field.onChange(newValue);
                        }}
                      />
                      <label>Ambulance Arrived</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("police")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "police"]
                            : currentValue.filter((v: string) => v !== "police");
                          field.onChange(newValue);
                        }}
                      />
                      <label>Police Arrived</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("other")}
                        onCheckedChange={(checked) => {
                          setShowOtherTreatmentField(checked === true);
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "other"]
                            : currentValue.filter((v: string) => v !== "other");
                          field.onChange(newValue);
                        }}
                      />
                      <label>Other</label>
                    </div>
                    {showOtherTreatmentField && (
                      <Input 
                        placeholder="Please specify other treatment"
                        className="ml-6 mt-2"
                        onChange={(e) => {
                          const currentValue = field.value || [];
                          field.onChange([...currentValue, e.target.value]);
                        }}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="wentToAE"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value === "1"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "1" : "2");
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Did you go to A&E after accident?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {wentToAE === "1" && (
        <>
          <FormField
            control={form.control}
            name="hospitalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which hospital A&E did you go to?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hospitalTreatment"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What treatment did you receive at the hospital?</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("none")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "none"]
                            : currentValue.filter((v: string) => v !== "none");
                          field.onChange(newValue);
                        }}
                      />
                      <label>None</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("xray")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "xray"]
                            : currentValue.filter((v: string) => v !== "xray");
                          field.onChange(newValue);
                        }}
                      />
                      <label>X-ray</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("ctScan")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "ctScan"]
                            : currentValue.filter((v: string) => v !== "ctScan");
                          field.onChange(newValue);
                        }}
                      />
                      <label>CT Scan</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("bandage")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "bandage"]
                            : currentValue.filter((v: string) => v !== "bandage");
                          field.onChange(newValue);
                        }}
                      />
                      <label>Bandage</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("neckCollar")}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "neckCollar"]
                            : currentValue.filter((v: string) => v !== "neckCollar");
                          field.onChange(newValue);
                        }}
                      />
                      <label>Neck Collar</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes("other")}
                        onCheckedChange={(checked) => {
                          setShowHospitalOtherField(checked === true);
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, "other"]
                            : currentValue.filter((v: string) => v !== "other");
                          field.onChange(newValue);
                        }}
                      />
                      <label>Other</label>
                    </div>
                    {showHospitalOtherField && (
                      <Input 
                        placeholder="Please specify other treatment"
                        className="ml-6 mt-2"
                        onChange={(e) => {
                          const currentValue = field.value || [];
                          field.onChange([...currentValue, e.target.value]);
                        }}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="wentToWalkInGP"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value === "1"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "1" : "2");
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Did you go to Walk-in centre/GP after accident?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {wentToWalkInGP === "1" && (
        <>
          <FormField
            control={form.control}
            name="daysBeforeGPVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many days after the accident did you consult Walk-in/centre/GP?</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter number of days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentTreatment"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What is your Current Treatment (Pain killers)?</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "1"}
                        onCheckedChange={() => field.onChange("1")}
                      />
                      <label>Paracetamol</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "2"}
                        onCheckedChange={() => field.onChange("2")}
                      />
                      <label>Ibuprofen, Naproxen</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "3"}
                        onCheckedChange={() => field.onChange("3")}
                      />
                      <label>Codeine</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "4"}
                        onCheckedChange={() => field.onChange("4")}
                      />
                      <label>Others prescribed medicines</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="physiotherapySessions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many sessions of Physiotherapy have you had so far?</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of sessions" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
