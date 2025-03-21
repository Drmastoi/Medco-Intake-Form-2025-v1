
import { useState, useEffect } from "react";
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
    label: "Looking in the mirror more frequently / checking over shoulders",
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
    id: "prevented-driving",
    label: "Prevented from driving for leisure or work",
  },
  {
    id: "other",
    label: "Other",
  },
];

export function TravelAnxietySymptoms({ form }: { form: any }) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  useEffect(() => {
    // Initialize the symptoms array if it's undefined
    const currentValue = form.getValues("travelAnxietySymptoms");
    if (!currentValue) {
      form.setValue("travelAnxietySymptoms", []);
    }
    
    // Check if "other" is selected to show the input field
    if (currentValue && currentValue.includes("other")) {
      setShowOtherInput(true);
    }
  }, [form]);
  
  return (
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
                      // Ensure field.value is an array
                      const currentValue = Array.isArray(field.value) ? field.value : [];
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
  );
}
