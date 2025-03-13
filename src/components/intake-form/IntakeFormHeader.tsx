
import React from "react";
import { IntakeFormNavigation } from "@/components/intake-form/IntakeFormNavigation";
import { IntakeFormGuidance } from "@/components/intake-form/IntakeFormGuidance";

interface IntakeFormHeaderProps {
  currentSection: number;
  onTabChange: (value: string) => void;
  tabNames: string[];
  onGenerateReport: () => void;
  onPreviewReport: () => void;
}

export function IntakeFormHeader({
  currentSection,
  onTabChange,
  tabNames,
  onGenerateReport,
  onPreviewReport
}: IntakeFormHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Personal Injury Assessment Questionnaire</h1>
      <IntakeFormGuidance currentSection={currentSection} />
      <IntakeFormNavigation 
        currentSection={currentSection}
        onTabChange={onTabChange}
        tabNames={tabNames}
        onGenerateReport={onGenerateReport}
        onPreviewReport={onPreviewReport}
      />
    </>
  );
}
