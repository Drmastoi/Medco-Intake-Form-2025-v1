
import { useMemo } from 'react';
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
  previewMode?: 'claimant' | 'expert';
}

export function PDFPreview({ 
  formData, 
  signature, 
  setSignature, 
  isSubmitting, 
  onSubmit,
  previewMode = 'claimant'
}: PDFPreviewProps) {
  // Get current date and time for signature timestamp
  const signatureDate = useMemo(() => new Date().toISOString(), [signature]);
  
  // Memoize the PDF documents to prevent unnecessary re-renders
  const claimantDocument = useMemo(() => (
    <ClaimantReportPDF 
      formData={formData} 
      signature={signature} 
      signatureDate={signatureDate}
    />
  ), [formData, signature, signatureDate]);
  
  const fullDocument = useMemo(() => (
    <MedcoReport 
      formData={formData} 
      signature={signature} 
      signatureDate={signatureDate}
    />
  ), [formData, signature, signatureDate]);

  return (
    <div className="space-y-6">
      <BlobProvider document={claimantDocument}>
        {({ url: claimantUrl, loading: claimantLoading }) => (
          <BlobProvider document={fullDocument}>
            {({ url: fullUrl, loading: fullLoading }) => (
              <>
                <Button 
                  disabled={claimantLoading || fullLoading}
                  onClick={() => {
                    if (previewMode === 'claimant' && claimantUrl) {
                      window.open(claimantUrl, '_blank');
                    } else if (previewMode === 'expert' && fullUrl) {
                      window.open(fullUrl, '_blank');
                    }
                  }}
                  variant="outline"
                  className="mb-2"
                >
                  Preview {previewMode === 'expert' ? 'Full Medical Report' : 'Summary Report'}
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
