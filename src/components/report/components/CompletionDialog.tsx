
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RatingDialog } from "@/components/RatingDialog";

interface CompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  claimantName: string;
  claimantEmail?: string;
}

export function CompletionDialog({
  isOpen,
  onClose,
  claimantName,
  claimantEmail
}: CompletionDialogProps) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const { toast } = useToast();
  const expertName = "Dr Awais Iqbal";

  const handleConfirm = () => {
    setShowRating(true);
  };

  const handleSubmitRating = async () => {
    try {
      // Save the rating to Supabase if we have it
      if (rating > 0) {
        await supabase
          .from('feedback_ratings')
          .insert({
            rating: rating,
            email: claimantEmail,
            feedback_type: 'questionnaire_completion',
            user_name: claimantName
          });
      }
      
      toast({
        title: "Thank you!",
        description: "Your feedback has been recorded.",
      });
      
      // Close both dialogs
      setShowRating(false);
      onClose();
    } catch (error) {
      console.error("Error saving rating:", error);
      // Still close the dialogs even if there's an error
      setShowRating(false);
      onClose();
    }
  };

  return (
    <>
      <AlertDialog open={isOpen && !showRating} onOpenChange={onClose}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <span>Questionnaire Completed</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4">
              <p>
                Thank you, {claimantName}, for completing your questionnaire. Your
                information has been successfully submitted.
              </p>
              <p>
                {expertName} will review your responses and prepare your
                medical-legal report. You will be contacted if any additional
                information is needed.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction onClick={handleConfirm} className="w-full">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <RatingDialog
        open={showRating}
        onOpenChange={setShowRating}
        rating={rating}
        setRating={setRating}
        onSubmit={handleSubmitRating}
      />
    </>
  );
}
