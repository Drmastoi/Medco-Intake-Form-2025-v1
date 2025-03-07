
import { TravelAnxietyInitial } from "./travel-anxiety/TravelAnxietyInitial";
import { DrivingQuestions } from "./travel-anxiety/DrivingQuestions";
import { AnxietyTiming } from "./travel-anxiety/AnxietyTiming";
import { AnxietySeverity } from "./travel-anxiety/AnxietySeverity";
import { AnxietyHistory } from "./travel-anxiety/AnxietyHistory";

export function IntakeFormSection7({ form }: { form: any }) {
  const travelAnxiety = form.watch("travelAnxiety");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Travel Anxiety Information</h2>
      
      <TravelAnxietyInitial form={form} />

      {travelAnxiety === "1" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DrivingQuestions form={form} />
          <div className="space-y-4">
            <AnxietyTiming form={form} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnxietySeverity form={form} isInitial={true} />
        <AnxietySeverity form={form} isInitial={false} />
      </div>

      <AnxietyHistory form={form} />
    </div>
  );
}
