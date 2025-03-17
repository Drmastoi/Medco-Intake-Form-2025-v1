
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

interface IntakeFormNavButtonsProps {
  currentSection: number;
  totalSections: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: () => void;
}

export function IntakeFormNavButtons({
  currentSection,
  totalSections,
  setCurrentSection,
  onSubmit
}: IntakeFormNavButtonsProps) {
  const isLastSection = currentSection === totalSections - 1;

  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={() => setCurrentSection(currentSection - 1)}
        disabled={currentSection === 0}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      {isLastSection ? (
        <Button 
          type="submit"
          onClick={onSubmit ? (e) => {
            e.preventDefault();
            onSubmit();
          } : undefined}
        >
          <Send className="mr-2 h-4 w-4" />
          Submit Questionnaire
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setCurrentSection(currentSection + 1)}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
