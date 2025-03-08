
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles as importedStyles } from './reportStyles';
import { PersonalInfoSection } from './PersonalInfoSection';
import { AccidentInfoSection } from './AccidentInfoSection';
import { InjuriesSection } from './InjuriesSection';
import { TreatmentDetailsSection } from './TreatmentDetailsSection';
import { DailyLifeImpactSection } from './DailyLifeImpactSection';
import { PreviousMedicalHistorySection } from './PreviousMedicalHistorySection';
import { ClinicalExaminationSection } from './ClinicalExaminationSection';
import { SummaryOfInjuriesSection } from './SummaryOfInjuriesSection';
import { CaseClassificationSection } from './CaseClassificationSection';
import { AdditionalInformationSection } from './AdditionalInformationSection';
import { DeclarationSection } from './DeclarationSection';
import { formatDate } from '../../utils/dateUtils';

// Create local styles extending the imported styles
const localStyles = StyleSheet.create({
  ...importedStyles,
  // Add additional styles needed for this component
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  signatureSection: {
    marginTop: 20,
    borderTop: 1,
    paddingTop: 10,
  },
  signatureText: {
    fontSize: 10,
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    fontSize: 6,
    color: '#666666',
    fontFamily: 'Helvetica',
  },
  sectionHeader: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 8,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  fieldColumn: {
    flex: 1,
    marginRight: 10,
  },
  fieldLabel: {
    fontSize: 10,
    marginBottom: 3,
    fontFamily: 'Helvetica',
  },
  fieldValue: {
    fontSize: 10,
    padding: 5,
    border: '1px solid #CCCCCC',
    minHeight: 20,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  subsection: {
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid #000000',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid #CCCCCC',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  tableContainer: {
    border: '1px solid #000000',
    marginBottom: 15,
  },
  grayBackground: {
    backgroundColor: '#EEEEEE',
    padding: 8,
  },
});

export const MedcoReport = ({ 
  formData,
  signature,
  signatureDate
}: { 
  formData: any;
  signature?: string;
  signatureDate?: string;
}) => {
  // Calculate claimant's age based on DOB
  const getAge = (dateString: string) => {
    if (!dateString) return 'Not provided';
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age + ' Years';
  };

  // Format identification type
  const getIdType = (idType: string) => {
    switch (idType) {
      case "1": return "Driving License";
      case "2": return "Passport";
      case "3": return "ID Card";
      default: return "Not specified";
    }
  };

  return (
    <Document>
      <Page size="A4" style={localStyles.page}>
        <Text style={localStyles.title}>Expert Medical Report</Text>
        
        {/* Section 1: Claimant Details */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 1 - Claimant Details</Text>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.1 Claimant's Name</Text>
              <Text style={localStyles.fieldValue}>{formData.fullName || 'Not provided'}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.2 Date of Birth</Text>
              <Text style={localStyles.fieldValue}>{formData.dateOfBirth ? formatDate(formData.dateOfBirth) : 'Not provided'}</Text>
            </View>
          </View>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.3 Address</Text>
              <Text style={localStyles.fieldValue}>{formData.address || 'Not provided'}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.4 Gender</Text>
              <Text style={localStyles.fieldValue}>{formData.gender || 'Not provided'}</Text>
            </View>
          </View>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.5 Age (At the time of the Incident)</Text>
              <Text style={localStyles.fieldValue}>{getAge(formData.dateOfBirth)}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.6 Date of Accident</Text>
              <Text style={localStyles.fieldValue}>{formData.accidentDate ? formatDate(formData.accidentDate) : 'Not provided'}</Text>
            </View>
          </View>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.7 Identification</Text>
              <Text style={localStyles.fieldValue}>{getIdType(formData.idType)}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.8 Accompanied by</Text>
              <Text style={localStyles.fieldValue}>The claimant attended the appointment unaccompanied.</Text>
            </View>
          </View>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>1.9 Interpreter</Text>
              <Text style={localStyles.fieldValue}>Not Required</Text>
            </View>
          </View>
        </View>
        
        {/* Section 2: Expert Details */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 2 - Expert Details</Text>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>2.1 Medical Expert</Text>
              <Text style={localStyles.fieldValue}>Dr. Awais Iqbal, General Practice, Consultant</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>2.2 Regulatory</Text>
              <Text style={localStyles.fieldValue}>GMC - 6138189</Text>
            </View>
          </View>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>2.3 Medco Registration</Text>
              <Text style={localStyles.fieldValue}>DME 8094</Text>
            </View>
          </View>
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 3: Instruction Details */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 3 - Instruction Details</Text>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>3.1 Agency</Text>
              <Text style={localStyles.fieldValue}>{formData.agency || 'Not provided'}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>3.2 Solicitor</Text>
              <Text style={localStyles.fieldValue}>{formData.solicitor || 'Not provided'}</Text>
            </View>
          </View>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>3.3 Medco Reference</Text>
              <Text style={localStyles.fieldValue}>{formData.medcoReference || 'Not provided'}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>3.4 Review of Records</Text>
              <Text style={localStyles.fieldValue}>GP Records, A&E Records</Text>
            </View>
          </View>
        </View>
        
        {/* Section 4: Appointment Details */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 4 - Appointment Details</Text>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>4.1 Date of Appointment</Text>
              <Text style={localStyles.fieldValue}>{formData.examinationDate ? formatDate(formData.examinationDate) : new Date().toLocaleDateString()} {formData.examinationTime || '10:00'}{'\nMethod - Clinic'}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>4.2 Time spent</Text>
              <Text style={localStyles.fieldValue}>30 Minutes</Text>
            </View>
          </View>
          
          <View style={localStyles.fieldRow}>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>4.3 Place of Examination</Text>
              <Text style={localStyles.fieldValue}>{formData.examinationLocation || 'Medical Examination Center, London, UNITED KINGDOM'}</Text>
            </View>
            <View style={localStyles.fieldColumn}>
              <Text style={localStyles.fieldLabel}>4.4 Date of Report</Text>
              <Text style={localStyles.fieldValue}>{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        {/* Section 5: Statement of Instruction */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 5 - Statement of Instruction</Text>
          
          <Text style={localStyles.text}>
            This report is entirely independent and is prepared for the injuries sustained in the accident. The instructing party has requested an examination to be conducted with a report to include the nature and extent of the claimant's injuries, treatment received, effects on lifestyle and whether any further treatment is appropriate.
          </Text>
          
          <Text style={localStyles.text}>
            The report is produced for the Court based on the information provided by the client and the instructing party.
          </Text>
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 6: Summary of Injuries */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 6 - Summary of Injuries</Text>
          
          <View style={localStyles.tableContainer}>
            <View style={localStyles.tableHeader}>
              <Text style={[localStyles.tableHeaderCell, { flex: 2 }]}>Injuries</Text>
              <Text style={localStyles.tableHeaderCell}>Prognosis</Text>
            </View>
            
            {formData.neckPain === "1" && (
              <View style={localStyles.tableRow}>
                <Text style={[localStyles.tableCell, { flex: 2 }]}>Neck (Pain, Stiffness, Discomfort)</Text>
                <Text style={localStyles.tableCell}>
                  {formData.neckPainCurrentSeverity === "4" ? `${formData.neckPainResolveDays || "Unknown"} Days` : "3 Months"}
                </Text>
              </View>
            )}
            
            {formData.shoulderPain === "1" && (
              <View style={localStyles.tableRow}>
                <Text style={[localStyles.tableCell, { flex: 2 }]}>
                  Shoulder ({formData.shoulderSide === "1" ? "Left" : formData.shoulderSide === "2" ? "Right" : "Both"}) (Pain, Stiffness)
                </Text>
                <Text style={localStyles.tableCell}>
                  {formData.shoulderPainCurrentSeverity === "4" ? `${formData.shoulderPainResolveDays || "Unknown"} Days` : "3 Months"}
                </Text>
              </View>
            )}
            
            {formData.backPain === "1" && (
              <View style={localStyles.tableRow}>
                <Text style={[localStyles.tableCell, { flex: 2 }]}>
                  Back ({formData.backLocation === "1" ? "Upper" : formData.backLocation === "2" ? "Middle" : formData.backLocation === "3" ? "Lower" : "Full"}) (Pain, Stiffness, Discomfort)
                </Text>
                <Text style={localStyles.tableCell}>
                  {formData.backPainCurrentSeverity === "4" ? `${formData.backPainResolveDays || "Unknown"} Days` : "4 Months"}
                </Text>
              </View>
            )}
            
            {formData.travelAnxiety === "1" && (
              <View style={localStyles.tableRow}>
                <Text style={[localStyles.tableCell, { flex: 2 }]}>Anxiety</Text>
                <Text style={localStyles.tableCell}>{formData.anxietyDuration || "60"} Days</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* Section 7: Accident Details */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 7 - Accident/Incident Details</Text>
          
          <View style={localStyles.grayBackground}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>7.1 Road Traffic Accident (Vehicle)</Text>
          </View>
          
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Road Traffic Accident</Text>
          <View style={localStyles.grayBackground}>
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Time of Accident</Text>
                <Text style={localStyles.text}>
                  {formData.accidentTime === "1" ? "Morning" :
                   formData.accidentTime === "2" ? "Afternoon" :
                   formData.accidentTime === "3" ? "Evening" :
                   formData.accidentTime === "4" ? "Night" : "Not specified"}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Vehicle</Text>
                <Text style={localStyles.text}>
                  {formData.claimantVehicle === "1" ? "Car" :
                   formData.claimantVehicle === "2" ? "Van" :
                   formData.claimantVehicle === "3" ? "Bus" : "Other"}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Claimant's Position</Text>
                <Text style={localStyles.text}>
                  {formData.claimantPosition === "driver" ? "Driver" : 
                   formData.claimantPosition === "front-passenger" ? "Front passenger" : 
                   formData.claimantPosition === "rear-passenger" ? "Rear passenger" : "Not specified"}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Vehicle Location</Text>
                <Text style={localStyles.text}>
                  {formData.vehicleLocation === "1" ? "Main Road" :
                   formData.vehicleLocation === "2" ? "Minor Road" :
                   formData.vehicleLocation === "3" ? "Roundabout" : "Not specified"}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Third Party</Text>
                <Text style={localStyles.text}>The vehicle was travelling forward at normal speed.</Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Description</Text>
                <Text style={localStyles.text}>
                  {formData.otherVehicle === "1" ? "Car" :
                   formData.otherVehicle === "2" ? "Van" :
                   formData.otherVehicle === "3" ? "Bus" : "Other vehicle"}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Movement</Text>
                <Text style={localStyles.text}>
                  The vehicle was struck at moderate speed. The impact was from the 
                  {formData.impactLocation === "1" ? " rear" :
                   formData.impactLocation === "2" ? " front" :
                   formData.impactLocation === "3" ? " passenger side" :
                   formData.impactLocation === "4" ? " driver side" : " unspecified location"}.
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Damage</Text>
                <Text style={localStyles.text}>
                  The Claimant remembers being thrown forwards and backwards.
                  The Claimant's vehicle sustained a damage to the 
                  {formData.impactLocation === "1" ? " rear" :
                   formData.impactLocation === "2" ? " front" :
                   formData.impactLocation === "3" ? " passenger side" :
                   formData.impactLocation === "4" ? " driver side" : " unspecified location"}.
                  The Claimant's vehicle status - 
                  {formData.vehicleDamage === "1" ? "minor damage" :
                   formData.vehicleDamage === "2" ? "moderate damage" :
                   formData.vehicleDamage === "3" ? "written off" : "unspecified damage"}.
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Safety</Text>
                <Text style={localStyles.text}>
                  Seat Belt: The Claimant was wearing a seat belt.
                  Head Rest: The vehicle was fitted with a Head rest.
                  Air Bags: Unable to recollect
                </Text>
              </View>
            </View>
          </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
        </View>
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 8: Past Medical History */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 8 - Past Medical History</Text>
          
          <View style={localStyles.grayBackground}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>8.1 Medical and Psychological</Text>
          </View>
          
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Medical and Psychological</Text>
          <View style={localStyles.grayBackground}>
            {formData.previousConditionWorse ? (
              <>
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Date</Text>
                    <Text style={localStyles.text}>{formData.previousConditionDate ? formatDate(formData.previousConditionDate) : 'Not provided'}</Text>
                  </View>
                </View>
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Injuries / Problem</Text>
                    <Text style={localStyles.text}>{formData.previousConditionWorse}</Text>
                  </View>
                </View>
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Current Status</Text>
                    <Text style={localStyles.text}>{formData.previousConditionCurrent || 'Ongoing'}</Text>
                  </View>
                </View>
              </>
            ) : (
              <Text style={localStyles.text}>No relevant medical history reported</Text>
            )}
          </View>
          
          <View style={{ marginTop: 20 }}>
            <View style={localStyles.grayBackground}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>8.2 RTA</Text>
            </View>
            
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>RTA</Text>
            <View style={localStyles.grayBackground}>
              {formData.previousAccident === "1" ? (
                <>
                  <View style={localStyles.fieldRow}>
                    <View style={localStyles.fieldColumn}>
                      <Text style={localStyles.fieldLabel}>Date</Text>
                      <Text style={localStyles.text}>{formData.previousAccidentDate ? formatDate(formData.previousAccidentDate) : 'Not provided'}</Text>
                    </View>
                  </View>
                  <View style={localStyles.fieldRow}>
                    <View style={localStyles.fieldColumn}>
                      <Text style={localStyles.fieldLabel}>Injuries / Problem</Text>
                      <Text style={localStyles.text}>{formData.previousAccidentInjuries || 'Not specified'}</Text>
                    </View>
                  </View>
                  <View style={localStyles.fieldRow}>
                    <View style={localStyles.fieldColumn}>
                      <Text style={localStyles.fieldLabel}>Current Status</Text>
                      <Text style={localStyles.text}>{formData.previousAccidentRecovery === "1" ? 'Resolved' : 'Ongoing'}</Text>
                    </View>
                  </View>
                </>
              ) : (
                <Text style={localStyles.text}>No previous RTA reported</Text>
              )}
            </View>
          </View>
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
      </Page>

      <Page size="A4" style={localStyles.page}>
        {/* Section 9: Injuries / Symptoms */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 9 - Injuries / Symptoms</Text>
          
          {/* Neck */}
          {formData.neckPain === "1" && (
            <>
              <View style={localStyles.grayBackground}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>9.1 Physical</Text>
              </View>
              
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Neck</Text>
              <View style={localStyles.grayBackground}>
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Symptoms</Text>
                    <Text style={localStyles.text}>Pain, Stiffness and Discomfort.</Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Onset</Text>
                    <Text style={localStyles.text}>
                      The Claimant recalls the symptoms beginning 
                      {formData.neckPainStart === "1" ? " immediately after" :
                       formData.neckPainStart === "2" ? " the day after" :
                       formData.neckPainStart === "3" ? " a few days after" : " sometime after"} 
                      the accident/incident.
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Initial Severity</Text>
                    <Text style={localStyles.text}>
                      The symptoms were 
                      {formData.neckPainInitialSeverity === "1" ? " mild" :
                       formData.neckPainInitialSeverity === "2" ? " moderate" :
                       formData.neckPainInitialSeverity === "3" ? " severe" : ""}.
                      {formData.neckPainInitialSeverity === "3" ? " They were severe for a period of 2 days." : ""}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Current Status and Severity</Text>
                    <Text style={localStyles.text}>
                      {formData.neckPainCurrentSeverity === "1" ? "Ongoing with mild symptoms and intermittent." :
                       formData.neckPainCurrentSeverity === "2" ? "Ongoing with moderate symptoms and intermittent." :
                       formData.neckPainCurrentSeverity === "3" ? "Ongoing with severe symptoms and persistent." :
                       formData.neckPainCurrentSeverity === "4" ? `Resolved within ${formData.neckPainResolveDays || "unknown"} days (from the date of accident / incident)` : 
                       "Current status not specified."}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Similar symptoms</Text>
                    <Text style={localStyles.text}>
                      The Claimant reported no prior similar symptoms before the index accident, 
                      indicating that there were no pre-existing symptoms that could have been 
                      exacerbated by the accident.
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Opinion</Text>
                    <Text style={localStyles.text}>
                      In my opinion, the Claimant's symptoms are due to a Whiplash Injury. On the 
                      balance of probabilities, they are attributable to the index accident.
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Mechanism of Injury</Text>
                    <Text style={localStyles.text}>
                      The injury is caused by acceleration-deceleration mechanism of energy transfer to the neck.
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Additional Report</Text>
                    <Text style={localStyles.text}>No additional reports are required.</Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>OIC Tariff</Text>
                    <Text style={localStyles.text}>Yes</Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Exacerbation and Apportioning</Text>
                    <Text style={localStyles.text}>
                      In my opinion, On the balance of probabilities, the symptoms are not 
                      exacerbated by the index accident.
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
          
          {/* Only show more sections if we have room, otherwise continue on next page */}
          {formData.backPain === "1" && (
            <>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 15, marginBottom: 5 }}>9.2 Physical</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5, marginBottom: 5 }}>Back ({formData.backLocation === "1" ? "Upper" : formData.backLocation === "2" ? "Middle" : formData.backLocation === "3" ? "Lower" : "All over"})</Text>
            </>
          )}
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
      </Page>
      
      {/* Additional Pages as needed with specific injury sections */}
      
      <Page size="A4" style={localStyles.page}>
        {/* Section 14: Examination */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 14 - Examination</Text>
          
          <View style={localStyles.grayBackground}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>14.1 General Physical Examination</Text>
          </View>
          
          <Text style={localStyles.text}>
            In my observation, the Claimant was not tearful, not agitated, good eye contact, good rapport, 
            time and place orientation, and showed signs of no psychotic features, no delusional ideas, 
            and no thought disorder. Communication was normal. Claimant was not using any walking aids.
          </Text>
          <Text style={localStyles.text}>Dominant Hand - {formData.dominantHand || 'Right'}</Text>
          
          {formData.neckPain === "1" && (
            <>
              <View style={localStyles.grayBackground}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}>14.2 Physical Examination</Text>
              </View>
              
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Neck</Text>
              <View style={localStyles.grayBackground}>
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Examination</Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Observation</Text>
                    <Text style={localStyles.text}>Normal</Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Movements</Text>
                    <Text style={localStyles.text}>
                      Flexion, Extension | {formData.neckPainCurrentSeverity === "3" ? "Restricted (70%)" : "Normal"} | {formData.neckPainCurrentSeverity === "3" ? "Extremes Painful" : "No Pain"}
                      Left Lateral Flexion, Right Lateral Flexion | {formData.neckPainCurrentSeverity === "3" ? "Restricted (80%)" : "Normal"} | {formData.neckPainCurrentSeverity === "3" ? "Mild Pain" : "No Pain"}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Neurovascular Deficit</Text>
                    <Text style={localStyles.text}>No neurovascular deficits noted</Text>
                  </View>
                </View>
              </View>
            </>
          )}
          
          {formData.backPain === "1" && (
            <>
              <View style={localStyles.grayBackground}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}>14.3 Physical Examination</Text>
              </View>
              
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Back</Text>
              <View style={localStyles.grayBackground}>
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Examination</Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Observation</Text>
                    <Text style={localStyles.text}>Normal</Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Tenderness</Text>
                    <Text style={localStyles.text}>
                      {formData.backLocation === "1" ? "Para Thoracic" : 
                       formData.backLocation === "2" ? "Para Thoracic / Lumbar" : 
                       formData.backLocation === "3" ? "Para Lumbar" : "Para Thoracic / Lumbar"}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Movements</Text>
                    <Text style={localStyles.text}>
                      Flexion, Left Lateral Flexion, Right Lateral Flexion | {formData.backPainCurrentSeverity === "3" ? "Restricted (70%)" : "Normal"} | {formData.backPainCurrentSeverity === "3" ? "Painful" : "No Pain"}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Special Tests</Text>
                    <Text style={localStyles.text}>
                      Straight Leg raise | Right side | Normal
                      Straight Leg raise | Left side | {formData.backPainCurrentSeverity === "3" ? "Positive" : "Normal"}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.fieldRow}>
                  <View style={localStyles.fieldColumn}>
                    <Text style={localStyles.fieldLabel}>Neurovascular Deficit</Text>
                    <Text style={localStyles.text}>No neurovascular deficits noted</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
      </Page>
      
      <Page size="A4" style={localStyles.page}>
        {/* Section 15: Employment */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 15 - Employment</Text>
          
          <View style={localStyles.grayBackground}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>15.1 Employment</Text>
          </View>
          
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>{formData.occupation || 'Employment'}</Text>
          <View style={localStyles.grayBackground}>
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Employment Status</Text>
                <Text style={localStyles.text}>
                  Employed as {formData.occupation || 'a worker'} ({formData.workType === "1" ? "Full Time" : formData.workType === "2" ? "Part Time" : "Unknown"}) at the time of the accident.
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Time off</Text>
                <Text style={localStyles.text}>
                  {formData.daysOffWork ? `Taken ${formData.daysOffWork} days off due to the index accident.` : "Not taken time off due to the index accident."}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Restrictions</Text>
                <Text style={localStyles.text}>
                  {formData.daysLightDuties ? 
                    `The Claimant experienced restrictions due to the index accident, which include Light Duties for ${formData.daysLightDuties} days.` : 
                    "The Claimant did not report any work restrictions due to the index accident."}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Opinion on Restrictions</Text>
                <Text style={localStyles.text}>In my opinion, the work restrictions are consistent and attributable to the index accident.</Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Current status</Text>
                <Text style={localStyles.text}>The status has not changed since the accident.</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Section 16: Home & Lifestyle */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 16 - Home & Lifestyle</Text>
          
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Home & Lifestyle</Text>
          <View style={localStyles.grayBackground}>
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Living</Text>
                <Text style={localStyles.text}>
                  The Claimant lives in a {formData.housingType || "House"} with {
                    formData.livingWith === "1" ? "Wife" :
                    formData.livingWith === "2" ? "Husband" :
                    formData.livingWith === "3" ? "Partner" :
                    formData.livingWith === "4" ? "Parents" :
                    formData.livingWith === "5" ? "Alone" : "Family"
                  }.
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Activities</Text>
                <Text style={localStyles.text}>
                  <Text style={{fontWeight: 'bold'}}>Home</Text>{'\n'}
                  The Claimant experiences the following restrictions - 
                  {formData.domesticEffects && formData.domesticEffects.length > 0 ? 
                    formData.domesticEffects.join(', ') : 
                    "Sleep | Housework | Cleaning | Washing"}.{'\n'}
                  The restrictions are moderate and Intermittent.{'\n'}
                  {formData.livingWith !== "5" ? "Assistance was received by the Claimant for the restrictions from Family." : ""}
                  {formData.livingWith !== "5" ? "Received assistance, which was unpaid." : ""}
                  
                  {'\n\n'}<Text style={{fontWeight: 'bold'}}>Sports</Text>{'\n'}
                  {formData.sportLeisureEffects && formData.sportLeisureEffects.length > 0 ? 
                    `The Claimant experiences the following activities (${formData.sportLeisureEffects.join(', ')}) being affected due to the index accident.` : 
                    "The Claimant did not report any sports activities being affected."}
                  {formData.sportLeisureEffects && formData.sportLeisureEffects.length > 0 ? 
                    "\nThe restrictions are moderate and Intermittent.\nMissed Activities - Sports sessions" : ""}
                  
                  {'\n\n'}<Text style={{fontWeight: 'bold'}}>Social</Text>{'\n'}
                  {formData.socialLifeEffects && formData.socialLifeEffects.length > 0 ? 
                    `The Claimant's social activities which were affected as a result of the index accident: ${formData.socialLifeEffects.join(', ')}` : 
                    "The Claimant did not report any social activities being affected."}
                  
                  {formData.travelAnxiety === "1" ? '\n\nExperienced Travel restrictions due to the symptoms - Driving anxiety.' : ''}
                </Text>
              </View>
            </View>
            
            <View style={localStyles.fieldRow}>
              <View style={localStyles.fieldColumn}>
                <Text style={localStyles.fieldLabel}>Opinion</Text>
                <Text style={localStyles.text}>In my opinion, the restrictions are consistent and attributable to the index accident.</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
      </Page>
      
      <Page size="A4" style={localStyles.page}>
        {/* Section 19: Case Declaration */}
        <View>
          <Text style={localStyles.sectionHeader}>Section 19 - Case Declaration</Text>
          
          <Text style={localStyles.text}>I have not provided treatment for the claimant.</Text>
          <Text style={localStyles.text}>I am not associated with any person who has provided treatment.</Text>
          <Text style={localStyles.text}>I have not recommended a particular treatment provider.</Text>
        </View>
        
        {/* Section 20: References */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 20 - References</Text>
          
          <Text style={localStyles.text}>Whiplash. 1966 abstract. Brussels 15-16 November 1996:1-67.</Text>
          <Text style={localStyles.text}>The Quebec whiplash associated disorders cohort study. Spine 1995 : 85 vol.20 (supple B): 12 -39.</Text>
          <Text style={localStyles.text}>Galasko CSB, Murray PM Pitcher M, et al. neck sprains after road traffic accidents: a modern epidemic injury 1993:24:155-7.</Text>
          <Text style={localStyles.text}>Carette S. Whiplash injury and chronic neck pain. N Engl. J med 1994; 330:1083-4.</Text>
          <Text style={localStyles.text}>Post traumatic stress disorder http://www.nhsdirect.nhs.uk/articles/article.aspx?articleId=293.Accessed at 24-April-2008.</Text>
        </View>
        
        {/* Section 21: Declaration */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 21 - Declaration</Text>
          
          <Text style={localStyles.text}>I understand that my overriding duty is to the court, both in preparing reports and in giving oral evidence. I have complied and will continue to comply with that duty.</Text>
          <Text style={localStyles.text}>I am aware of the requirements of Part 35 and practice direction 35, the protocol for instructing experts to give evidence in civil claims and the practice direction on pre-action conduct.</Text>
          <Text style={localStyles.text}>I have set out in my report that I understand from those instructing me to be the questions in respect of which my opinions as an expert are required.</Text>
          <Text style={localStyles.text}>I have done my best, in preparing this report, to be accurate and complete. I have mentioned all matters, which I regard as relevant to the opinions I have expressed. All of the matters on which I have expressed an opinion lie within my field of expertise.</Text>
        </View>
        
        {/* Section 22: Statement of Truth */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 22 - Statement of Truth</Text>
          
          <Text style={localStyles.text}>I confirm that I have made clear which facts and matters referred to in this report are within my own knowledge and which are not. Those that are within my own knowledge I confirm to be true. The opinions I have expressed represent my true and complete professional opinions on the matters to which they refer.</Text>
          <Text style={localStyles.text}>I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.</Text>
        </View>
        
        {/* Section 23: Training and Accreditations */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 23 - Training and Accreditations</Text>
          
          <Text style={localStyles.text}>Attended MedCo Training 2024 Jan.</Text>
        </View>
        
        {/* Section 24: Signed and Dated */}
        <View style={localStyles.subsection}>
          <Text style={localStyles.sectionHeader}>Section 24 - Signed and Dated</Text>
          
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            {signature ? (
              <Text style={localStyles.text}>{signature}</Text>
            ) : (
              <Text style={localStyles.text}>________________________</Text>
            )}
            
            <Text style={localStyles.text}>
              (Electronically signed) {new Date().toLocaleDateString()} Dr.Awais Iqbal, MBBS,{'\n'}
              MRCGP, General Practice, Consultant GMC - 6138189 MedCo{'\n'}
              - DME 8094
            </Text>
          </View>
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>{formData.fullName || 'Anonymous'} report dated {new Date().toLocaleDateString()} | Medical Report | CID {Math.floor(Math.random() * 1000000)}</Text>
      </Page>

    </Document>
  );
};
