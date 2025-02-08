
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { BlobProvider } from '@react-pdf/renderer';
import { supabase } from "@/integrations/supabase/client";
import { MedcoReport } from './report/ReportPDF';
import { ClaimantReportPDF } from './report/ClaimantReportPDF';

export function ClaimantSummaryReport({ form, onSubmit }: { form: any; onSubmit: () => void }) {
  const [signature, setSignature] = useState("");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Memoize form data to prevent regeneration on every render
  const formData = useMemo(() => form.getValues(), [form]);

  const handleSubmit = useCallback(async (pdfUrl: string, fullReportUrl: string) => {
    if (!signature.trim()) {
      toast({
        title: "Signature Required",
        description: "Please enter your name as a signature to confirm the report.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert PDFs to blobs
      const [pdfResponse, fullPdfResponse] = await Promise.all([
        fetch(pdfUrl),
        fetch(fullReportUrl)
      ]);
      const [pdfBlob, fullPdfBlob] = await Promise.all([
        pdfResponse.blob(),
        fullPdfResponse.blob()
      ]);

      // Convert blobs to base64
      const [pdfBase64, fullPdfBase64] = await Promise.all([
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
          reader.readAsDataURL(pdfBlob);
        }),
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
          reader.readAsDataURL(fullPdfBlob);
        })
      ]);

      // Generate reference number
      const referenceNumber = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create report record
      const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .insert({
          original_filename: `MEDCO_Report_${formData.fullName || 'Anonymous'}_${referenceNumber}.pdf`,
          storage_path: `anonymous/${referenceNumber}`,
          status: 'pending_review',
          signature_status: 'signed',
          claimant_email: formData.email
        })
        .select()
        .single();

      if (reportError) throw reportError;

      // Add signature record
      const { error: signatureError } = await supabase
        .from('claimant_signatures')
        .insert({
          report_id: reportData.id,
          claimant_name: signature,
          confirmed: true
        });

      if (signatureError) throw signatureError;

      // Send emails with PDFs
      const { error: emailError } = await supabase.functions.invoke('send-report', {
        body: {
          to: formData.email,
          pdfBase64: pdfBase64,
          patientName: formData.fullName || 'Anonymous',
          referenceNumber,
          isClaimantCopy: true
        }
      });

      if (emailError) throw emailError;

      // Send full report to doctor
      const { error: doctorEmailError } = await supabase.functions.invoke('send-report', {
        body: {
          to: 'drawais@gmail.com',
          pdfBase64: fullPdfBase64,
          patientName: formData.fullName || 'Anonymous',
          referenceNumber,
          isClaimantCopy: false
        }
      });

      if (doctorEmailError) throw doctorEmailError;

      toast({
        title: "Report Submitted Successfully",
        description: "Your report has been submitted and sent to the specified email addresses.",
      });

      onSubmit();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [signature, formData, toast, onSubmit]);

  // Memoize PDF components to prevent recreation on every render
  const ClaimantPDFDocument = useMemo(() => <ClaimantReportPDF formData={formData} />, [formData]);
  const MedcoPDFDocument = useMemo(() => <MedcoReport formData={formData} />, [formData]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Report Summary</h2>
        
        <div className="prose max-w-none mb-6">
          <p className="text-sm text-muted-foreground">
            Please review your report summary below. This version excludes medical examination details and recommendations.
          </p>
        </div>

        <div className="space-y-6">
          <BlobProvider document={ClaimantPDFDocument}>
            {({ url: claimantUrl, loading: claimantLoading }) => (
              <BlobProvider document={MedcoPDFDocument}>
                {({ url: fullUrl, loading: fullLoading }) => (
                  <>
                    <Button 
                      disabled={claimantLoading}
                      onClick={() => {
                        if (claimantUrl) {
                          window.open(claimantUrl, '_blank');
                        }
                      }}
                      variant="outline"
                    >
                      Preview Summary Report
                    </Button>

                    <div className="mt-8 border-t pt-6">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          I confirm I have entered all information about my accident and injuries to the best of my knowledge.
                        </p>

                        <div className="space-y-2">
                          <Label htmlFor="signature">Sign by typing your full name *</Label>
                          <Input
                            id="signature"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            placeholder="Type your full name here"
                            required
                          />
                        </div>

                        <Button
                          onClick={() => {
                            if (claimantUrl && fullUrl) {
                              handleSubmit(claimantUrl, fullUrl);
                            }
                          }}
                          disabled={isSubmitting || claimantLoading || fullLoading || !signature.trim()}
                          className="w-full mt-4"
                        >
                          {isSubmitting ? "Submitting..." : "Agree & Submit"}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </BlobProvider>
            )}
          </BlobProvider>
        </div>
      </div>
    </div>
  );
}
