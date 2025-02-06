import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export function PreFilledDetails({ form }: { form: any }) {
  const { toast } = useToast();
  const [showOtherIdField, setShowOtherIdField] = useState(false);
  const [showOtherLivingWithField, setShowOtherLivingWithField] = useState(false);

  useEffect(() => {
    emailjs.init("YnnsjqOayi-IRBxy_");
  }, []);

  const generateAndShareLink = async () => {
    const formData = form.getValues();
    
    const preFillData = {
      solicitorName: formData.solicitorName || '',
      solicitorReference: formData.solicitorReference || '',
      instructingPartyName: formData.instructingPartyName || '',
      instructingPartyReference: formData.instructingPartyReference || '',
      examinationLocation: formData.examinationLocation || '',
      medcoReference: formData.medcoReference || '',
      accompaniedBy: formData.accompaniedBy || '',
      mobileNumber: formData.mobileNumber || '',
      emailId: formData.emailId || '',
      fullName: formData.fullName || '',
      dateOfBirth: formData.dateOfBirth || '',
      idType: formData.idType || '',
      occupation: formData.occupation || '',
      workType: formData.workType || '',
      livingWith: formData.livingWith || '',
      childrenCount: formData.childrenCount || '',
    };
    
    const queryParams = new URLSearchParams();
    Object.entries(preFillData).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });
    
    const shareableLink = `${window.location.origin}?${queryParams.toString()}`;
    
    try {
      const templateParams = {
        to_name: formData.solicitorName || "Valued Client",
        to_email: formData.emailId,
        message: `
Dear ${formData.solicitorName || "Valued Client"},

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

      toast({
        title: "Link Shared",
        description: "The questionnaire link has been sent to the provided email address.",
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error",
        description: "Failed to send the email. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Personal Information & Pre-filled Details</h2>
        <Button
          onClick={generateAndShareLink}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share className="w-4 h-4" />
          Share with Claimant
        </Button>
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