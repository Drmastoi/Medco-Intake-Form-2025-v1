import { DateTimeSection } from "./accident-info/DateTimeSection";
import { VehicleStatusSection } from "./accident-info/VehicleStatusSection";
import { VehicleDetailsSection } from "./accident-info/VehicleDetailsSection";
import { ImpactSection } from "./accident-info/ImpactSection";
import { ClaimantPositionSection } from "./accident-info/ClaimantPositionSection";

export function IntakeFormSection2({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Accident Information</h2>
      
      <div className="space-y-6">
        <DateTimeSection form={form} />
        <VehicleStatusSection form={form} />
        <VehicleDetailsSection form={form} />
        <ImpactSection form={form} />
        <ClaimantPositionSection form={form} />
      </div>
    </div>
  );
}