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

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init("YnnsjqOayi-IRBxy_");
  }, []);

  const sendEmail = async (pdfUrl: string) => {
    try {
      const templateParams = {
        to_name: formData.fullName || "Client",
        to_email: formData.email || "Not provided",
        cc_email: "drawais@gmail.com",
        message: "Please find attached your MEDCO medical report.",
        pdf_url: pdfUrl,
      };

      const response = await emailjs.send(
        "service_by7xf4t",
        "template_a1j2wij",
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