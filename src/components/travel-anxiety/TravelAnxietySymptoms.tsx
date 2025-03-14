
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface TravelAnxietySymptomsProps {
  form: any;
}

export function TravelAnxietySymptoms({ form }: TravelAnxietySymptomsProps) {
  const [otherSelected, setOtherSelected] = useState(false);
  const travelAnxietySymptoms = form.watch("travelAnxietySymptoms") || [];

  useEffect(() => {
    setOtherSelected(travelAnxietySymptoms.includes("other"));
  }, [travelAnxietySymptoms]);

  const symptomOptions = [
    { id: "palpitations", label: "Palpitations or rapid heartbeat" },
    { id: "sweating", label: "Sweating" },
    { id: "trembling", label: "Trembling" },
    { id: "shortness-of-breath", label: "Shortness of breath" },
    { id: "nausea", label: "Nausea" },
    { id: "dizziness", label: "Dizziness" },
    { id: "fear-of-dying", label: "Fear of dying" },
    { id: "fear-of-travel", label: "Fear of traveling" },
    { id: "avoidance", label: "Avoidance of travel situations" },
    { id: "other", label: "Other (please specify)" },
  ];

  return (
    <FormField
      control={form.control}
      name="travelAnxietySymptoms"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What symptoms of travel anxiety did you experience?</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {symptomOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={field.value?.includes(option.id)}
                  onCheckedChange={(checked) => {
                    const updatedValue = checked
                      ? [...(field.value || []), option.id]
                      : field.value?.filter((value: string) => value !== option.id) || [];
                    field.onChange(updatedValue);
                  }}
                />
                <label
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          
          {otherSelected && (
            <FormField
              control={form.control}
              name="otherTravelAnxietySymptom"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Please specify other symptoms"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </FormItem>
      )}
    />
  );
}
