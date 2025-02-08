
import { useState, useMemo } from "react";
import { useReportSubmission } from '@/hooks/useReportSubmission';
import { PDFPreview } from './report/PDFPreview';

export function ClaimantSummaryReport({ form, onSubmit }: { form: any; onSubmit: () => void }) {
  const [signature, setSignature] = useState("");
  const { isSubmitting, handleSubmit } = useReportSubmission(onSubmit);
  
  // Memoize form data to prevent regeneration on every render
  const formData = useMemo(() => form.getValues(), [form]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Report Summary</h2>
        
        <div className="prose max-w-none mb-6">
          <p className="text-sm text-muted-foreground">
            Please review your report summary below. This version excludes medical examination details and recommendations.
          </p>
        </div>

        <PDFPreview
          formData={formData}
          signature={signature}
          setSignature={setSignature}
          isSubmitting={isSubmitting}
          onSubmit={(claimantUrl, fullUrl) => handleSubmit(signature, formData, claimantUrl, fullUrl)}
        />
      </div>
    </div>
  );
}
