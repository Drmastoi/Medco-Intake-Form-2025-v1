
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

export function IntakeFormSection12({ form }: { form: any }) {
  const previousAccident = form.watch("previousAccident");
  const additionalInformation = form.watch("additionalInformation");
  const previousAccidentDate = form.watch("previousAccidentDate");
  const previousAccidentRecovery = form.watch("previousAccidentRecovery");
  const previousInjuriesWorse = form.watch("previousInjuriesWorse");
  const previousConditionWorse = form.watch("previousConditionWorse");
  const additionalInformationDetails = form.watch("additionalInformationDetails");
  const exceptionalInjuries = form.watch("exceptionalInjuries");
  const exceptionalInjuriesDetails = form.watch("exceptionalInjuriesDetails");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    let text = "Medical History Summary: ";
    
    // Previous accident
    if (previousAccident === "1") {
      text += "The claimant reports having been involved in a previous road traffic accident";
      
      if (previousAccidentDate) {
        // Format the date for display
        const formattedDate = new Date(previousAccidentDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        text += ` on ${formattedDate}`;
      }
      text += ". ";
      
      // Recovery from previous accident
      if (previousAccidentRecovery === "1") {
        text += "They report having made a complete recovery from that accident. ";
      } else if (previousAccidentRecovery === "2") {
        text += "They report that they had not made a complete recovery from that accident. ";
      }
      
      // Effect of current accident on previous injuries
      if (previousInjuriesWorse === "1") {
        text += "The claimant reports that the current accident has made their previous injuries worse. ";
      } else if (previousInjuriesWorse === "2") {
        text += "The claimant reports that the current accident has not made their previous injuries worse. ";
      }
    } else {
      text += "The claimant reports no previous road traffic accidents. ";
    }
    
    // Previous medical conditions
    if (previousConditionWorse) {
      text += `The claimant reports having previous medical conditions that have been made worse by this accident: ${previousConditionWorse}. `;
    } else {
      text += "The claimant has not reported any pre-existing medical conditions that have been exacerbated by this accident. ";
    }
    
    // Exceptional injuries
    if (exceptionalInjuries === "1" && exceptionalInjuriesDetails) {
      text += `The claimant reports having exceptionally severe physical or psychological injuries: ${exceptionalInjuriesDetails}. `;
    } else if (exceptionalInjuries === "1") {
      text += "The claimant reports having exceptionally severe physical or psychological injuries. ";
    } else {
      text += "The claimant does not report any exceptionally severe physical or psychological injuries. ";
    }
    
    // Additional information
    if (additionalInformation === "1" && additionalInformationDetails) {
      text += `Additional information provided by the claimant: ${additionalInformationDetails}.`;
    }
    
    setSummaryText(text);
  }, [
    previousAccident,
    previousAccidentDate,
    previousAccidentRecovery,
    previousInjuriesWorse,
    previousConditionWorse,
    additionalInformation,
    additionalInformationDetails,
    exceptionalInjuries,
    exceptionalInjuriesDetails
  ]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-muted shadow-sm">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-2xl font-semibold text-primary">Past Medical History</CardTitle>
          <CardDescription>Please provide information about any previous medical conditions or incidents</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous RTA Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Previous Road Traffic Accidents</h3>
            
            <FormField
              control={form.control}
              name="previousAccident"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-card/30 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "1" : "2");
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Previous road traffic accident?</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {previousAccident === "1" && (
              <div className="space-y-4 rounded-md border p-4 bg-card/30 shadow-sm">
                <FormField
                  control={form.control}
                  name="previousAccidentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of previous accident</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previousAccidentRecovery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complete recovery from previous accident?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previousInjuriesWorse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Has the current accident made previous injuries worse?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          
          {/* Medical Conditions Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Medical Conditions & Additional Information</h3>
            
            <FormField
              control={form.control}
              name="previousConditionWorse"
              render={({ field }) => (
                <FormItem className="rounded-md border p-4 bg-card/30 shadow-sm">
                  <FormLabel>Previous medical conditions worsened by this accident</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter details if yes, or leave blank if none" 
                      {...field} 
                      className="bg-white resize-none h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="exceptionalInjuries"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-card/30 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "1" : "2");
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Exceptionally severe physical or psychological injuries?</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {exceptionalInjuries === "1" && (
              <FormField
                control={form.control}
                name="exceptionalInjuriesDetails"
                render={({ field }) => (
                  <FormItem className="rounded-md border p-4 bg-card/30 shadow-sm">
                    <FormLabel>Please explain why they are exceptionally severe</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide details"
                        {...field} 
                        className="bg-white resize-none h-24"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="additionalInformation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-card/30 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "1" : "2");
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is there anything else you want to add?</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {additionalInformation === "1" && (
              <FormField
                control={form.control}
                name="additionalInformationDetails"
                render={({ field }) => (
                  <FormItem className="rounded-md border p-4 bg-card/30 shadow-sm">
                    <FormLabel>Additional details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter additional details" 
                        {...field} 
                        className="bg-white resize-none h-24"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Dynamic Summary Text */}
      {summaryText && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 text-blue-800">Summary</h3>
            <p className="text-sm text-blue-700">{summaryText}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
