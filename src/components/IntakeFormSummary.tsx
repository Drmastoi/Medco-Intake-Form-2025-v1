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

// Sample data for demonstration
const sampleData = {
  fullName: "John Smith",
  dateOfBirth: "1985-06-15",
  idType: "1",
  email: "john.smith@example.com",
  address: "123 Main Street, London, UK",
  occupation: "Software Engineer",
  workType: "1",
  livingWith: "2",
  childrenCount: "2",
  accidentDate: "2024-02-01",
  accidentTime: "2",
  vehiclePosition: "1",
  neckPain: "1",
  neckPainStart: "1",
  neckPainInitialSeverity: "2",
  neckPainCurrentSeverity: "1",
  neckPainResolveDays: "",
  shoulderPain: "2",
  backPain: "1",
  backLocation: "3",
  backPainStart: "2",
  backPainInitialSeverity: "3",
  backPainCurrentSeverity: "2",
  backPainResolveDays: "",
  headache: "1",
  headacheStart: "1",
  headacheInitialSeverity: "2",
  headacheCurrentSeverity: "4",
  headacheResolveDays: "14",
  headachePastHistory: "Occasional migraines before accident",
  daysOffWork: "5",
  daysLightDuties: "10",
  workDifficulties: "Difficulty sitting for long periods, pain when typing",
  sleepDisturbance: "1",
  sleepDisturbanceDetails: "Waking up due to neck pain, difficulty finding comfortable position",
  effectOnDomesticLiving: "1",
  domesticLivingDetails: "Unable to do heavy housework, difficulty with gardening",
  effectOnSportLeisure: "1",
  sportLeisureDetails: "Cannot play tennis, limited gym activities",
  effectOnSocialLife: "1",
  socialLifeDetails: "Reduced social activities due to pain and discomfort",
  previousAccident: "2",
  previousAccidentDate: "",
  previousAccidentRecovery: "2",
  previousInjuriesWorse: "2",
  previousConditionWorse: "None",
  additionalInformation: "1",
  additionalInformationDetails: "Experiencing anxiety while driving since the accident"
};

const MedicalReport = ({ formData = sampleData }: { formData?: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Medical Report - Road Traffic Accident</Text>
        
        {/* Personal Information */}
        <Text style={styles.subtitle}>Personal Information</Text>
        <Text style={styles.text}>Full Name: {formData.fullName}</Text>
        <Text style={styles.text}>Date of Birth: {formatDate(formData.dateOfBirth)}</Text>
        <Text style={styles.text}>ID Type: {
          formData.idType === "1" ? "Driving License" :
          formData.idType === "2" ? "Passport" :
          formData.idType === "3" ? "ID Card" : "Claimant has not specified ID type"
        }</Text>
        <Text style={styles.text}>Email: {formData.email || 'Claimant has not provided email'}</Text>
        <Text style={styles.text}>Address: {formData.address || 'Claimant has not provided address'}</Text>
        <Text style={styles.text}>Occupation: {formData.occupation || 'Claimant has not provided occupation'}</Text>
        <Text style={styles.text}>Work Type: {
          formData.workType === "1" ? "Full Time" :
          formData.workType === "2" ? "Part Time" : "Claimant has not specified work type"
        }</Text>
        <Text style={styles.text}>Living With: {
          formData.livingWith === "1" ? "Wife" :
          formData.livingWith === "2" ? "Husband" :
          formData.livingWith === "3" ? "Partner" :
          formData.livingWith === "4" ? "Parents" :
          formData.livingWith === "5" ? "Alone" : "Claimant has not specified living arrangement"
        }</Text>
        <Text style={styles.text}>Number of Children at Home: {formData.childrenCount || 'Claimant has not specified number of children'}</Text>

        {/* Accident Information */}
        <Text style={styles.subtitle}>Accident Information</Text>
        <Text style={styles.text}>Date of Accident: {formatDate(formData.accidentDate)}</Text>
        <Text style={styles.text}>Time of Day: {
          formData.accidentTime === "1" ? "Morning" :
          formData.accidentTime === "2" ? "Afternoon" :
          formData.accidentTime === "3" ? "Evening" :
          formData.accidentTime === "4" ? "Night" : "Claimant has not specified time of accident"
        }</Text>
        <Text style={styles.text}>Position in Vehicle: {
          formData.vehiclePosition === "1" ? "Driver" :
          formData.vehiclePosition === "2" ? "Front Passenger" :
          formData.vehiclePosition === "3" ? "Back Passenger" : "Claimant has not specified position in vehicle"
        }</Text>

        {/* Neck Pain */}
        <Text style={styles.subtitle}>Neck Pain</Text>
        {formData.neckPain === "1" ? (
          <>
            <Text style={styles.text}>Onset: {
              formData.neckPainStart === "1" ? "Same day" :
              formData.neckPainStart === "2" ? "Next day" :
              formData.neckPainStart === "3" ? "Few days later" : "Claimant has not specified onset"
            }</Text>
            <Text style={styles.text}>Initial Severity: {
              formData.neckPainInitialSeverity === "1" ? "Mild" :
              formData.neckPainInitialSeverity === "2" ? "Moderate" :
              formData.neckPainInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.neckPainCurrentSeverity === "1" ? "Mild" :
              formData.neckPainCurrentSeverity === "2" ? "Moderate" :
              formData.neckPainCurrentSeverity === "3" ? "Severe" :
              formData.neckPainCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
            }</Text>
            {formData.neckPainCurrentSeverity === "4" && formData.neckPainResolveDays && (
              <Text style={styles.text}>Days to Resolve: {formData.neckPainResolveDays}</Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to neck pain</Text>
        )}

        {/* Shoulder Pain */}
        <Text style={styles.subtitle}>Shoulder Pain</Text>
        {formData.shoulderPain === "1" ? (
          <>
            <Text style={styles.text}>Side Affected: {
              formData.shoulderSide === "1" ? "Left" :
              formData.shoulderSide === "2" ? "Right" :
              formData.shoulderSide === "3" ? "Both" : "Claimant has not specified affected side"
            }</Text>
            <Text style={styles.text}>Initial Severity: {
              formData.shoulderPainInitialSeverity === "1" ? "Mild" :
              formData.shoulderPainInitialSeverity === "2" ? "Moderate" :
              formData.shoulderPainInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.shoulderPainCurrentSeverity === "1" ? "Mild" :
              formData.shoulderPainCurrentSeverity === "2" ? "Moderate" :
              formData.shoulderPainCurrentSeverity === "3" ? "Severe" :
              formData.shoulderPainCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
            }</Text>
            {formData.shoulderPainCurrentSeverity === "4" && formData.shoulderPainResolveDays && (
              <Text style={styles.text}>Days to Resolve: {formData.shoulderPainResolveDays}</Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to shoulder pain</Text>
        )}

        {/* Back Pain */}
        <Text style={styles.subtitle}>Back Pain</Text>
        {formData.backPain === "1" ? (
          <>
            <Text style={styles.text}>Location: {
              formData.backLocation === "1" ? "Upper back" :
              formData.backLocation === "2" ? "Middle Back" :
              formData.backLocation === "3" ? "Lower Back" :
              formData.backLocation === "4" ? "All over back" : "Claimant has not specified location"
            }</Text>
            <Text style={styles.text}>Initial Severity: {
              formData.backPainInitialSeverity === "1" ? "Mild" :
              formData.backPainInitialSeverity === "2" ? "Moderate" :
              formData.backPainInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.backPainCurrentSeverity === "1" ? "Mild" :
              formData.backPainCurrentSeverity === "2" ? "Moderate" :
              formData.backPainCurrentSeverity === "3" ? "Severe" :
              formData.backPainCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
            }</Text>
            {formData.backPainCurrentSeverity === "4" && formData.backPainResolveDays && (
              <Text style={styles.text}>Days to Resolve: {formData.backPainResolveDays}</Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to back pain</Text>
        )}

        {/* Headache */}
        <Text style={styles.subtitle}>Headache</Text>
        {formData.headache === "1" ? (
          <>
            <Text style={styles.text}>Initial Severity: {
              formData.headacheInitialSeverity === "1" ? "Mild" :
              formData.headacheInitialSeverity === "2" ? "Moderate" :
              formData.headacheInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
            }</Text>
            <Text style={styles.text}>Current Severity: {
              formData.headacheCurrentSeverity === "1" ? "Mild" :
              formData.headacheCurrentSeverity === "2" ? "Moderate" :
              formData.headacheCurrentSeverity === "3" ? "Severe" :
              formData.headacheCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
            }</Text>
            {formData.headacheCurrentSeverity === "4" && formData.headacheResolveDays && (
              <Text style={styles.text}>Days to Resolve: {formData.headacheResolveDays}</Text>
            )}
            <Text style={styles.text}>Past Medical History: {formData.headachePastHistory || 'None reported'}</Text>
          </>
        ) : (
          <Text style={styles.text}>Claimant has not reported any symptoms related to headache</Text>
        )}

        {/* Impact on Daily Life */}
        <Text style={styles.subtitle}>Impact on Daily Life</Text>
        <Text style={styles.text}>Days off work: {formData.daysOffWork || "Claimant has not reported any days off work"}</Text>
        <Text style={styles.text}>Days on light duties: {formData.daysLightDuties || "Claimant has not reported any light duties"}</Text>
        <Text style={styles.text}>Work Difficulties: {formData.workDifficulties || "Claimant has not reported any work difficulties"}</Text>

        {formData.sleepDisturbance === "1" ? (
          <Text style={styles.text}>Sleep Disturbance: {formData.sleepDisturbanceDetails || "Yes, but no details provided"}</Text>
        ) : (
          <Text style={styles.text}>Claimant has not reported any sleep disturbance</Text>
        )}

        {formData.effectOnDomesticLiving === "1" ? (
          <Text style={styles.text}>Effect on Domestic Living: {formData.domesticLivingDetails || "Yes, but no details provided"}</Text>
        ) : (
          <Text style={styles.text}>Claimant has not reported any effect on domestic living</Text>
        )}

        {formData.effectOnSportLeisure === "1" ? (
          <Text style={styles.text}>Effect on Sport & Leisure: {formData.sportLeisureDetails || "Yes, but no details provided"}</Text>
        ) : (
          <Text style={styles.text}>Claimant has not reported any effect on sport and leisure activities</Text>
        )}

        {formData.effectOnSocialLife === "1" ? (
          <Text style={styles.text}>Effect on Social Life: {formData.socialLifeDetails || "Yes, but no details provided"}</Text>
        ) : (
          <Text style={styles.text}>Claimant has not reported any effect on social life</Text>
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
          <Text style={styles.text}>Claimant has not reported any previous road traffic accidents</Text>
        )}

        <Text style={styles.text}>Previous Medical Conditions Made Worse: {formData.previousConditionWorse || "Claimant has not reported any previous conditions made worse"}</Text>

        {formData.additionalInformation === "1" ? (
          <Text style={styles.text}>Additional Information: {formData.additionalInformationDetails || "Yes, but no details provided"}</Text>
        ) : (
          <Text style={styles.text}>Claimant has not provided any additional information</Text>
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
      emailjs.init("YOUR_PUBLIC_KEY");

      const templateParams = {
        to_email: formData.email || "Not provided",
        cc_email: "drawais@gmail.com",
        message: "Please find attached your medical report.",
        pdf_url: pdfUrl,
      };

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
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
        <p className="text-sm text-muted-foreground mb-4">
          This is a sample report showing how your submitted data will appear. The actual report will contain your submitted information.
        </p>
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