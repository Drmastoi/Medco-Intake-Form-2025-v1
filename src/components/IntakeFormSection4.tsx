
import { ShoulderPainInitial } from "./shoulder-pain/ShoulderPainInitial";
import { ShoulderSide } from "./shoulder-pain/ShoulderSide";
import { ShoulderPainStart } from "./shoulder-pain/ShoulderPainStart";
import { ShoulderPainSeverity } from "./shoulder-pain/ShoulderPainSeverity";
import { ShoulderPainHistory } from "./shoulder-pain/ShoulderPainHistory";
import { ShoulderSummary } from "./shoulder-pain/ShoulderSummary";

export function IntakeFormSection4({ form }: { form: any }) {
  const shoulderPain = form.watch("shoulderPain");
  
  // Collect all relevant form data for the summary component
  const formData = {
    shoulderPain: form.watch("shoulderPain"),
    shoulderSide: form.watch("shoulderSide"),
    shoulderPainStart: form.watch("shoulderPainStart"),
    shoulderPainInitialSeverity: form.watch("shoulderPainInitialSeverity"),
    shoulderPainCurrentSeverity: form.watch("shoulderPainCurrentSeverity"),
    shoulderPainResolveDays: form.watch("shoulderPainResolveDays"),
    hadPriorShoulderPain: form.watch("hadPriorShoulderPain"),
    accidentShoulderPainPercentage: form.watch("accidentShoulderPainPercentage"),
    priorShoulderPainPercentage: form.watch("priorShoulderPainPercentage")
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Shoulder Pain Information</h2>
      
      <ShoulderPainInitial form={form} />

      {shoulderPain === "1" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <ShoulderSide form={form} />
              <ShoulderPainStart form={form} />
              <ShoulderPainSeverity form={form} isInitial={true} />
            </div>

            <div className="space-y-4">
              <ShoulderPainSeverity form={form} isInitial={false} />
            </div>
          </div>
          <ShoulderPainHistory form={form} />
        </>
      )}
      
      {/* Dynamic Summary Text */}
      <ShoulderSummary formData={formData} />
    </div>
  );
}
