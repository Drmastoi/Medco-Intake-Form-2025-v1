
import { PersonalIdentityFields } from "@/components/personal-info/PersonalIdentityFields";
import { OccupationFields } from "@/components/personal-info/OccupationFields";
import { HouseholdFields } from "@/components/personal-info/HouseholdFields";
import { ContactFields } from "@/components/personal-info/ContactFields";

export function PreFilledDetails({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PersonalIdentityFields form={form} />
        <OccupationFields form={form} />
        <HouseholdFields form={form} />
        <ContactFields form={form} />
      </div>
    </div>
  );
}
