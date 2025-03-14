
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DisclaimerSectionProps {
  hasAcceptedTerms: boolean;
  setHasAcceptedTerms: (checked: boolean) => void;
}

export const DisclaimerSection = ({ 
  hasAcceptedTerms, 
  setHasAcceptedTerms 
}: DisclaimerSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Disclaimer</h3>
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="terms" 
          checked={hasAcceptedTerms}
          onCheckedChange={(checked) => setHasAcceptedTerms(checked === true)}
          className="mt-1"
        />
        <Label 
          htmlFor="terms" 
          className="text-sm text-gray-600"
        >
          I agree that I have mentioned all injuries and effects for the purpose of this report. 
          I understand that this report will be submitted to a medical expert for review.
        </Label>
      </div>
    </div>
  );
};
