
import { BruisingInitial } from "./bruising/BruisingInitial";
import { BruisingLocation } from "./bruising/BruisingLocation";
import { BruisingTiming } from "./bruising/BruisingTiming";
import { BruisingSeverity } from "./bruising/BruisingSeverity";
import { VisibleScar } from "./bruising/VisibleScar";
import { BruisingSummary } from "./bruising/BruisingSummary";

export function IntakeFormSection8({ form }: { form: any }) {
  const hasBruising = form.watch("hasBruising");
  
  // Collect all relevant form data for the summary component
  const formData = {
    hasBruising: form.watch("hasBruising"),
    bruisingLocation: form.watch("bruisingLocation"),
    bruisingNoticed: form.watch("bruisingNoticed"),
    bruisingInitialSeverity: form.watch("bruisingInitialSeverity"),
    bruisingCurrentSeverity: form.watch("bruisingCurrentSeverity"),
    bruisingResolveDays: form.watch("bruisingResolveDays"),
    hasVisibleScar: form.watch("hasVisibleScar")
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Bruising and Scarring Information</h2>
      
      <BruisingInitial form={form} />

      {hasBruising === "1" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <BruisingLocation form={form} />
              <BruisingTiming form={form} />
              <BruisingSeverity form={form} isInitial={true} />
            </div>

            <div className="space-y-4">
              <BruisingSeverity form={form} isInitial={false} />
              <VisibleScar form={form} />
            </div>
          </div>
        </>
      )}
      
      <BruisingSummary formData={formData} />
    </div>
  );
}
