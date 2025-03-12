
import { useState, useMemo } from "react";
import { useReportSubmission } from '@/hooks/useReportSubmission';
import { PDFPreview } from './report/PDFPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ClaimantSummaryReport({ form, onSubmit }: { form: any; onSubmit: () => void }) {
  const [signature, setSignature] = useState("");
  const { isSubmitting, handleSubmit } = useReportSubmission(onSubmit);
  const [activeTab, setActiveTab] = useState("claimant");
  
  // Memoize form data to prevent regeneration on every render
  const formData = useMemo(() => form.getValues(), [form]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Report Summary</h2>
        
        <Tabs defaultValue="claimant" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="claimant">Claimant Summary</TabsTrigger>
            <TabsTrigger value="expert">Medical Expert Report</TabsTrigger>
            <TabsTrigger value="final">Final Medco Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="claimant" className="mt-4">
            <div className="prose max-w-none mb-6">
              <p className="text-sm text-muted-foreground">
                This is the summary report that will be sent to you. It includes your case details and excludes clinical examination details and medical recommendations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="expert" className="mt-4">
            <div className="prose max-w-none mb-6">
              <p className="text-sm text-muted-foreground">
                This is the full medical report that will be sent to the medical expert. It includes case details, all clinical findings and recommendations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="final" className="mt-4">
            <div className="prose max-w-none mb-6">
              <p className="text-sm text-muted-foreground">
                This is the final Medco-compliant report that will be used for official purposes. It includes comprehensive medical assessment, all clinical findings, and formal recommendations.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <PDFPreview
          formData={formData}
          signature={signature}
          setSignature={setSignature}
          isSubmitting={isSubmitting}
          onSubmit={(claimantUrl, fullUrl, finalUrl) => handleSubmit(signature, formData, claimantUrl, fullUrl, finalUrl)}
          previewMode={activeTab as 'claimant' | 'expert' | 'final'}
        />
      </div>
    </div>
  );
}
