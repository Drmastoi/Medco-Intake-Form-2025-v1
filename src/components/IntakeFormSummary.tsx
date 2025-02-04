import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BlobProvider } from '@react-pdf/renderer';
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";
import { MedcoReport } from './report/MedcoReport';
import { useEffect } from "react";

export function IntakeFormSummary({ form }: { form: any }) {
  const { toast } = useToast();
  const formData = form.getValues();

  useEffect(() => {
    emailjs.init("YnnsjqOayi-IRBxy_");
  }, []);

  const sendEmail = async (pdfUrl: string) => {
    try {
      const templateParams = {
        to_name: formData.fullName || "Valued Client",
        to_email: formData.emailId || formData.email,
        cc_email: "drawais@gmail.com",
        message: `
Dear ${formData.fullName || "Valued Client"},

Thank you for completing your personal injury assessment questionnaire. Please find attached your MEDCO medical report for your review.

The report contains a comprehensive assessment based on the information you provided. Please review it carefully and let us know if you have any questions or if any clarification is needed.

<div style="text-align: center; margin: 20px 0;">
  <a href="${pdfUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">View Medical Report</a>
</div>

If you need any assistance or have questions about the report, please don't hesitate to contact us.

Best regards,
Your Medical Assessment Team`,
        pdf_url: pdfUrl,
      };

      const response = await emailjs.send(
        "service_by7xf4t",
        "template_5l8vu23",
        templateParams,
        "YnnsjqOayi-IRBxy_"
      );
      
      console.log('EmailJS Response:', response);

      toast({
        title: "Report Sent",
        description: "The MEDCO medical report has been sent to your email.",
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error",
        description: "Failed to send the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">MEDCO Report</h2>
      
      <div className="prose max-w-none">
        <p className="text-sm text-muted-foreground mb-4">
          This report follows the MEDCO format requirements. You can preview, download, or email the report using the buttons below.
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <BlobProvider document={<MedcoReport formData={formData} />}>
          {({ url, loading }) => (
            <>
              <Button 
                disabled={loading}
                onClick={() => {
                  if (url) {
                    window.open(url, '_blank');
                  }
                }}
              >
                {loading ? "Generating PDF..." : "Download MEDCO Report"}
              </Button>

              <Button 
                disabled={loading}
                onClick={() => {
                  if (url) {
                    sendEmail(url);
                  }
                }}
              >
                {loading ? "Generating..." : "Email Report"}
              </Button>
            </>
          )}
        </BlobProvider>
      </div>
    </div>
  );
}