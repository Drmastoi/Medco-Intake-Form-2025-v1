import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Document, Page, Text, View, StyleSheet, BlobProvider } from '@react-pdf/renderer';
import { ReactElement } from "react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
  },
});

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

const MedicalReport = ({ formData }: { formData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Medical Report - Road Traffic Accident</Text>
        
        {/* Personal Information */}
        <Text style={styles.subtitle}>Personal Information</Text>
        <Text style={styles.text}>
          Name: {formData.fullName || 'Not provided'}
        </Text>
        <Text style={styles.text}>
          Date of Birth: {formatDate(formData.dateOfBirth) || 'Not provided'}
        </Text>
        <Text style={styles.text}>
          Email: {formData.email || 'Not provided'}
        </Text>

        {/* Accident Information */}
        <Text style={styles.subtitle}>Accident Information</Text>
        <Text style={styles.text}>
          Date of Accident: {formatDate(formData.accidentDate) || 'Not provided'}
        </Text>
        <Text style={styles.text}>
          Time of Day: {
            formData.accidentTime === "1" ? "Morning" :
            formData.accidentTime === "2" ? "Afternoon" :
            formData.accidentTime === "3" ? "Evening" :
            formData.accidentTime === "4" ? "Night" : "Not specified"
          }
        </Text>
        <Text style={styles.text}>
          Position in Vehicle: {
            formData.vehiclePosition === "1" ? "Driver" :
            formData.vehiclePosition === "2" ? "Front Passenger" :
            formData.vehiclePosition === "3" ? "Back Passenger" : "Not specified"
          }
        </Text>

        {/* Neck Pain */}
        <Text style={styles.subtitle}>Neck Pain</Text>
        {formData.neckPain === "1" ? (
          <>
            <Text style={styles.text}>
              Onset: {
                formData.neckPainStart === "1" ? "Same day" :
                formData.neckPainStart === "2" ? "Next day" :
                formData.neckPainStart === "3" ? "Few days later" : "Not specified"
              }
            </Text>
            <Text style={styles.text}>
              Initial Severity: {
                formData.neckPainInitialSeverity === "1" ? "Mild" :
                formData.neckPainInitialSeverity === "2" ? "Moderate" :
                formData.neckPainInitialSeverity === "3" ? "Severe" : "Not specified"
              }
            </Text>
            <Text style={styles.text}>
              Current Severity: {
                formData.neckPainCurrentSeverity === "1" ? "Mild" :
                formData.neckPainCurrentSeverity === "2" ? "Moderate" :
                formData.neckPainCurrentSeverity === "3" ? "Severe" :
                formData.neckPainCurrentSeverity === "4" ? "Resolved" : "Not specified"
              }
            </Text>
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to neck pain.</Text>
        )}

        {/* Treatment Information */}
        <Text style={styles.subtitle}>Treatment Information</Text>
        {formData.sceneOfAccidentTreatment === "1" ? (
          <Text style={styles.text}>
            Treatment at scene: {formData.sceneOfAccidentTreatmentDetails || "Yes, details not provided"}
          </Text>
        ) : (
          <Text style={styles.text}>No treatment was received at the scene of accident.</Text>
        )}

        {formData.wentToAE === "1" ? (
          <>
            <Text style={styles.text}>
              Hospital Attended: {formData.hospitalName || "Name not provided"}
            </Text>
            <Text style={styles.text}>
              Treatment Received: {
                formData.hospitalTreatment === "1" ? "None" :
                formData.hospitalTreatment === "2" ? "X-ray" :
                formData.hospitalTreatment === "3" ? "CT Scan" :
                formData.hospitalTreatment === "4" ? "Bandage" :
                formData.hospitalTreatment === "5" ? "Neck Collar" : "Not specified"
              }
            </Text>
          </>
        ) : (
          <Text style={styles.text}>Claimant did not attend A&E.</Text>
        )}

        {/* Impact on Daily Life */}
        <Text style={styles.subtitle}>Impact on Daily Life</Text>
        <Text style={styles.text}>
          Days off work: {formData.daysOffWork || "None reported"}
        </Text>
        <Text style={styles.text}>
          Days on light duties: {formData.daysLightDuties || "None reported"}
        </Text>

        {formData.sleepDisturbance === "1" ? (
          <Text style={styles.text}>
            Sleep Disturbance: {formData.sleepDisturbanceDetails || "Yes, details not provided"}
          </Text>
        ) : (
          <Text style={styles.text}>No sleep disturbance reported.</Text>
        )}

        {formData.effectOnDomesticLiving === "1" ? (
          <Text style={styles.text}>
            Effect on Domestic Living: {formData.domesticLivingDetails || "Yes, details not provided"}
          </Text>
        ) : (
          <Text style={styles.text}>No effect on domestic living reported.</Text>
        )}
      </View>
    </Page>
  </Document>
);

export function IntakeFormSummary({ form }: { form: any }) {
  const { toast } = useToast();
  const formData = form.getValues();

  const sendEmail = async (pdfUrl: string) => {
    try {
      // Initialize EmailJS with your public key
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

      const templateParams = {
        to_email: formData.email || "Not provided",
        cc_email: "drawais@gmail.com",
        message: "Please find attached your medical report.",
        pdf_url: pdfUrl,
      };

      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams
      );

      toast({
        title: "Report Sent",
        description: "The medical report has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Summary Report</h2>
      
      <div className="prose max-w-none">
        {/* Preview of the report content */}
        <h3>Personal Information</h3>
        <p>Name: {formData.fullName}</p>
        <p>Date of Birth: {formatDate(formData.dateOfBirth)}</p>
        <p>Email: {formData.email}</p>

        {/* ... Additional preview sections ... */}
      </div>

      <div className="flex gap-4 mt-6">
        <BlobProvider document={<MedicalReport formData={formData} />}>
          {({ url, loading }) => (
            <>
              <Button 
                disabled={loading}
                onClick={() => {
                  if (url) {
                    window.open(url, '_blank');
                  }
                }}
              >
                {loading ? "Generating PDF..." : "Download Report"}
              </Button>

              <Button 
                disabled={loading}
                onClick={() => {
                  if (url) {
                    sendEmail(url);
                  }
                }}
              >
                {loading ? "Generating..." : "Email Report"}
              </Button>
            </>
          )}
        </BlobProvider>
      </div>
    </div>
  );
}