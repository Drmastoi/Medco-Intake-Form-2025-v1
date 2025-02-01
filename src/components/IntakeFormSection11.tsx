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

export function IntakeFormSection11({ form }: { form: any }) {
  const [showOtherWorkDifficulties, setShowOtherWorkDifficulties] = useState(false);
  const [showOtherSleepDisturbance, setShowOtherSleepDisturbance] = useState(false);
  const [showOtherDomesticEffect, setShowOtherDomesticEffect] = useState(false);
  const [showOtherSportLeisure, setShowOtherSportLeisure] = useState(false);
  const [showOtherSocialLife, setShowOtherSocialLife] = useState(false);

  const sleepDisturbance = form.watch("sleepDisturbance");
  const effectOnDomesticLiving = form.watch("effectOnDomesticLiving");
  const effectOnSportLeisure = form.watch("effectOnSportLeisure");
  const effectOnSocialLife = form.watch("effectOnSocialLife");
  const workDifficulties = form.watch("workDifficulties") || [];
  const sleepDisturbances = form.watch("sleepDisturbances") || [];
  const domesticEffects = form.watch("domesticEffects") || [];
  const sportLeisureEffects = form.watch("sportLeisureEffects") || [];
  const socialLifeEffects = form.watch("socialLifeEffects") || [];

  const workDifficultyOptions = [
    { id: "sitting", label: "Sitting for long periods" },
    { id: "standing", label: "Standing for long periods" },
    { id: "lifting", label: "Lifting heavy objects" },
    { id: "bending", label: "Bending or twisting" },
    { id: "typing", label: "Typing/Computer work" },
    { id: "concentration", label: "Concentration" },
    { id: "driving", label: "Driving" },
    { id: "other", label: "Other" },
  ];

  const sleepDisturbanceOptions = [
    { id: "fallingAsleep", label: "Difficulty falling asleep" },
    { id: "stayingAsleep", label: "Difficulty staying asleep" },
    { id: "earlyWaking", label: "Early morning waking" },
    { id: "nightmares", label: "Nightmares" },
    { id: "painDisturbs", label: "Pain disturbs sleep" },
    { id: "restlessness", label: "Restlessness" },
    { id: "other", label: "Other" },
  ];

  const domesticEffectOptions = [
    { id: "cleaning", label: "House cleaning" },
    { id: "cooking", label: "Cooking meals" },
    { id: "laundry", label: "Doing laundry" },
    { id: "shopping", label: "Grocery shopping" },
    { id: "childcare", label: "Childcare duties" },
    { id: "gardening", label: "Gardening/yard work" },
    { id: "petCare", label: "Pet care" },
    { id: "other", label: "Other" },
  ];

  const sportLeisureOptions = [
    { id: "gym", label: "Going to the gym" },
    { id: "running", label: "Running/Jogging" },
    { id: "swimming", label: "Swimming" },
    { id: "cycling", label: "Cycling" },
    { id: "teamSports", label: "Team sports" },
    { id: "hiking", label: "Hiking" },
    { id: "yoga", label: "Yoga/Stretching" },
    { id: "other", label: "Other" },
  ];

  const socialLifeOptions = [
    { id: "meetingFriends", label: "Meeting friends" },
    { id: "familyGatherings", label: "Family gatherings" },
    { id: "dining", label: "Dining out" },
    { id: "parties", label: "Attending parties" },
    { id: "concerts", label: "Concerts/Events" },
    { id: "traveling", label: "Traveling" },
    { id: "hobbies", label: "Group hobbies" },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Impact on Daily Life</h2>
      
      <FormField
        control={form.control}
        name="daysOffWork"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many days did you Take Off Work because of the accident?</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of days" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="daysLightDuties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many Days of Light Duties or reduced hours did you take?</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter number of days" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="workDifficulties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What things are hard to do at work?</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workDifficultyOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        const updatedValue = [...(field.value || []), option.id];
                        field.onChange(updatedValue);
                        if (option.id === "other") {
                          setShowOtherWorkDifficulties(true);
                        }
                      } else {
                        const updatedValue = (field.value || []).filter((id: string) => id !== option.id);
                        field.onChange(updatedValue);
                        if (option.id === "other") {
                          setShowOtherWorkDifficulties(false);
                        }
                      }
                    }}
                  />
                  <label className="text-sm">{option.label}</label>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {showOtherWorkDifficulties && (
        <FormField
          control={form.control}
          name="otherWorkDifficulties"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify other work difficulties</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter other work difficulties" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="sleepDisturbance"
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
              <FormLabel>Do you have Sleep Disturbance?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {sleepDisturbance === "1" && (
        <FormField
          control={form.control}
          name="sleepDisturbances"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What type of sleep disturbances do you experience?</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sleepDisturbanceOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const updatedValue = [...(field.value || []), option.id];
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherSleepDisturbance(true);
                          }
                        } else {
                          const updatedValue = (field.value || []).filter((id: string) => id !== option.id);
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherSleepDisturbance(false);
                          }
                        }
                      }}
                    />
                    <label className="text-sm">{option.label}</label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showOtherSleepDisturbance && (
        <FormField
          control={form.control}
          name="otherSleepDisturbances"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify other sleep disturbances</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter other sleep disturbances" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="effectOnDomesticLiving"
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
              <FormLabel>Do you have Effect on Domestic Living?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {effectOnDomesticLiving === "1" && (
        <FormField
          control={form.control}
          name="domesticEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What domestic activities are affected?</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domesticEffectOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const updatedValue = [...(field.value || []), option.id];
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherDomesticEffect(true);
                          }
                        } else {
                          const updatedValue = (field.value || []).filter((id: string) => id !== option.id);
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherDomesticEffect(false);
                          }
                        }
                      }}
                    />
                    <label className="text-sm">{option.label}</label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showOtherDomesticEffect && (
        <FormField
          control={form.control}
          name="otherDomesticEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify other domestic activities affected</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter other domestic activities affected" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="effectOnSportLeisure"
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
              <FormLabel>Do you have Effect on Sport & Leisure activity?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {effectOnSportLeisure === "1" && (
        <FormField
          control={form.control}
          name="sportLeisureEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What sport & leisure activities are affected?</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sportLeisureOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const updatedValue = [...(field.value || []), option.id];
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherSportLeisure(true);
                          }
                        } else {
                          const updatedValue = (field.value || []).filter((id: string) => id !== option.id);
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherSportLeisure(false);
                          }
                        }
                      }}
                    />
                    <label className="text-sm">{option.label}</label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showOtherSportLeisure && (
        <FormField
          control={form.control}
          name="otherSportLeisureEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify other sport & leisure activities affected</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter other sport & leisure activities affected" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="effectOnSocialLife"
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
              <FormLabel>Do you have Effect on Social life?</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {effectOnSocialLife === "1" && (
        <FormField
          control={form.control}
          name="socialLifeEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What social activities are affected?</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLifeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const updatedValue = [...(field.value || []), option.id];
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherSocialLife(true);
                          }
                        } else {
                          const updatedValue = (field.value || []).filter((id: string) => id !== option.id);
                          field.onChange(updatedValue);
                          if (option.id === "other") {
                            setShowOtherSocialLife(false);
                          }
                        }
                      }}
                    />
                    <label className="text-sm">{option.label}</label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showOtherSocialLife && (
        <FormField
          control={form.control}
          name="otherSocialLifeEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify other social activities affected</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter other social activities affected" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
