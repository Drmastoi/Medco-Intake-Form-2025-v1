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
  if (!dateString) return 'Not provided';
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
        <Text style={styles.text}>Full Name: {formData.fullName || 'Not provided'}</Text>
        <Text style={styles.text}>Date of Birth: {formatDate(formData.dateOfBirth)}</Text>
        <Text style={styles.text}>ID Type: {
          formData.idType === "1" ? "Driving License" :
          formData.idType === "2" ? "Passport" :
          formData.idType === "3" ? "ID Card" : "Not specified"
        }</Text>
        <Text style={styles.text}>Email: {formData.email || 'Not provided'}</Text>
        <Text style={styles.text}>Address: {formData.address || 'Not provided'}</Text>
        <Text style={styles.text}>Occupation: {formData.occupation || 'Not provided'}</Text>
        <Text style={styles.text}>Work Type: {
          formData.workType === "1" ? "Full Time" :
          formData.workType === "2" ? "Part Time" : "Not specified"
        }</Text>
        <Text style={styles.text}>Living With: {
          formData.livingWith === "1" ? "Wife" :
          formData.livingWith === "2" ? "Husband" :
          formData.livingWith === "3" ? "Partner" :
          formData.livingWith === "4" ? "Parents" :
          formData.livingWith === "5" ? "Alone" : "Not specified"
        }</Text>
        <Text style={styles.text}>Number of Children at Home: {formData.childrenCount || '0'}</Text>

        {/* Accident Information */}
        <Text style={styles.subtitle}>Accident Information</Text>
        <Text style={styles.text}>Date of Accident: {formatDate(formData.accidentDate)}</Text>
        <Text style={styles.text}>Time of Day: {
          formData.accidentTime === "1" ? "Morning" :
          formData.accidentTime === "2" ? "Afternoon" :
          formData.accidentTime === "3" ? "Evening" :
          formData.accidentTime === "4" ? "Night" : "Not specified"
        }</Text>
        <Text style={styles.text}>Position in Vehicle: {
          formData.vehiclePosition === "1" ? "Driver" :
          formData.vehiclePosition === "2" ? "Front Passenger" :
          formData.vehiclePosition === "3" ? "Back Passenger" : "Not specified"
        }</Text>

        {/* Neck Pain */}
        <Text style={styles.subtitle}>Neck Pain</Text>
        {formData.neckPain === "1" ? (
          <>
            <Text style={styles.text}>Onset: {
              formData.neckPainStart === "1" ? "Same day" :
              formData.neckPainStart === "2" ? "Next day" :
              formData.neckPainStart === "3" ? "Few days later" : "Not specified"
            }</Text>
            <Text style={styles.text}>Initial Severity: {
              formData.neckPainInitialSeverity === "1" ? "Mild" :
              formData.neckPainInitialSeverity === "2" ? "Moderate" :
              formData.neckPainInitialSeverity === "3" ? "Severe" : "Not specified"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.neckPainCurrentSeverity === "1" ? "Mild" :
              formData.neckPainCurrentSeverity === "2" ? "Moderate" :
              formData.neckPainCurrentSeverity === "3" ? "Severe" :
              formData.neckPainCurrentSeverity === "4" ? "Resolved" : "Not specified"
            }</Text>
            {formData.neckPainCurrentSeverity === "4" && (
              <Text style={styles.text}>Days to Resolve: {formData.neckPainResolveDays || 'Not specified'}</Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to neck pain.</Text>
        )}

        {/* Shoulder Pain */}
        <Text style={styles.subtitle}>Shoulder Pain</Text>
        {formData.shoulderPain === "1" ? (
          <>
            <Text style={styles.text}>Side Affected: {
              formData.shoulderSide === "1" ? "Left" :
              formData.shoulderSide === "2" ? "Right" :
              formData.shoulderSide === "3" ? "Both" : "Not specified"
            }</Text>
            <Text style={styles.text}>Onset: {
              formData.shoulderPainStart === "1" ? "Same day" :
              formData.shoulderPainStart === "2" ? "Next day" :
              formData.shoulderPainStart === "3" ? "Few days later" : "Not specified"
            }</Text>
            <Text style={styles.text}>Initial Severity: {
              formData.shoulderPainInitialSeverity === "1" ? "Mild" :
              formData.shoulderPainInitialSeverity === "2" ? "Moderate" :
              formData.shoulderPainInitialSeverity === "3" ? "Severe" : "Not specified"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.shoulderPainCurrentSeverity === "1" ? "Mild" :
              formData.shoulderPainCurrentSeverity === "2" ? "Moderate" :
              formData.shoulderPainCurrentSeverity === "3" ? "Severe" :
              formData.shoulderPainCurrentSeverity === "4" ? "Resolved" : "Not specified"
            }</Text>
            {formData.shoulderPainCurrentSeverity === "4" && (
              <Text style={styles.text}>Days to Resolve: {formData.shoulderPainResolveDays || 'Not specified'}</Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to shoulder pain.</Text>
        )}

        {/* Back Pain */}
        <Text style={styles.subtitle}>Back Pain</Text>
        {formData.backPain === "1" ? (
          <>
            <Text style={styles.text}>Location: {
              formData.backLocation === "1" ? "Upper back" :
              formData.backLocation === "2" ? "Middle Back" :
              formData.backLocation === "3" ? "Lower Back" :
              formData.backLocation === "4" ? "All over back" : "Not specified"
            }</Text>
            <Text style={styles.text}>Onset: {
              formData.backPainStart === "1" ? "Same day" :
              formData.backPainStart === "2" ? "Next day" :
              formData.backPainStart === "3" ? "Few days later" : "Not specified"
            }</Text>
            <Text style={styles.text}>Initial Severity: {
              formData.backPainInitialSeverity === "1" ? "Mild" :
              formData.backPainInitialSeverity === "2" ? "Moderate" :
              formData.backPainInitialSeverity === "3" ? "Severe" : "Not specified"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.backPainCurrentSeverity === "1" ? "Mild" :
              formData.backPainCurrentSeverity === "2" ? "Moderate" :
              formData.backPainCurrentSeverity === "3" ? "Severe" :
              formData.backPainCurrentSeverity === "4" ? "Resolved" : "Not specified"
            }</Text>
            {formData.backPainCurrentSeverity === "4" && (
              <Text style={styles.text}>Days to Resolve: {formData.backPainResolveDays || 'Not specified'}</Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to back pain.</Text>
        )}

        {/* Headache */}
        <Text style={styles.subtitle}>Headache</Text>
        {formData.headache === "1" ? (
          <>
            <Text style={styles.text}>Onset: {
              formData.headacheStart === "1" ? "Same day" :
              formData.headacheStart === "2" ? "Next day" :
              formData.headacheStart === "3" ? "Few days later" : "Not specified"
            }</Text>
            <Text style={styles.text}>Initial Severity: {
              formData.headacheInitialSeverity === "1" ? "Mild" :
              formData.headacheInitialSeverity === "2" ? "Moderate" :
              formData.headacheInitialSeverity === "3" ? "Severe" : "Not specified"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.headacheCurrentSeverity === "1" ? "Mild" :
              formData.headacheCurrentSeverity === "2" ? "Moderate" :
              formData.headacheCurrentSeverity === "3" ? "Severe" :
              formData.headacheCurrentSeverity === "4" ? "Resolved" : "Not specified"
            }</Text>
            {formData.headacheCurrentSeverity === "4" && (
              <Text style={styles.text}>Days to Resolve: {formData.headacheResolveDays || 'Not specified'}</Text>
            )}
            <Text style={styles.text}>Past Medical History: {formData.headachePastHistory || 'None reported'}</Text>
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to headache.</Text>
        )}

        {/* Impact on Daily Life */}
        <Text style={styles.subtitle}>Impact on Daily Life</Text>
        <Text style={styles.text}>Days off work: {formData.daysOffWork || "None reported"}</Text>
        <Text style={styles.text}>Days on light duties: {formData.daysLightDuties || "None reported"}</Text>
        <Text style={styles.text}>Work Difficulties: {formData.workDifficulties || "None reported"}</Text>

        {formData.sleepDisturbance === "1" ? (
          <Text style={styles.text}>Sleep Disturbance: {formData.sleepDisturbanceDetails || "Yes, details not provided"}</Text>
        ) : (
          <Text style={styles.text}>No sleep disturbance reported.</Text>
        )}

        {formData.effectOnDomesticLiving === "1" ? (
          <Text style={styles.text}>Effect on Domestic Living: {formData.domesticLivingDetails || "Yes, details not provided"}</Text>
        ) : (
          <Text style={styles.text}>No effect on domestic living reported.</Text>
        )}

        {formData.effectOnSportLeisure === "1" ? (
          <Text style={styles.text}>Effect on Sport & Leisure: {formData.sportLeisureDetails || "Yes, details not provided"}</Text>
        ) : (
          <Text style={styles.text}>No effect on sport and leisure activities reported.</Text>
        )}

        {formData.effectOnSocialLife === "1" ? (
          <Text style={styles.text}>Effect on Social Life: {formData.socialLifeDetails || "Yes, details not provided"}</Text>
        ) : (
          <Text style={styles.text}>No effect on social life reported.</Text>
        )}

        {/* Previous Medical History */}
        <Text style={styles.subtitle}>Previous Medical History</Text>
        {formData.previousAccident === "1" ? (
          <>
            <Text style={styles.text}>Previous Road Traffic Accident: Yes</Text>
            <Text style={styles.text}>Date of Previous Accident: {formatDate(formData.previousAccidentDate)}</Text>
            <Text style={styles.text}>Complete Recovery: {formData.previousAccidentRecovery === "1" ? "Yes" : "No"}</Text>
            <Text style={styles.text}>Current Accident Made Previous Injuries Worse: {formData.previousInjuriesWorse === "1" ? "Yes" : "No"}</Text>
          </>
        ) : (
          <Text style={styles.text}>No previous road traffic accidents reported.</Text>
        )}

        <Text style={styles.text}>Previous Medical Conditions Made Worse: {formData.previousConditionWorse || "None reported"}</Text>

        {formData.additionalInformation === "1" ? (
          <Text style={styles.text}>Additional Information: {formData.additionalInformationDetails || "Yes, but no details provided"}</Text>
        ) : (
          <Text style={styles.text}>No additional information provided.</Text>
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