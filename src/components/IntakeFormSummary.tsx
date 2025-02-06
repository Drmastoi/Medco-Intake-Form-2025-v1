import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BlobProvider } from '@react-pdf/renderer';
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";
import { MedcoReport } from './report/MedcoReport';
import { useEffect, useState } from "react";
import { Eye, Send, Download, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function IntakeFormSummary({ form }: { form: any }) {
  const { toast } = useToast();
  const formData = form.getValues();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    emailjs.init("YnnsjqOayi-IRBxy_");
  }, []);

  const uploadToStorage = async (pdfBlob: Blob, fileName: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const filePath = `${userData.user.id}/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('medical_reports')
        .upload(filePath, pdfBlob, {
          contentType: 'application/pdf',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('reports')
        .insert({
          patient_id: userData.user.id,
          original_filename: fileName,
          storage_path: filePath,
          version: 1,
          status: 'pending_review'
        });

      if (dbError) throw dbError;

      return filePath;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const sendToMedicalExpert = async (pdfUrl: string) => {
    try {
      setIsUploading(true);
      const response = await fetch(pdfUrl);
      const pdfBlob = await response.blob();
      const fileName = `MEDCO_Report_${formData.fullName}_${new Date().toISOString()}.pdf`;
      
      await uploadToStorage(pdfBlob, fileName);

      const templateParams = {
        to_name: "Medical Expert",
        to_email: "drawais@gmail.com",
        message: `
Dear Medical Expert,

A new MEDCO medical report has been generated for review. This report is for patient ${formData.fullName || "Unknown"}.

Please review the report in the medical expert dashboard. If you need any additional information or clarification, please don't hesitate to contact us.

Best regards,
Medical Assessment Team
        `,
      };

      await emailjs.send(
        "service_by7xf4t",
        "template_5l8vu23",
        templateParams,
        "YnnsjqOayi-IRBxy_"
      );
      
      toast({
        title: "Report Submitted",
        description: "The MEDCO medical report has been uploaded and sent for review.",
      });

      setShowRatingDialog(true);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRatingSubmit = () => {
    toast({
      title: "Thank you for your feedback!",
      description: "Your rating has been submitted successfully.",
    });
    setShowRatingDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">MEDCO Report Summary</h2>
        
        <div className="prose max-w-none mb-6">
          <p className="text-sm text-muted-foreground">
            This report follows the MEDCO format requirements. You can preview, download, 
            or send the report using the options below.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
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
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {loading ? "Loading Preview..." : "Preview Report"}
                </Button>

                <Button 
                  disabled={loading}
                  onClick={() => {
                    if (url) {
                      window.open(url, '_blank');
                    }
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {loading ? "Generating..." : "Download Report"}
                </Button>

                <Button 
                  disabled={loading || isUploading}
                  onClick={() => {
                    if (url) {
                      sendToMedicalExpert(url);
                    }
                  }}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="w-4 h-4" />
                  {isUploading ? "Uploading..." : loading ? "Generating..." : "Submit for Review"}
                </Button>
              </>
            )}
          </BlobProvider>
        </div>
      </div>

      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank You for Completing Your Assessment</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>Your report has been successfully submitted to our medical expert for review.</p>
              <p>Please remember to attend your medical appointment as scheduled.</p>
              <div className="mt-4">
                <p className="mb-2">How would you rate your experience?</p>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-2 hover:scale-110 transition-transform ${
                        rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <Button 
                onClick={handleRatingSubmit}
                className="w-full mt-4"
              >
                Submit Rating
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}