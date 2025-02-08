
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ClaimantSummaryReport } from './ClaimantSummaryReport';
import { RatingDialog } from './RatingDialog';

export function IntakeFormSummary({ form }: { form: any }) {
  const { toast } = useToast();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmitComplete = () => {
    setShowRatingDialog(true);
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
      <ClaimantSummaryReport form={form} onSubmit={handleSubmitComplete} />
      
      <RatingDialog
        open={showRatingDialog}
        onOpenChange={setShowRatingDialog}
        rating={rating}
        setRating={setRating}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
}
