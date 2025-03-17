
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rating: number;
  setRating: (rating: number) => void;
  onSubmit: () => void;
}

export function RatingDialog({
  open,
  onOpenChange,
  rating,
  setRating,
  onSubmit,
}: RatingDialogProps) {
  const expertName = "Dr Awais Iqbal";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thank You for Completing Your Assessment</DialogTitle>
          <DialogDescription className="space-y-4">
            <p>Your report has been successfully submitted for review.</p>
            <p>A summary copy has been sent to your email address, and a full medical report has been sent to {expertName} for review.</p>
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
              onClick={onSubmit}
              className="w-full mt-4"
            >
              Submit Rating
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
