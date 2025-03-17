
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export function useReportSubmission(onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const uploadPdfToStorage = async (
    pdfBlob: string, 
    fileName: string
  ): Promise<string> => {
    try {
      // Convert data URL to Blob
      const blob = await fetch(pdfBlob).then(r => r.blob());
      
      // Upload to Supabase Storage
      const filePath = `reports/${fileName}-${Date.now()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from('reports')
        .upload(filePath, blob, { contentType: 'application/pdf' });

      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage.from('reports').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading PDF:', error);
      throw error;
    }
  };

  const handleSubmit = async (
    signature: string, 
    formData: any, 
    claimantPdfUrl: string, 
    fullPdfUrl: string,
    finalPdfUrl?: string
  ) => {
    if (!signature) {
      toast({
        title: "Signature Required",
        description: "Please provide your signature before submitting the report.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // No longer checking for authentication
      
      // Upload PDFs to storage
      const claimantStorageUrl = await uploadPdfToStorage(claimantPdfUrl, 'claimant-report');
      const fullStorageUrl = await uploadPdfToStorage(fullPdfUrl, 'expert-report');
      let finalStorageUrl = '';
      
      if (finalPdfUrl) {
        finalStorageUrl = await uploadPdfToStorage(finalPdfUrl, 'final-medco-report');
      }

      // Insert record to database without requiring user authentication
      const { error } = await supabase
        .from('reports')
        .insert([
          {
            // Using email as identifier instead of user_id
            claimant_email: formData.emailId,
            storage_path: fullStorageUrl,
            original_filename: 'expert-report.pdf',
            status: 'submitted',
            // Store additional report URLs in the comments field as JSON
            comments: JSON.stringify({
              claimantReport: claimantStorageUrl,
              finalReport: finalStorageUrl
            })
          }
        ]);

      if (error) throw error;

      // Add signature record
      await supabase
        .from('claimant_signatures')
        .insert([
          {
            claimant_name: formData.fullName,
            confirmed: true
          }
        ]);

      // Success notification
      toast({
        title: "Report Submitted",
        description: "Your medical report has been successfully submitted.",
      });

      // Trigger callback
      onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit };
}
