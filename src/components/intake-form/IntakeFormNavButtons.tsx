
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";

interface IntakeFormNavButtonsProps {
  currentSection: number;
  totalSections: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export function IntakeFormNavButtons({
  currentSection,
  totalSections,
  setCurrentSection,
  onSubmit,
  isSubmitting = false
}: IntakeFormNavButtonsProps) {
  const isLastSection = currentSection === totalSections - 1;

  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={() => setCurrentSection(currentSection - 1)}
        disabled={currentSection === 0 || isSubmitting}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      {isLastSection ? (
        <Button 
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="min-w-[160px] bg-green-600 hover:bg-green-700 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Questionnaire
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setCurrentSection(currentSection + 1)}
          disabled={isSubmitting}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
