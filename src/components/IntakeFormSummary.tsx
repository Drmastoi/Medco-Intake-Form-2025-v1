import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { BlobProvider } from '@react-pdf/renderer';
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfoSection } from './report/PersonalInfoSection';
import { AccidentInfoSection } from './report/AccidentInfoSection';
import { InjuriesSection } from './report/InjuriesSection';
import { DailyLifeSection } from './report/DailyLifeSection';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

const MedicalReport = ({ formData }: { formData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Medical Report - Road Traffic Accident</Text>
      <PersonalInfoSection formData={formData} />
      <AccidentInfoSection formData={formData} />
      <InjuriesSection formData={formData} />
      <DailyLifeSection formData={formData} />
    </Page>
  </Document>
);

export function IntakeFormSummary({ form }: { form: any }) {
  const { toast } = useToast();
  const formData = form.getValues();

  const sendEmail = async (pdfUrl: string) => {
    try {
      emailjs.init("YOUR_PUBLIC_KEY");

      const templateParams = {
        to_email: formData.email || "Not provided",
        cc_email: "drawais@gmail.com",
        message: "Please find attached your medical report.",
        pdf_url: pdfUrl,
      };

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams
      );

      toast({
        title: "Report Sent",
        description: "The medical report has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Summary Report</h2>
      
      <div className="prose max-w-none">
        <p className="text-sm text-muted-foreground mb-4">
          This is a sample report showing how your submitted data will appear. The actual report will contain your submitted information.
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <BlobProvider document={<MedicalReport formData={formData} />}>
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
                {loading ? "Generating PDF..." : "Download Report"}
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