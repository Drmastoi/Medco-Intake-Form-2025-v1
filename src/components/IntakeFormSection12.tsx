
import React from "react";
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { PreviousAccidentSection } from "./medical-history/PreviousAccidentSection";
import { MedicalConditionsSection } from "./medical-history/MedicalConditionsSection";
import { PhysiotherapyPreferenceSection } from "./medical-history/PhysiotherapyPreferenceSection";
import { AdditionalInformationSection } from "./medical-history/AdditionalInformationSection";
import { MedicalHistorySummary } from "./medical-history/MedicalHistorySummary";

export function IntakeFormSection12({ form }: { form: any }) {
  // Watch all relevant form values for the summary
  const formValues = {
    previousAccident: form.watch("previousAccident"),
    previousAccidentDate: form.watch("previousAccidentDate"),
    previousAccidentRecovery: form.watch("previousAccidentRecovery"),
    previousInjuriesWorse: form.watch("previousInjuriesWorse"),
    previousConditionWorse: form.watch("previousConditionWorse"),
    additionalInformation: form.watch("additionalInformation"),
    additionalInformationDetails: form.watch("additionalInformationDetails"),
    exceptionalInjuries: form.watch("exceptionalInjuries"),
    exceptionalInjuriesDetails: form.watch("exceptionalInjuriesDetails"),
    physiotherapyPreference: form.watch("physiotherapyPreference")
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-muted shadow-sm">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-2xl font-semibold text-primary">Past Medical History</CardTitle>
          <CardDescription>Please provide information about any previous medical conditions or incidents</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous RTA Section */}
          <PreviousAccidentSection form={form} />
          
          {/* Medical Conditions Section */}
          <div className="space-y-4">
            <MedicalConditionsSection form={form} />
            
            {/* Physiotherapy Preference Section */}
            <PhysiotherapyPreferenceSection form={form} />
            
            {/* Additional Information Section */}
            <AdditionalInformationSection form={form} />
          </div>
        </CardContent>
      </Card>
      
      {/* Dynamic Summary Text */}
      <MedicalHistorySummary formData={formValues} />
    </div>
  );
}
