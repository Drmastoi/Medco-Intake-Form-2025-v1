import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BlobProvider } from '@react-pdf/renderer';
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";
import { MedcoReport } from './report/MedcoReport';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function IntakeFormSummary({ form }: { form: any }) {
  const { toast } = useToast();
  const formData = form.getValues();
  
  const [adminDetails, setAdminDetails] = useState({
    referenceNumber: '',
    medcoNumber: '',
    instructingPartyRef: ''
  });

  const sendEmail = async (pdfUrl: string) => {
    try {
      emailjs.init("YOUR_PUBLIC_KEY");

      const templateParams = {
        to_email: formData.email || "Not provided",
        cc_email: "drawais@gmail.com",
        message: "Please find attached your MEDCO medical report.",
        pdf_url: pdfUrl,
      };

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams
      );

      toast({
        title: "Report Sent",
        description: "The MEDCO medical report has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminDetails(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const mergedData = {
    ...formData,
    ...adminDetails
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Administrative Details</h2>
      
      <div className="grid gap-4 p-4 border rounded-lg bg-gray-50">
        <div className="space-y-2">
          <Label htmlFor="referenceNumber">Reference Number</Label>
          <Input
            id="referenceNumber"
            value={adminDetails.referenceNumber}
            onChange={handleInputChange('referenceNumber')}
            placeholder="Enter reference number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="medcoNumber">MEDCO Number</Label>
          <Input
            id="medcoNumber"
            value={adminDetails.medcoNumber}
            onChange={handleInputChange('medcoNumber')}
            placeholder="Enter MEDCO number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instructingPartyRef">Instructing Party Reference</Label>
          <Input
            id="instructingPartyRef"
            value={adminDetails.instructingPartyRef}
            onChange={handleInputChange('instructingPartyRef')}
            placeholder="Enter instructing party reference"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">MEDCO Report</h2>
      
      <div className="prose max-w-none">
        <p className="text-sm text-muted-foreground mb-4">
          This report follows the MEDCO format requirements. You can preview, download, or email the report using the buttons below.
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <BlobProvider document={<MedcoReport formData={mergedData} />}>
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