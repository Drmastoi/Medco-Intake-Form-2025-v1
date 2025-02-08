
import { BlobProvider } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { SignatureInput } from './SignatureInput';
import { ClaimantReportPDF } from './ClaimantReportPDF';
import { MedcoReport } from './ReportPDF';

interface PDFPreviewProps {
  formData: any;
  signature: string;
  setSignature: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: (claimantUrl: string, fullUrl: string) => void;
}

export function PDFPreview({ 
  formData, 
  signature, 
  setSignature, 
  isSubmitting, 
  onSubmit 
}: PDFPreviewProps) {
  return (
    <div className="space-y-6">
      <BlobProvider document={<ClaimantReportPDF formData={formData} />}>
        {({ url: claimantUrl, loading: claimantLoading }) => (
          <BlobProvider document={<MedcoReport formData={formData} />}>
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
                          onSubmit(claimantUrl, fullUrl);
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
  );
}
