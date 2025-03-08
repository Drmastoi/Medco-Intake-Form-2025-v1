
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ShareLinkButtonProps {
  form: any;
}

export function ShareLinkButton({ form }: ShareLinkButtonProps) {
  const { toast } = useToast();

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
      dateOfExamination: formData.dateOfExamination || '',
      dateOfReport: formData.dateOfReport || '',
      emailId: formData.emailId || '',
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
    <Button
      onClick={generateAndShareLink}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Share className="w-4 h-4" />
      Share with Claimant
    </Button>
  );
}
