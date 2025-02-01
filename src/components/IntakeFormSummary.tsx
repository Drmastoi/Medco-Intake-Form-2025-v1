import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Document, Page, Text, View, StyleSheet, BlobProvider } from '@react-pdf/renderer';
import { ReactElement } from "react";

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

        {/* Neck Pain Section */}
        <Text style={styles.text}>
          {formData.neckPain === "1" 
            ? `The claimant reports experiencing neck symptoms following the accident. Additional details: ${formData.additionalInfo || 'No additional details provided'}`
            : "The claimant does not report any neck symptoms."}
        </Text>

        {/* Shoulder Pain Section */}
        <Text style={styles.text}>
          {formData.shoulderPain === "1"
            ? `The claimant reports shoulder pain on the ${
                formData.shoulderSide === "1" ? "left side" :
                formData.shoulderSide === "2" ? "right side" : "both sides"
              }. The pain started ${
                formData.shoulderPainStart === "1" ? "on the same day" :
                formData.shoulderPainStart === "2" ? "the next day" : "a few days later"
              }.`
            : "The claimant does not report any shoulder symptoms."}
        </Text>

        {/* Back Pain Section */}
        <Text style={styles.text}>
          {formData.backPain === "1"
            ? `The claimant reports back pain in the ${
                formData.backLocation === "1" ? "upper back" :
                formData.backLocation === "2" ? "middle back" :
                formData.backLocation === "3" ? "lower back" : "entire back"
              } region.`
            : "The claimant does not report any back pain symptoms."}
        </Text>

        {/* Travel Anxiety Section */}
        <Text style={styles.text}>
          {formData.travelAnxiety === "1"
            ? `The claimant developed travel anxiety ${
                formData.anxietyStart === "1" ? "on the same day" :
                formData.anxietyStart === "2" ? "the next day" : "a few days later"
              } after the accident.`
            : "The claimant does not report any travel anxiety."}
        </Text>
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

        <h3>Medical Symptoms</h3>
        
        {/* Neck Pain Summary */}
        <p>
          {formData.neckPain === "1" 
            ? `The claimant reports experiencing neck symptoms following the accident. ${formData.additionalInfo || ''}`
            : "The claimant does not report any neck symptoms."}
        </p>

        {/* Shoulder Pain Summary */}
        <p>
          {formData.shoulderPain === "1"
            ? `The claimant reports shoulder pain on the ${
                formData.shoulderSide === "1" ? "left side" :
                formData.shoulderSide === "2" ? "right side" : "both sides"
              }.`
            : "The claimant does not report any shoulder symptoms."}
        </p>

        {/* Back Pain Summary */}
        <p>
          {formData.backPain === "1"
            ? `The claimant reports back pain in the ${
                formData.backLocation === "1" ? "upper back" :
                formData.backLocation === "2" ? "middle back" :
                formData.backLocation === "3" ? "lower back" : "entire back"
              } region.`
            : "The claimant does not report any back pain symptoms."}
        </p>

        {/* Travel Anxiety Summary */}
        {formData.travelAnxiety === "1" ? (
          <p>
            The claimant developed travel anxiety {
              formData.anxietyStart === "1" ? "on the same day" :
              formData.anxietyStart === "2" ? "the next day" : "a few days later"
            } after the accident.
          </p>
        ) : (
          <p>The claimant does not report any travel anxiety.</p>
        )}
      </div>

      <div className="mt-6">
        <BlobProvider document={<MedicalReport formData={formData} />}>
          {({ url, loading }) => (
            <Button 
              disabled={loading}
              onClick={() => {
                if (url) {
                  window.open(url, '_blank');
                }
              }}
            >
              {loading ? "Generating PDF..." : "Download Medical Report"}
            </Button>
          )}
        </BlobProvider>
      </div>
    </div>
  );
}