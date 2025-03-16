
import { DateTimeSection } from "./accident-info/DateTimeSection";
import { VehicleStatusSection } from "./accident-info/VehicleStatusSection";
import { VehicleDetailsSection } from "./accident-info/VehicleDetailsSection";
import { ImpactSection } from "./accident-info/ImpactSection";
import { ClaimantPositionSection } from "./accident-info/ClaimantPositionSection";
import { useState, useEffect } from "react";

export function IntakeFormSection2({ form }: { form: any }) {
  const accidentDate = form.watch("accidentDate");
  const accidentTime = form.watch("accidentTime");
  const vehicleStatus = form.watch("vehicleStatus");
  const vehicleLocation = form.watch("vehicleLocation");
  const impactLocation = form.watch("impactLocation");
  const vehicleDamage = form.watch("vehicleDamage");
  const claimantPosition = form.watch("claimantPosition");
  const claimantVehicle = form.watch("claimantVehicle");
  const otherVehicle = form.watch("otherVehicle");
  
  const [summaryText, setSummaryText] = useState<string>("");
  
  // Generate summary text based on selected options
  useEffect(() => {
    // Only generate summary if at least some fields are filled
    if (!accidentDate && 
        !accidentTime && 
        !vehicleStatus && 
        !vehicleLocation && 
        !impactLocation && 
        !vehicleDamage && 
        !claimantPosition && 
        !claimantVehicle && 
        !otherVehicle) {
      setSummaryText("");
      form.setValue("accidentSummary", "");
      return;
    }
    
    let text = "Accident Information Summary: ";
    
    // Add date information if available
    if (accidentDate) {
      // Format the date for display
      const formattedDate = new Date(accidentDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      text += `The accident occurred on ${formattedDate}`;
      
      // Add time of day
      const timeOfDay = 
        accidentTime === "1" ? "morning" :
        accidentTime === "2" ? "afternoon" :
        accidentTime === "3" ? "evening" :
        accidentTime === "4" ? "night" : "unspecified time";
      
      text += ` during the ${timeOfDay}. `;
    } else {
      text += "The date of the accident has not been specified. ";
    }
    
    // Add vehicle information
    const vehicleType = 
      claimantVehicle === "1" ? "car" :
      claimantVehicle === "2" ? "van" :
      claimantVehicle === "3" ? "bus" :
      claimantVehicle === "4" ? "other vehicle" : "unspecified vehicle";
    
    // Add vehicle status and location
    const status = 
      vehicleStatus === "1" ? "stationary" :
      vehicleStatus === "2" ? "moving slowly" :
      vehicleStatus === "3" ? "moving moderately" :
      vehicleStatus === "4" ? "moving at speed" : "in an unspecified motion state";
    
    const location = 
      vehicleLocation === "1" ? "on a main road" :
      vehicleLocation === "2" ? "on a minor road" :
      vehicleLocation === "3" ? "at a roundabout" :
      vehicleLocation === "4" ? "while parked" :
      vehicleLocation === "5" ? "at another location" : "at an unspecified location";
    
    text += `The claimant was in a ${vehicleType} that was ${status} ${location}. `;
    
    // Add impact information
    const impact = 
      impactLocation === "1" ? "rear" :
      impactLocation === "2" ? "front" :
      impactLocation === "3" ? "passenger side" :
      impactLocation === "4" ? "driver side" : "unspecified area";
    
    const otherVehicleType = 
      otherVehicle === "1" ? "car" :
      otherVehicle === "2" ? "van" :
      otherVehicle === "3" ? "bus" :
      otherVehicle === "4" ? "other vehicle" : "unspecified vehicle";
    
    text += `The ${vehicleType} was hit in the ${impact} by a ${otherVehicleType}. `;
    
    // Add damage information
    const damage = 
      vehicleDamage === "1" ? "mild damage" :
      vehicleDamage === "2" ? "moderate damage" :
      vehicleDamage === "3" ? "was written off" : "unspecified damage";
    
    text += `The claimant's vehicle sustained ${damage}. `;
    
    // Add claimant position
    const position = 
      claimantPosition === "1" ? "the driver" :
      claimantPosition === "2" ? "a front passenger" :
      claimantPosition === "3" ? "a back passenger" :
      claimantPosition === "4" ? "in another position" : "in an unspecified position";
    
    text += `The claimant was ${position} at the time of the accident.`;
    
    setSummaryText(text);
    
    // Store the summary in the form data (without the prefix)
    const cleanSummary = text.replace("Accident Information Summary: ", "");
    form.setValue("accidentSummary", cleanSummary);
    
  }, [
    accidentDate,
    accidentTime,
    vehicleStatus,
    vehicleLocation,
    impactLocation,
    vehicleDamage,
    claimantPosition,
    claimantVehicle,
    otherVehicle,
    form
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Accident Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DateTimeSection form={form} />
          <VehicleStatusSection form={form} />
          <ImpactSection form={form} />
        </div>
        
        <div className="space-y-6">
          <VehicleDetailsSection form={form} />
          <ClaimantPositionSection form={form} />
        </div>
      </div>
      
      {/* Dynamic Summary Text - Only show if there's content */}
      {summaryText && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-xs text-gray-600 italic">{summaryText}</p>
        </div>
      )}
    </div>
  );
}
