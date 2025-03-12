
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ReportData } from '@/utils/pdfReportUtils';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#222222',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 8,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 12,
  },
  subheader: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    fontSize: 11,
    borderBottom: '1 solid #CCCCCC',
    paddingBottom: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: 170,
  },
  value: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    borderTop: '1 solid #CCCCCC',
    paddingTop: 5,
  },
});

const ReportDocument = ({ data }: { data: ReportData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Medical Assessment Report</Text>
      
      {/* Prefilled section */}
      <View style={styles.section}>
        <Text style={styles.header}>Case Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Solicitor:</Text>
          <Text style={styles.value}>{data.prefilled.solicitorName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Solicitor Reference:</Text>
          <Text style={styles.value}>{data.prefilled.solicitorReference}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Instructing Party:</Text>
          <Text style={styles.value}>{data.prefilled.instructingPartyName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Instructing Reference:</Text>
          <Text style={styles.value}>{data.prefilled.instructingPartyReference}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>MedCo Reference:</Text>
          <Text style={styles.value}>{data.prefilled.medcoReference}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Examination Date:</Text>
          <Text style={styles.value}>{data.prefilled.dateOfExamination}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Report Date:</Text>
          <Text style={styles.value}>{data.prefilled.dateOfReport}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time Spent with Claimant:</Text>
          <Text style={styles.value}>{data.prefilled.timeSpentWithClaimant} minutes</Text>
        </View>
      </View>
      
      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.header}>Personal Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{data.personal.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{data.personal.dateOfBirth}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{data.personal.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{data.personal.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Occupation:</Text>
          <Text style={styles.value}>{data.personal.occupation}</Text>
        </View>
      </View>

      {/* Accident Information */}
      <View style={styles.section}>
        <Text style={styles.header}>Accident Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Accident Date:</Text>
          <Text style={styles.value}>{data.accident.accidentDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time of Day:</Text>
          <Text style={styles.value}>{data.accident.accidentTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vehicle Position:</Text>
          <Text style={styles.value}>{data.accident.vehiclePosition}</Text>
        </View>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} fixed />
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Injuries Information */}
      <View style={styles.section}>
        <Text style={styles.header}>Injury Assessment</Text>
        
        {/* Neck Pain */}
        <Text style={styles.subheader}>Neck Pain</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reported Neck Pain:</Text>
          <Text style={styles.value}>{data.injuries.neckPain.hasInjury ? "Yes" : "No"}</Text>
        </View>
        
        {data.injuries.neckPain.hasInjury && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Onset:</Text>
              <Text style={styles.value}>{data.injuries.neckPain.painStart}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Severity:</Text>
              <Text style={styles.value}>{data.injuries.neckPain.initialSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Current Severity:</Text>
              <Text style={styles.value}>{data.injuries.neckPain.currentSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Expected Resolution:</Text>
              <Text style={styles.value}>{data.injuries.neckPain.resolveDays} days</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Prior History:</Text>
              <Text style={styles.value}>{data.injuries.neckPain.hadPrior ? "Yes" : "No"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Additional Information:</Text>
              <Text style={styles.value}>{data.injuries.neckPain.additionalInfo}</Text>
            </View>
          </>
        )}
        
        {/* Shoulder Pain */}
        <Text style={styles.subheader}>Shoulder Pain</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reported Shoulder Pain:</Text>
          <Text style={styles.value}>{data.injuries.shoulderPain.hasInjury ? "Yes" : "No"}</Text>
        </View>
        
        {data.injuries.shoulderPain.hasInjury && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Affected Side:</Text>
              <Text style={styles.value}>{data.injuries.shoulderPain.side}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Onset:</Text>
              <Text style={styles.value}>{data.injuries.shoulderPain.painStart}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Severity:</Text>
              <Text style={styles.value}>{data.injuries.shoulderPain.initialSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Current Severity:</Text>
              <Text style={styles.value}>{data.injuries.shoulderPain.currentSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Expected Resolution:</Text>
              <Text style={styles.value}>{data.injuries.shoulderPain.resolveDays} days</Text>
            </View>
          </>
        )}
        
        {/* Back Pain */}
        <Text style={styles.subheader}>Back Pain</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reported Back Pain:</Text>
          <Text style={styles.value}>{data.injuries.backPain.hasInjury ? "Yes" : "No"}</Text>
        </View>
        
        {data.injuries.backPain.hasInjury && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>{data.injuries.backPain.location}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Onset:</Text>
              <Text style={styles.value}>{data.injuries.backPain.painStart}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Severity:</Text>
              <Text style={styles.value}>{data.injuries.backPain.initialSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Current Severity:</Text>
              <Text style={styles.value}>{data.injuries.backPain.currentSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Expected Resolution:</Text>
              <Text style={styles.value}>{data.injuries.backPain.resolveDays} days</Text>
            </View>
          </>
        )}
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} fixed />
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Headache and Travel Anxiety */}
      <View style={styles.section}>
        <Text style={styles.header}>Psychological Assessment</Text>
        
        {/* Headache */}
        <Text style={styles.subheader}>Headache</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reported Headaches:</Text>
          <Text style={styles.value}>{data.injuries.headache.hasInjury ? "Yes" : "No"}</Text>
        </View>
        
        {data.injuries.headache.hasInjury && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Onset:</Text>
              <Text style={styles.value}>{data.injuries.headache.start}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Severity:</Text>
              <Text style={styles.value}>{data.injuries.headache.initialSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Current Severity:</Text>
              <Text style={styles.value}>{data.injuries.headache.currentSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Expected Resolution:</Text>
              <Text style={styles.value}>{data.injuries.headache.resolveDays} days</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Previous History:</Text>
              <Text style={styles.value}>{data.injuries.headache.pastHistory}</Text>
            </View>
          </>
        )}
        
        {/* Travel Anxiety */}
        <Text style={styles.subheader}>Travel Anxiety</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reported Travel Anxiety:</Text>
          <Text style={styles.value}>{data.travelAnxiety.hasAnxiety ? "Yes" : "No"}</Text>
        </View>
        
        {data.travelAnxiety.hasAnxiety && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Symptoms:</Text>
              <Text style={styles.value}>{data.travelAnxiety.symptoms.join(", ") || "None specified"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Currently Driving:</Text>
              <Text style={styles.value}>{data.travelAnxiety.currentlyDriving}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Severity:</Text>
              <Text style={styles.value}>{data.travelAnxiety.initialSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Current Severity:</Text>
              <Text style={styles.value}>{data.travelAnxiety.currentSeverity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Expected Resolution:</Text>
              <Text style={styles.value}>{data.travelAnxiety.resolveDays} days</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Duration:</Text>
              <Text style={styles.value}>{data.travelAnxiety.duration}</Text>
            </View>
          </>
        )}
      </View>
      
      {/* Medical History Information */}
      <View style={styles.section}>
        <Text style={styles.header}>Medical History</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Exceptional Injuries:</Text>
          <Text style={styles.value}>{data.other.medicalHistory.exceptionalInjuries ? "Yes" : "No"}</Text>
        </View>
        {data.other.medicalHistory.exceptionalInjuries && (
          <View style={styles.row}>
            <Text style={styles.label}>Details:</Text>
            <Text style={styles.value}>{data.other.medicalHistory.exceptionalInjuriesDetails}</Text>
          </View>
        )}
      </View>
      
      {/* Declaration */}
      <View style={styles.section}>
        <Text style={styles.header}>Declaration</Text>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text>
            I confirm that the information contained in this report is true to the best of my knowledge and belief.
            I understand that if I have knowingly provided false information, I may be liable for prosecution.
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text>Signature: ___________________________</Text>
          <Text style={{ marginTop: 10 }}>Date: {data.prefilled.dateOfReport}</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        This report was generated based on the information provided in the Personal Injury Assessment Questionnaire.
      </Text>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);

export default ReportDocument;
