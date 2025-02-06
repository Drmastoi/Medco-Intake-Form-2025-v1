import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function PreFilledDetails({ form }: { form: any }) {
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init("YnnsjqOayi-IRBxy_");
  }, []);

  const generateAndShareLink = async () => {
    const formData = form.getValues();
    
    // Include all pre-filled fields in the URL
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
      occupation: formData.occupation || '',
      workType: formData.workType || '',
      livingWith: formData.livingWith || '',
      childrenCount: formData.childrenCount || '',
    };
    
    // Convert the data object to URL parameters
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
        <h2 className="text-xl font-semibold">Pre-filled Details</h2>
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