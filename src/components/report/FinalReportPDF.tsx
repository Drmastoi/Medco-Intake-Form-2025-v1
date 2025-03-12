
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from './pdf/reportPdfStyles';
import { PageFooter } from './pdf/PageFooter';
import { formatDate } from '@/utils/dateUtils';

export const FinalReportPDF = ({ 
  formData, 
  signature,
  signatureDate 
}: { 
  formData: any;
  signature?: string;
  signatureDate?: string;
}) => {
  const renderField = (label: string, value: string | undefined) => (
    <View style={pdfStyles.fieldContainer}>
      <View style={pdfStyles.fieldRow}>
        <Text style={pdfStyles.fieldLabel}>{label}</Text>
        <Text style={pdfStyles.fieldValue}>{value || 'Not provided'}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.sectionHeader}>1. Expert Details</Text>
        {renderField('Name', 'Dr. Awais Iqbal')}
        {renderField('GMC Number', '6138189')}
        {renderField('Medco Number', 'DME 8094')}
        
        <Text style={pdfStyles.sectionHeader}>2. Claimant Details</Text>
        {renderField('Full Name', formData.fullName)}
        {renderField('Date of Birth', formData.dateOfBirth ? formatDate(formData.dateOfBirth) : undefined)}
        {renderField('Address', formData.address)}
        {renderField('Gender', formData.gender)}
        
        <Text style={pdfStyles.sectionHeader}>3. Accident Details</Text>
        {renderField('Date of Accident', formData.accidentDate ? formatDate(formData.accidentDate) : undefined)}
        {renderField('Vehicle Type', formData.claimantVehicle === "1" ? "Car" : 
                                  formData.claimantVehicle === "2" ? "Van" :
                                  formData.claimantVehicle === "3" ? "Bus" : "Other")}
        {renderField('Impact Location', formData.impactLocation === "1" ? "Rear" :
                                     formData.impactLocation === "2" ? "Front" :
                                     formData.impactLocation === "3" ? "Passenger Side" : "Driver Side")}
        
        <PageFooter name={formData.fullName} formData={formData} />
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.sectionHeader}>4. Injuries Assessment</Text>
        
        {formData.neckPain === "1" && (
          <>
            <Text style={pdfStyles.subsectionHeader}>Neck Injury</Text>
            {renderField('Initial Severity', formData.neckPainInitialSeverity)}
            {renderField('Current Severity', formData.neckPainCurrentSeverity)}
            {renderField('Expected Recovery', `${formData.neckPainResolveDays} days`)}
          </>
        )}

        {formData.shoulderPain === "1" && (
          <>
            <Text style={pdfStyles.subsectionHeader}>Shoulder Injury</Text>
            {renderField('Side Affected', formData.shoulderSide === "1" ? "Left" :
                                       formData.shoulderSide === "2" ? "Right" : "Both")}
            {renderField('Current Severity', formData.shoulderPainCurrentSeverity)}
            {renderField('Expected Recovery', `${formData.shoulderPainResolveDays} days`)}
          </>
        )}

        <PageFooter name={formData.fullName} formData={formData} />
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.sectionHeader}>5. Treatment & Recovery</Text>
        {renderField('GP Visits', formData.visitedGP ? 'Yes' : 'No')}
        {renderField('Hospital Visits', formData.hospitalVisits ? 'Yes' : 'No')}
        {renderField('Physiotherapy', formData.hadPhysiotherapy ? 'Yes' : 'No')}
        
        <Text style={pdfStyles.sectionHeader}>6. Impact on Daily Life</Text>
        {renderField('Work Impact', formData.workImpact)}
        {renderField('Domestic Duties', formData.domesticDuties)}
        {renderField('Social Activities', formData.socialActivities)}
        {renderField('Sleep Pattern', formData.sleepPattern)}
        
        <Text style={pdfStyles.sectionHeader}>7. Expert Opinion</Text>
        <View style={pdfStyles.fieldContainer}>
          <Text style={[pdfStyles.fieldValue, { marginBottom: 10 }]}>
            Based on the examination findings and the information provided by the claimant, 
            I confirm that the injuries described are consistent with the accident mechanism. 
            The prognosis for recovery is favorable, subject to appropriate treatment and 
            rehabilitation as recommended.
          </Text>
        </View>

        <PageFooter name={formData.fullName} formData={formData} />
      </Page>
    </Document>
  );
};
