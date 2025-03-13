
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { useForm } from "react-hook-form";
import { useFormPrefill } from "@/hooks/useFormPrefill";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { format } from "date-fns";

export default function PreviewReport() {
  const navigate = useNavigate();
  
  // Initialize form to access the stored data
  const form = useForm<FormSchema>();
  
  // Use the form prefill hook to load saved data
  useFormPrefill(form);
  
  // Convert form data to report format
  const reportData = convertFormDataToReportData(form.getValues());

  useEffect(() => {
    // Log form data to console for debugging
    console.log("Form data:", form.getValues());
  }, [form]);
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button>
          <h1 className="text-2xl font-bold">Report Preview</h1>
        </div>
        
        <Button 
          onClick={() => navigate("/")} 
          variant="secondary"
          size="sm"
          className="text-white bg-black hover:bg-gray-800"
        >
          <Download className="mr-1 h-4 w-4" />
          Generate PDF Report
        </Button>
      </div>
      
      <div className="space-y-8 bg-white shadow-md rounded-lg p-6 border border-gray-200">
        {/* Personal Information Section */}
        <PreviewSection title="Personal Information">
          <PreviewField label="Full Name" value={form.getValues("fullName")} />
          <PreviewField label="Date of Birth" value={form.getValues("dateOfBirth")} />
          <PreviewField label="Gender" value={form.getValues("gender") === "male" ? "Male" : "Female"} />
          <PreviewField label="Address" value={form.getValues("address")} />
          <PreviewField label="Mobile Number" value={form.getValues("mobileNumber")} />
          <PreviewField label="Email" value={form.getValues("emailId")} />
          <PreviewField label="Occupation" value={form.getValues("occupation")} />
        </PreviewSection>
        
        {/* Accident Details Section */}
        <PreviewSection title="Accident Details">
          <PreviewField label="Accident Date" value={form.getValues("accidentDate")} />
          <PreviewField 
            label="Accident Time" 
            value={getAccidentTimeText(form.getValues("accidentTime"))} 
          />
          <PreviewField 
            label="Vehicle Position" 
            value={getVehiclePositionText(form.getValues("vehiclePosition"))} 
          />
        </PreviewSection>
        
        {/* Medical Information Sections with Dynamic Summary */}
        <PreviewSection title="Neck Pain">
          <PreviewField 
            label="Has Neck Pain" 
            value={form.getValues("neckPain") === "1" ? "Yes" : "No"} 
          />
          
          {form.getValues("neckPain") === "1" && (
            <>
              <PreviewField 
                label="Pain Start" 
                value={getNeckPainStartText(form.getValues("neckPainStart"))} 
              />
              <PreviewField 
                label="Initial Severity" 
                value={getSeverityText(form.getValues("neckPainInitialSeverity"))} 
              />
              <PreviewField 
                label="Current Severity" 
                value={getCurrentSeverityText(form.getValues("neckPainCurrentSeverity"))} 
              />
              
              {form.getValues("neckPainCurrentSeverity") === "4" && (
                <PreviewField 
                  label="Days to Resolve" 
                  value={form.getValues("neckPainResolveDays")} 
                />
              )}
              
              <PreviewField 
                label="Prior Neck Pain" 
                value={form.getValues("hadPriorNeckPain") === "1" ? "Yes" : "No"} 
              />
              
              {form.getValues("hadPriorNeckPain") === "1" && (
                <>
                  <PreviewField 
                    label="% Due to Accident" 
                    value={`${form.getValues("accidentNeckPainPercentage")}%`} 
                  />
                  <PreviewField 
                    label="% Due to Prior Condition" 
                    value={`${form.getValues("priorNeckPainPercentage")}%`} 
                  />
                </>
              )}
              
              <PreviewDynamicSummary>
                {getNeckSummaryText(form.getValues())}
              </PreviewDynamicSummary>
            </>
          )}
        </PreviewSection>
        
        {/* Shoulder Pain Section */}
        <PreviewSection title="Shoulder Pain">
          <PreviewField 
            label="Has Shoulder Pain" 
            value={form.getValues("shoulderPain") === "1" ? "Yes" : "No"} 
          />
          
          {form.getValues("shoulderPain") === "1" && (
            <>
              <PreviewField 
                label="Affected Side" 
                value={getShoulderSideText(form.getValues("shoulderSide"))} 
              />
              <PreviewField 
                label="Pain Start" 
                value={getNeckPainStartText(form.getValues("shoulderPainStart"))} 
              />
              <PreviewField 
                label="Initial Severity" 
                value={getSeverityText(form.getValues("shoulderPainInitialSeverity"))} 
              />
              <PreviewField 
                label="Current Severity" 
                value={getCurrentSeverityText(form.getValues("shoulderPainCurrentSeverity"))} 
              />
              
              {form.getValues("shoulderPainCurrentSeverity") === "4" && (
                <PreviewField 
                  label="Days to Resolve" 
                  value={form.getValues("shoulderPainResolveDays")} 
                />
              )}
              
              <PreviewDynamicSummary>
                {getShoulderSummaryText(form.getValues())}
              </PreviewDynamicSummary>
            </>
          )}
        </PreviewSection>
        
        {/* Back Pain Section */}
        <PreviewSection title="Back Pain">
          <PreviewField 
            label="Has Back Pain" 
            value={form.getValues("backPain") === "1" ? "Yes" : "No"} 
          />
          
          {form.getValues("backPain") === "1" && (
            <>
              <PreviewField 
                label="Back Location" 
                value={getBackLocationText(form.getValues("backLocation"))} 
              />
              <PreviewField 
                label="Pain Start" 
                value={getNeckPainStartText(form.getValues("backPainStart"))} 
              />
              <PreviewField 
                label="Initial Severity" 
                value={getSeverityText(form.getValues("backPainInitialSeverity"))} 
              />
              <PreviewField 
                label="Current Severity" 
                value={getCurrentSeverityText(form.getValues("backPainCurrentSeverity"))} 
              />
              
              {form.getValues("backPainCurrentSeverity") === "4" && (
                <PreviewField 
                  label="Days to Resolve" 
                  value={form.getValues("backPainResolveDays")} 
                />
              )}
            </>
          )}
        </PreviewSection>
        
        {/* Headache Section */}
        <PreviewSection title="Headache">
          <PreviewField 
            label="Has Headache" 
            value={form.getValues("headache") === "1" ? "Yes" : "No"} 
          />
          
          {form.getValues("headache") === "1" && (
            <>
              <PreviewField 
                label="Pain Start" 
                value={getNeckPainStartText(form.getValues("headacheStart"))} 
              />
              <PreviewField 
                label="Initial Severity" 
                value={getSeverityText(form.getValues("headacheInitialSeverity"))} 
              />
              <PreviewField 
                label="Current Severity" 
                value={getCurrentSeverityText(form.getValues("headacheCurrentSeverity"))} 
              />
              
              {form.getValues("headacheCurrentSeverity") === "4" && (
                <PreviewField 
                  label="Days to Resolve" 
                  value={form.getValues("headacheResolveDays")} 
                />
              )}
              
              <PreviewField 
                label="Past History" 
                value={form.getValues("headachePastHistory") || "None"} 
              />
            </>
          )}
        </PreviewSection>
        
        {/* Travel Anxiety Section */}
        <PreviewSection title="Travel Anxiety">
          <PreviewField 
            label="Has Travel Anxiety" 
            value={form.getValues("travelAnxiety") === "1" ? "Yes" : "No"} 
          />
          
          {form.getValues("travelAnxiety") === "1" && (
            <>
              <PreviewField 
                label="Symptoms" 
                value={getTravelAnxietySymptomsText(form.getValues("travelAnxietySymptoms") || [])} 
              />
              <PreviewField 
                label="Initial Severity" 
                value={getSeverityText(form.getValues("anxietyInitialSeverity"))} 
              />
              <PreviewField 
                label="Current Severity" 
                value={getCurrentSeverityText(form.getValues("anxietyCurrentSeverity"))} 
              />
              
              {form.getValues("anxietyCurrentSeverity") === "4" && (
                <PreviewField 
                  label="Days to Resolve" 
                  value={form.getValues("anxietyResolveDays")} 
                />
              )}
              
              <PreviewField 
                label="Past History" 
                value={form.getValues("anxietyPastHistory") || "None"} 
              />
              
              <PreviewDynamicSummary>
                {getTravelAnxietySummaryText(form.getValues())}
              </PreviewDynamicSummary>
            </>
          )}
        </PreviewSection>
        
        {/* Bruising Section */}
        <PreviewSection title="Bruising">
          <PreviewField 
            label="Has Bruising" 
            value={form.getValues("hasBruising") === "1" ? "Yes" : "No"} 
          />
          
          {form.getValues("hasBruising") === "1" && (
            <>
              <PreviewField 
                label="Location" 
                value={form.getValues("bruisingLocation") || "Not specified"} 
              />
              <PreviewField 
                label="Initial Severity" 
                value={getSeverityText(form.getValues("bruisingInitialSeverity"))} 
              />
              <PreviewField 
                label="Current Severity" 
                value={getCurrentSeverityText(form.getValues("bruisingCurrentSeverity"))} 
              />
              
              {form.getValues("bruisingCurrentSeverity") === "4" && (
                <PreviewField 
                  label="Days to Resolve" 
                  value={form.getValues("bruisingResolveDays")} 
                />
              )}
              
              <PreviewDynamicSummary>
                {getBruisingSummaryText(form.getValues())}
              </PreviewDynamicSummary>
            </>
          )}
        </PreviewSection>
        
        {/* Medical History Section */}
        <PreviewSection title="Medical History">
          <PreviewField 
            label="Exceptional Injuries" 
            value={form.getValues("exceptionalInjuries") === "1" ? "Yes" : "No"} 
          />
          
          {form.getValues("exceptionalInjuries") === "1" && (
            <PreviewField 
              label="Details" 
              value={form.getValues("exceptionalInjuriesDetails") || "None provided"} 
            />
          )}
          
          <PreviewField 
            label="Additional Information" 
            value={form.getValues("additionalInfo") || "None provided"} 
          />
        </PreviewSection>
      </div>
    </div>
  );
}

// Helper Components
const PreviewSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pb-6 border-b border-gray-200 last:border-0">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const PreviewField: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-500">{label}:</p>
    <p className="text-sm">{value || "N/A"}</p>
  </div>
);

const PreviewDynamicSummary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="col-span-1 md:col-span-2 mt-4 p-3 rounded-md border border-gray-200 bg-slate-200">
    <p className="text-xs italic text-gray-950">{children}</p>
  </div>
);

// Helper functions to convert values to readable text
function getNeckPainStartText(value: string | undefined): string {
  if (!value) return "N/A";
  switch (value) {
    case "1": return "Same day";
    case "2": return "Next day";
    case "3": return "Few days later";
    default: return "N/A";
  }
}

function getSeverityText(value: string | undefined): string {
  if (!value) return "N/A";
  switch (value) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    default: return "N/A";
  }
}

function getCurrentSeverityText(value: string | undefined): string {
  if (!value) return "N/A";
  switch (value) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "N/A";
  }
}

function getShoulderSideText(value: string | undefined): string {
  if (!value) return "N/A";
  switch (value) {
    case "1": return "Left";
    case "2": return "Right";
    case "3": return "Both";
    default: return "N/A";
  }
}

function getBackLocationText(value: string | undefined): string {
  if (!value) return "N/A";
  switch (value) {
    case "1": return "Upper back";
    case "2": return "Mid back";
    case "3": return "Lower back";
    default: return "N/A";
  }
}

function getAccidentTimeText(value: string | undefined): string {
  if (!value) return "N/A";
  switch (value) {
    case "1": return "Morning";
    case "2": return "Afternoon";
    case "3": return "Evening";
    case "4": return "Night";
    default: return "N/A";
  }
}

function getVehiclePositionText(value: string | undefined): string {
  if (!value) return "N/A";
  switch (value) {
    case "1": return "Driver";
    case "2": return "Front passenger";
    case "3": return "Rear passenger";
    default: return "N/A";
  }
}

function getTravelAnxietySymptomsText(values: string[]): string {
  if (!values || values.length === 0) return "None";
  
  const symptomsMap: Record<string, string> = {
    "cautious-driver": "Being a more cautious driver",
    "frequent-mirror-checking": "Looking in the mirror more frequently",
    "avoid-accident-road": "Avoiding the road where the accident happened",
    "avoid-passenger": "Avoiding being a passenger",
    "avoid-driving": "Avoiding driving",
    "panic-attacks": "Panic attacks when in a car",
    "passenger-anxiety": "Anxiety when traveling as a passenger",
    "busy-road-anxiety": "Anxiety on busy roads or highways",
    "prevented-driving": "Being prevented from driving for leisure or work"
  };
  
  return values.map(v => symptomsMap[v] || v).join(", ");
}

// Functions to get dynamic summary text
function getNeckSummaryText(formData: Partial<FormSchema>): string {
  if (formData.neckPain === "1") {
    // Map the values to their text representations
    const startText = formData.neckPainStart === "1" ? "same day" : 
                     formData.neckPainStart === "2" ? "next day" : 
                     "few days later";
    const initialSeverityText = formData.neckPainInitialSeverity === "1" ? "mild" : 
                               formData.neckPainInitialSeverity === "2" ? "moderate" : 
                               "severe";
    const currentSeverityText = formData.neckPainCurrentSeverity === "1" ? "mild" : 
                               formData.neckPainCurrentSeverity === "2" ? "moderate" : 
                               formData.neckPainCurrentSeverity === "3" ? "severe" : 
                               "resolved";
    
    let text = `Claimant suffered from neck pain after the accident. It started ${startText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}. `;

    // Add resolution days if pain has resolved
    if (formData.neckPainCurrentSeverity === "4" && formData.neckPainResolveDays) {
      text += `Claimant's neck pain resolved in ${formData.neckPainResolveDays} days. `;
    }
    
    if (formData.hadPriorNeckPain === "1") {
      if (formData.accidentNeckPainPercentage && formData.priorNeckPainPercentage) {
        text += `Claimant had previous history of neck pain before the accident. ${formData.accidentNeckPainPercentage}% of current pain is due to this accident and ${formData.priorNeckPainPercentage}% is due to previous condition.`;
      } else {
        text += "Claimant had previous history of neck pain before the accident.";
      }
    } else {
      text += "Claimant did not have previous history of neck pain before the accident.";
    }
    
    return text;
  } else {
    return "Claimant did not suffer from neck pain after the accident.";
  }
}

function getShoulderSummaryText(formData: Partial<FormSchema>): string {
  if (formData.shoulderPain === "1") {
    // Map the values to their text representations
    const sideText = formData.shoulderSide === "1" ? "left shoulder" : 
                    formData.shoulderSide === "2" ? "right shoulder" : 
                    "both shoulders";
                    
    const startText = formData.shoulderPainStart === "1" ? "same day" : 
                      formData.shoulderPainStart === "2" ? "next day" : 
                      "few days later";
                      
    const initialSeverityText = formData.shoulderPainInitialSeverity === "1" ? "mild" :
                               formData.shoulderPainInitialSeverity === "2" ? "moderate" :
                               "severe";
                               
    const currentSeverityText = formData.shoulderPainCurrentSeverity === "1" ? "mild" :
                               formData.shoulderPainCurrentSeverity === "2" ? "moderate" :
                               formData.shoulderPainCurrentSeverity === "3" ? "severe" :
                               "resolved";
    
    let text = `Claimant suffered from ${sideText} pain after the accident. It started ${startText}, initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}. `;
    
    // Add resolution days if pain has resolved
    if (formData.shoulderPainCurrentSeverity === "4" && formData.shoulderPainResolveDays) {
      text += `Claimant's shoulder pain resolved in ${formData.shoulderPainResolveDays} days. `;
    }
    
    return text;
  } else {
    return "Claimant did not suffer from shoulder pain after the accident.";
  }
}

function getTravelAnxietySummaryText(formData: Partial<FormSchema>): string {
  if (formData.travelAnxiety === "1") {
    // Map the values to their text representations
    const initialSeverityText = formData.anxietyInitialSeverity === "1" ? "mild" :
                              formData.anxietyInitialSeverity === "2" ? "moderate" :
                              "severe";
                              
    const currentSeverityText = formData.anxietyCurrentSeverity === "1" ? "mild" :
                              formData.anxietyCurrentSeverity === "2" ? "moderate" :
                              formData.anxietyCurrentSeverity === "3" ? "severe" :
                              "resolved";
    
    let text = `Claimant suffered from travel anxiety after the accident. Initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
    
    // Add symptoms if any
    if (formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0) {
      // Convert IDs to readable symptoms
      const readableSymptoms = formData.travelAnxietySymptoms.map(symptom => {
        switch(symptom) {
          case "cautious-driver": return "being a more cautious driver";
          case "frequent-mirror-checking": return "looking in the mirror more frequently";
          case "avoid-accident-road": return "avoiding the road where the accident happened";
          case "avoid-passenger": return "avoiding being a passenger";
          case "avoid-driving": return "avoiding driving";
          case "panic-attacks": return "panic attacks when in a car";
          case "passenger-anxiety": return "anxiety when traveling as a passenger";
          case "busy-road-anxiety": return "anxiety on busy roads or highways";
          case "prevented-driving": return "being prevented from driving for leisure or work";
          default: return symptom;
        }
      });
      text += ` Symptoms include: ${readableSymptoms.join(", ")}.`;
    }
    
    // Add resolution days if anxiety has resolved
    if (formData.anxietyCurrentSeverity === "4" && formData.anxietyResolveDays) {
      text += ` Claimant's travel anxiety resolved in ${formData.anxietyResolveDays} days.`;
    }
    
    // Add history information
    if (formData.hasAnxietyHistory === "yes") {
      text += " Claimant had previous history of travel anxiety before the accident.";
      if (formData.anxietyPastHistory) {
        text += ` History details: ${formData.anxietyPastHistory}.`;
      }
    } else if (formData.hasAnxietyHistory === "no") {
      text += " Claimant did not have previous history of travel anxiety before the accident.";
    }
    
    return text;
  } else {
    return "Claimant did not suffer from travel anxiety after the accident.";
  }
}

function getBruisingSummaryText(formData: Partial<FormSchema>): string {
  if (formData.hasBruising === "1") {
    const initialSeverityText = formData.bruisingInitialSeverity === "1" ? "mild" :
                              formData.bruisingInitialSeverity === "2" ? "moderate" :
                              "severe";
                               
    const currentSeverityText = formData.bruisingCurrentSeverity === "1" ? "mild" :
                              formData.bruisingCurrentSeverity === "2" ? "moderate" :
                              formData.bruisingCurrentSeverity === "3" ? "severe" :
                              "resolved";
    
    let text = `Claimant had bruising or scarring at ${formData.bruisingLocation || "unspecified location"} after the accident. Initial severity was ${initialSeverityText}, current severity is ${currentSeverityText}.`;
    
    if (formData.bruisingCurrentSeverity === "4" && formData.bruisingResolveDays) {
      text += ` The bruising resolved in ${formData.bruisingResolveDays} days.`;
    }
    
    return text;
  } else {
    return "Claimant did not have any bruising or scarring from the accident.";
  }
}
