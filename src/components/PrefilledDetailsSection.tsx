
import { Form } from "@/components/ui/form";
import { ShareLinkButton } from "@/components/prefilled-details/ShareLinkButton";
import { SolicitorFields } from "@/components/prefilled-details/SolicitorFields";
import { InstructingPartyFields } from "@/components/prefilled-details/InstructingPartyFields";
import { ExaminationFields } from "@/components/prefilled-details/ExaminationFields";
import { DateFields } from "@/components/prefilled-details/DateFields";
import { ClaimantEmailField } from "@/components/prefilled-details/ClaimantEmailField";
import { TimeSpentField } from "@/components/prefilled-details/TimeSpentField";

export function PrefilledDetailsSection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Prefilled Details</h2>
        <ShareLinkButton form={form} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SolicitorFields form={form} />
        <InstructingPartyFields form={form} />
        <ExaminationFields form={form} />
        <DateFields form={form} />
        <div className="grid grid-cols-1 gap-6">
          <ClaimantEmailField form={form} />
          <TimeSpentField form={form} />
        </div>
      </div>
    </div>
  );
}
