
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MedicalHistorySummaryProps {
  formData: {
    previousAccident: string;
    previousAccidentDate?: string;
    previousAccidentRecovery?: string;
    previousInjuriesWorse?: string;
    previousConditionWorse?: string;
    additionalInformation: string;
    additionalInformationDetails?: string;
    exceptionalInjuries: string;
    exceptionalInjuriesDetails?: string;
    physiotherapyPreference?: string;
  };
}

export function MedicalHistorySummary({ formData }: MedicalHistorySummaryProps) {
  const [summaryText, setSummaryText] = useState<string>("");
  
  useEffect(() => {
    let text = "Medical History Summary: ";
    
    // Previous accident
    if (formData.previousAccident === "1") {
      text += "The claimant reports having been involved in a previous road traffic accident";
      
      if (formData.previousAccidentDate) {
        // Format the date for display
        const formattedDate = new Date(formData.previousAccidentDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        text += ` on ${formattedDate}`;
      }
      text += ". ";
      
      // Recovery from previous accident
      if (formData.previousAccidentRecovery === "1") {
        text += "They report having made a complete recovery from that accident. ";
      } else if (formData.previousAccidentRecovery === "2") {
        text += "They report that they had not made a complete recovery from that accident. ";
      }
      
      // Effect of current accident on previous injuries
      if (formData.previousInjuriesWorse === "1") {
        text += "The claimant reports that the current accident has made their previous injuries worse. ";
      } else if (formData.previousInjuriesWorse === "2") {
        text += "The claimant reports that the current accident has not made their previous injuries worse. ";
      }
    } else {
      text += "The claimant reports no previous road traffic accidents. ";
    }
    
    // Previous medical conditions
    if (formData.previousConditionWorse) {
      text += `The claimant reports having previous medical conditions that have been made worse by this accident: ${formData.previousConditionWorse}. `;
    } else {
      text += "The claimant has not reported any pre-existing medical conditions that have been exacerbated by this accident. ";
    }
    
    // Exceptional injuries
    if (formData.exceptionalInjuries === "1" && formData.exceptionalInjuriesDetails) {
      text += `The claimant reports having exceptionally severe physical or psychological injuries: ${formData.exceptionalInjuriesDetails}. `;
    } else if (formData.exceptionalInjuries === "1") {
      text += "The claimant reports having exceptionally severe physical or psychological injuries. ";
    } else {
      text += "The claimant does not report any exceptionally severe physical or psychological injuries. ";
    }
    
    // Physiotherapy preference
    if (formData.physiotherapyPreference === "1") {
      text += "The claimant would like to have physiotherapy if offered. ";
    } else if (formData.physiotherapyPreference === "2") {
      text += "The claimant does not want physiotherapy. ";
    } else if (formData.physiotherapyPreference === "3") {
      text += "The claimant is already receiving physiotherapy. ";
    } else if (formData.physiotherapyPreference === "4") {
      text += "The claimant has already recovered and does not need physiotherapy. ";
    }
    
    // Additional information
    if (formData.additionalInformation === "1" && formData.additionalInformationDetails) {
      text += `Additional information provided by the claimant: ${formData.additionalInformationDetails}.`;
    }
    
    setSummaryText(text);
  }, [formData]);

  if (!summaryText) return null;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-2 text-blue-800">Summary</h3>
        <p className="text-sm text-blue-700">{summaryText}</p>
      </CardContent>
    </Card>
  );
}
