import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const MedicalReport = ({ formData }: { formData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Medical Report</Text>
        
        {/* Personal Information */}
        <Text style={styles.text}>
          {`The claimant ${formData.fullName || ''}, born on ${formData.dateOfBirth || ''}, was involved in a road traffic accident.`}
        </Text>

        {/* Accident Information */}
        <Text style={styles.text}>
          {`The accident occurred on ${formData.accidentDate || ''} during the ${
            formData.accidentTime === "1" ? "morning" :
            formData.accidentTime === "2" ? "afternoon" :
            formData.accidentTime === "3" ? "evening" : "night"
          }. The claimant was the ${
            formData.vehiclePosition === "1" ? "driver" :
            formData.vehiclePosition === "2" ? "front passenger" : "back passenger"
          } of the vehicle.`}
        </Text>

        {/* Neck Pain */}
        <Text style={styles.text}>
          {formData.neckPain === "1" 
            ? "The claimant reports experiencing neck symptoms following the accident."
            : "The claimant does not report any neck symptoms."}
        </Text>

        {/* Travel Anxiety */}
        <Text style={styles.text}>
          {formData.travelAnxiety === "1"
            ? `The claimant developed travel anxiety ${
                formData.anxietyStart === "1" ? "on the same day" :
                formData.anxietyStart === "2" ? "the next day" : "a few days later"
              } after the accident. The initial severity was ${
                formData.anxietyInitialSeverity === "1" ? "mild" :
                formData.anxietyInitialSeverity === "2" ? "moderate" : "severe"
              }.`
            : "The claimant does not report any travel anxiety."}
        </Text>

        {/* Additional sections can be added following the same pattern */}
      </View>
    </Page>
  </Document>
);

export function IntakeFormSummary({ form }: { form: any }) {
  const formData = form.getValues();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      
      <div className="prose max-w-none">
        <h3>Personal Information</h3>
        <p>
          The claimant {formData.fullName}, born on {formData.dateOfBirth}, was involved in a road traffic accident.
        </p>

        <h3>Accident Information</h3>
        <p>
          The accident occurred on {formData.accidentDate} during the {
            formData.accidentTime === "1" ? "morning" :
            formData.accidentTime === "2" ? "afternoon" :
            formData.accidentTime === "3" ? "evening" : "night"
          }. The claimant was the {
            formData.vehiclePosition === "1" ? "driver" :
            formData.vehiclePosition === "2" ? "front passenger" : "back passenger"
          } of the vehicle.
        </p>

        <h3>Medical Symptoms</h3>
        <p>
          {formData.neckPain === "1" 
            ? "The claimant reports experiencing neck symptoms following the accident."
            : "The claimant does not report any neck symptoms."}
        </p>

        <h3>Travel Anxiety</h3>
        {formData.travelAnxiety === "1" && (
          <p>
            The claimant developed travel anxiety {
              formData.anxietyStart === "1" ? "on the same day" :
              formData.anxietyStart === "2" ? "the next day" : "a few days later"
            } after the accident. The initial severity was {
              formData.anxietyInitialSeverity === "1" ? "mild" :
              formData.anxietyInitialSeverity === "2" ? "moderate" : "severe"
            }.
          </p>
        )}
        {formData.travelAnxiety === "2" && (
          <p>The claimant does not report any travel anxiety.</p>
        )}

        {/* Additional sections can be added here following the same pattern */}
      </div>

      <div className="mt-6">
        <PDFDownloadLink
          document={<MedicalReport formData={formData} />}
          fileName="medical-report.pdf"
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? "Generating PDF..." : "Download Medical Report"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}