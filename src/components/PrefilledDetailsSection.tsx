
import { Form } from "@/components/ui/form";
import { ShareLinkButton } from "@/components/prefilled-details/ShareLinkButton";
import { SavePrefilledButton } from "@/components/prefilled-details/SavePrefilledButton";
import { LoadPrefilledButton } from "@/components/prefilled-details/LoadPrefilledButton";
import { SolicitorFields } from "@/components/prefilled-details/SolicitorFields";
import { InstructingPartyFields } from "@/components/prefilled-details/InstructingPartyFields";
import { ExaminationFields } from "@/components/prefilled-details/ExaminationFields";
import { DateFields } from "@/components/prefilled-details/DateFields";
import { ClaimantEmailField } from "@/components/prefilled-details/ClaimantEmailField";
import { TimeSpentField } from "@/components/prefilled-details/TimeSpentField";
import { MobileNumberField } from "@/components/prefilled-details/MobileNumberField";

export function PrefilledDetailsSection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Prefilled Details</h2>
        <div className="flex space-x-2">
          <LoadPrefilledButton form={form} />
          <SavePrefilledButton form={form} />
          <ShareLinkButton form={form} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SolicitorFields form={form} />
        <InstructingPartyFields form={form} />
        <ExaminationFields form={form} />
        <DateFields form={form} />
        <div className="grid grid-cols-2 gap-6">
          <ClaimantEmailField form={form} />
          <MobileNumberField form={form} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <TimeSpentField form={form} />
        </div>
      </div>
    </div>
  );
}
