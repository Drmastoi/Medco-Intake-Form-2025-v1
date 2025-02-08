
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BlobProvider } from '@react-pdf/renderer';
import { MedcoReport } from './report/ReportPDF';
import { ClaimantReportPDF } from './report/ClaimantReportPDF';
import { SignatureInput } from './report/SignatureInput';
import { useReportSubmission } from '@/hooks/useReportSubmission';

export function ClaimantSummaryReport({ form, onSubmit }: { form: any; onSubmit: () => void }) {
  const [signature, setSignature] = useState("");
  const { isSubmitting, handleSubmit } = useReportSubmission(onSubmit);
  
  // Memoize form data to prevent regeneration on every render
  const formData = useMemo(() => form.getValues(), [form]);

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

                        <SignatureInput 
                          signature={signature}
                          setSignature={setSignature}
                        />

                        <Button
                          onClick={() => {
                            if (claimantUrl && fullUrl) {
                              handleSubmit(signature, formData, claimantUrl, fullUrl);
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
