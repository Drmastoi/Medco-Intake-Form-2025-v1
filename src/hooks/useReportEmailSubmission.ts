
import { useState } from 'react';
import { ReportData } from '@/types/reportTypes';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { convertFormDataToReportData } from '@/utils/pdfReportUtils';
import { generatePdfAsBase64 } from '@/utils/pdfGenerationUtils';
import { supabaseClient } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseReportEmailSubmissionProps {
  formData: FormSchema;
}

export function useReportEmailSubmission({ formData }: UseReportEmailSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const submitReportViaEmail = async (recipientEmail: string, recipientName: string) => {
    try {
      setIsSubmitting(true);
      setIsSuccess(false);

      // Convert form data to report data format
      const reportData: ReportData = convertFormDataToReportData(formData);

      // Generate PDF as base64
      const pdfBase64 = await generatePdfAsBase64(reportData);

      // Call Supabase edge function to send email
      const { error } = await supabaseClient.functions.invoke('send-report', {
        body: {
          recipientEmail,
          recipientName,
          reportData,
          pdfBase64
        }
      });

      if (error) {
        throw new Error(`Error sending report: ${error.message}`);
      }

      setIsSuccess(true);
      toast({
        title: "Report Email Sent",
        description: `The report has been sent to ${recipientEmail}`,
      });

    } catch (error) {
      console.error("Error submitting report via email:", error);
      toast({
        variant: "destructive",
        title: "Failed to send report",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isSuccess,
    submitReportViaEmail
  };
}
