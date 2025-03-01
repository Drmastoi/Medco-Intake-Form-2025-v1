
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export function PreFilledDetails({ form }: { form: any }) {
  const { toast } = useToast();
  const [showOtherIdField, setShowOtherIdField] = useState(false);
  const [showOtherLivingWithField, setShowOtherLivingWithField] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  useEffect(() => {
    emailjs.init("YnnsjqOayi-IRBxy_");
    
    // Set field values for 'Other' options
    const idTypeValue = form.getValues("idType");
    if (idTypeValue === "4" || idTypeValue?.startsWith("Other:")) {
      setShowOtherIdField(true);
    }
    
    const livingWithValue = form.getValues("livingWith");
    if (livingWithValue === "6" || livingWithValue?.startsWith("Other:")) {
      setShowOtherLivingWithField(true);
    }
  }, [form]);

  const generateAndShareLink = async () => {
    setIsSending(true);
    try {
      const formData = form.getValues();
      console.log("Form data for sharing:", formData);
      
      // Get recipient email - use the recipient email field instead of the form's email
      const emailToSendTo = recipientEmail || formData.emailId;
      
      if (!emailToSendTo) {
        toast({
          title: "Error",
          description: "Please enter a recipient email address",
          variant: "destructive",
        });
        setIsSending(false);
        return;
      }
      
      const preFillData: Record<string, string> = {};
      
      // Include all relevant fields from the form
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          // Convert to string and add to preFillData
          preFillData[key] = String(value);
        }
      });
      
      const queryParams = new URLSearchParams();
      Object.entries(preFillData).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      
      const shareableLink = `${window.location.origin}?${queryParams.toString()}`;
      console.log("Generated shareable link:", shareableLink);
      
      const templateParams = {
        to_name: formData.fullName || "Valued Client",
        to_email: emailToSendTo,
        message: `
Dear ${formData.fullName || "Valued Client"},

I hope this email finds you well. As part of your personal injury assessment process, we have prepared a detailed questionnaire for you to complete.

Please click on the link below to access your personalized questionnaire. The form will be pre-filled with the information we already have:

${shareableLink}

If you have any questions or need assistance while completing the questionnaire, please don't hesitate to contact us.

Best regards,
Your Medical Assessment Team
        `,
        link: shareableLink,
      };

      const response = await emailjs.send(
        "service_by7xf4t",
        "template_5l8vu23",
        templateParams,
        "YnnsjqOayi-IRBxy_"
      );
      
      console.log('EmailJS Response:', response);

      // Save the questionnaire tracking record
      try {
        const { data: userData } = await supabase.auth.getUser();
        
        const { error } = await supabase
          .from('questionnaire_tracking')
          .insert({
            recipient_email: emailToSendTo,
            recipient_name: formData.fullName || null,
            sent_date: new Date().toISOString(),
            questionnaire_link: shareableLink,
            completed: false,
            recipient_id: userData?.user?.id || null
          });
          
        if (error) {
          console.error('Failed to save questionnaire tracking:', error);
          throw error;
        }
      } catch (dbError) {
        console.error('Failed to save questionnaire tracking:', dbError);
        // Don't stop execution if the tracking fails
      }

      toast({
        title: "Link Shared",
        description: `The questionnaire link has been sent to ${emailToSendTo}`,
      });
      
      // Clear recipient email field after successful send
      setRecipientEmail("");
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error",
        description: "Failed to send the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-xl font-semibold">Personal Information & Pre-filled Details</h2>
        
        <div className="flex flex-col md:flex-row items-end gap-2">
          <Input
            placeholder="Enter recipient email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full md:w-64"
            type="email"
          />
          <Button
            onClick={generateAndShareLink}
            variant="outline"
            className="flex items-center gap-2 whitespace-nowrap"
            disabled={isSending}
          >
            <Share className="w-4 h-4" />
            {isSending ? "Sending..." : "Share with Claimant"}
          </Button>
        </div>
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your address" {...field} />
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
          name="accidentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Accident</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
          name="solicitorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitor's Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="solicitorReference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitor's Reference</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="instructingPartyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructing Party Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="instructingPartyReference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructing Party Reference</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="examinationLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Examination Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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

        <FormField
          control={form.control}
          name="emailId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email address" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
