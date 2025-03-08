
import React from "react";
import { Button } from "@/components/ui/button";

interface IntakeFormNavButtonsProps {
  currentSection: number;
  totalSections: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
}

export function IntakeFormNavButtons({ 
  currentSection, 
  totalSections, 
  setCurrentSection 
}: IntakeFormNavButtonsProps) {
  return (
    <div className="flex justify-between">
      <Button 
        type="button" 
        variant="outline"
        onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
        disabled={currentSection === 0}
      >
        Previous
      </Button>
      
      {currentSection < totalSections - 1 && (
        <Button 
          type="button"
          onClick={() => setCurrentSection(prev => Math.min(totalSections - 1, prev + 1))}
        >
          Next
        </Button>
      )}
    </div>
  );
}
