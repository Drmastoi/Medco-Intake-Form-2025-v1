
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ClaimantSummaryReport } from './ClaimantSummaryReport';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank You for Completing Your Assessment</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>Your report has been successfully submitted for review.</p>
              <p>A summary copy has been sent to your email address, and a full medical report has been sent to our expert for review.</p>
              <div className="mt-4">
                <p className="mb-2">How would you rate your experience?</p>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-2 hover:scale-110 transition-transform ${
                        rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <Button 
                onClick={handleRatingSubmit}
                className="w-full mt-4"
              >
                Submit Rating
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
