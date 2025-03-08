
import React from "react";

interface IntakeFormGuidanceProps {
  currentSection: number;
}

export function IntakeFormGuidance({ currentSection }: IntakeFormGuidanceProps) {
  if (currentSection === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
        <h2 className="text-base font-semibold text-blue-900 mb-2">Expert Workflow Guide</h2>
        <p className="text-blue-800">
          Fill in the prefilled details section and share with the claimant. The claimant will complete the rest of the form and then generate a summary report.
        </p>
      </div>
    );
  }
  
  if (currentSection === 1) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
        <h2 className="text-base font-semibold text-blue-900 mb-2">Claimant Guide</h2>
        <p className="text-blue-800">
          Complete all sections to report your injuries and circumstances. Click summary to generate report and send it to medical expert and download a copy for your records.
        </p>
      </div>
    );
  }
  
  return null;
}
