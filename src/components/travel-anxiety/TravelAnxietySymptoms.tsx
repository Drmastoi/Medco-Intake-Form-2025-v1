
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const travelAnxietySymptomOptions = [
  {
    id: "cautious-driver",
    label: "Being a more cautious driver",
  },
  {
    id: "frequent-mirror-checking",
    label: "Looking in the mirror more frequently",
  },
  {
    id: "avoid-accident-road",
    label: "Avoiding the road where the accident happened",
  },
  {
    id: "avoid-passenger",
    label: "Avoiding being a passenger in a car",
  },
  {
    id: "avoid-driving",
    label: "Avoiding driving a car",
  },
  {
    id: "panic-attacks",
    label: "Getting panic attacks when in a car",
  },
  {
    id: "passenger-anxiety",
    label: "Anxiety when traveling as a passenger",
  },
  {
    id: "busy-road-anxiety",
    label: "Anxiety on busy roads or highways",
  },
  {
    id: "other",
    label: "Other",
  },
];

export function TravelAnxietySymptoms({ form }: { form: any }) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  // Add a field for whether the user is currently driving
  const handleCurrentlyDrivingChange = (value: string) => {
    form.setValue("currentlyDriving", value);
  };
  
  const currentlyDriving = form.watch("currentlyDriving");
  
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="travelAnxietySymptoms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Travel Anxiety Symptoms</FormLabel>
            <FormMessage />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {travelAnxietySymptomOptions.map((option) => (
                <FormItem
                  key={option.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || [];
                        let updatedValue: string[];
                        
                        if (checked) {
                          updatedValue = [...currentValue, option.id];
                          if (option.id === "other") {
                            setShowOtherInput(true);
                          }
                        } else {
                          updatedValue = currentValue.filter(
                            (value) => value !== option.id
                          );
                          if (option.id === "other") {
                            setShowOtherInput(false);
                            form.setValue("otherTravelAnxietySymptom", "");
                          }
                        }
                        
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
            
            {showOtherInput && (
              <FormField
                control={form.control}
                name="otherTravelAnxietySymptom"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Please specify other symptoms</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Please specify" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currentlyDriving"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Are you back to driving currently?</FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={() => field.onChange("1")}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === "2"}
                    onCheckedChange={() => field.onChange("2")}
                  />
                  <label>No</label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
