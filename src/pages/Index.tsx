
import React from "react";
import { IntakeFormContainer } from "@/components/intake-form/IntakeFormContainer";

export default function Index() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Medical Legal Report Questionnaire</h1>
      <IntakeFormContainer />
    </div>
  );
}
