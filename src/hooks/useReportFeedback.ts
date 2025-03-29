
import { useState } from 'react';
import { ReportData } from '@/types/reportTypes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export function useReportFeedback(reportData: ReportData) {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitFeedback = async () => {
    if (rating === 0) {
      // Allow skipping the rating
      return true;
    }

    setIsSubmitting(true);

    try {
      // Get the email from the prefilled details if available, or use emailId from personal data
      const email = reportData.prefilled?.claimantEmail || 
                    reportData.personal?.emailId || 
                    null;

      // Save rating to Supabase
      const { error } = await supabase
        .from('feedback_ratings')
        .insert([
          {
            rating,
            email,
            user_name: reportData.personal?.fullName || null,
            feedback_type: 'report_generation'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Thank you for your feedback",
        description: "Your rating has been submitted successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      toast({
        title: "Feedback submission failed",
        description: "We couldn't save your feedback. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    rating,
    setRating,
    submitFeedback,
    isSubmitting
  };
}
