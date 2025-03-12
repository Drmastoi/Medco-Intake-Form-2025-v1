import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';

interface InjurySummaryProps {
  formData: Partial<FormSchema>;
}

export const InjurySummarySection = ({ formData }: InjurySummaryProps) => {
  // Extract relevant form data
  const {
    // Accident details
    accidentDate,
    accidentTime,
    vehicleStatus,
    vehicleLocation,
    impactLocation,
    vehicleDamage,
    claimantPosition,
    claimantVehicle,
    otherVehicle,
    
    // Neck pain
    neckPain, 
    neckPainStart,
    neckPainInitialSeverity,
    neckPainCurrentSeverity,
    neckPainResolveDays,
    hadPriorNeckPain,
    accidentNeckPainPercentage,
    priorNeckPainPercentage,
    
    // Shoulder pain
    shoulderPain,
    shoulderSide,
    shoulderPainStart,
    shoulderPainInitialSeverity,
    shoulderPainCurrentSeverity,
    shoulderPainResolveDays,
    hadPriorShoulderPain,
    
    // Back pain
    backPain,
    backLocation,
    backPainStart,
    backPainInitialSeverity,
    backPainCurrentSeverity,
    backPainResolveDays,
    
    // Headache
    headache,
    headacheStart,
    headacheInitialSeverity,
    headacheCurrentSeverity,
    headacheResolveDays,
    headachePastHistory,
    
    // Travel anxiety
    travelAnxiety,
    travelAnxietySymptoms,
    anxietyInitialSeverity,
    anxietyCurrentSeverity,
    anxietyResolveDays,
    hasAnxietyHistory,
    
    // Bruising
    hasBruising,
    bruisingLocation,
    bruisingInitialSeverity,
    bruisingCurrentSeverity,
    bruisingResolveDays,
    
    // Other injuries
    hasOtherInjury,
    injuryName,
    injuryDescription,
    injuryInitialSeverity,
    injuryCurrentSeverity,
    injuryResolveDays,
    
    // Treatment
    hasTreatment,
    treatmentType,
    treatmentFrequency,
    treatmentDuration,
    ongoingTreatment,
    
    // Lifestyle impact
    impactOnWork,
    timeOffWork,
    workRestrictions,
    impactOnSleep,
    sleepIssues,
    impactOnDomestic,
    domesticIssues,
    impactOnSports,
    sportsActivities,
    sportsDuration,
    impactOnSocial,
    socialDetails,
    
    // Medical history
    previousAccident,
    previousAccidentDate,
    previousAccidentRecovery,
    previousInjuriesWorse,
    previousConditionWorse,
    additionalInformation,
    additionalInformationDetails,
    exceptionalInjuries,
    exceptionalInjuriesDetails
  } = formData;

  // Helper function to convert severity codes to readable text
  const getSeverityText = (code: string | undefined) => {
    switch(code) {
      case '1': return 'mild';
      case '2': return 'moderate';
      case '3': return 'severe';
      case '4': return 'resolved';
      default: return 'unknown';
    }
  };

  // Helper function to get time of day text
  const getTimeOfDay = (time: string | undefined) => {
    switch(time) {
      case '1': return 'morning';
      case '2': return 'afternoon';
      case '3': return 'evening';
      case '4': return 'night';
      default: return 'unspecified time';
    }
  };

  // Helper function to get shoulder side text
  const getShoulderSideText = (side: string | undefined) => {
    switch(side) {
      case '1': return 'right';
      case '2': return 'left';
      case '3': return 'both';
      default: return '';
    }
  };

  // Helper function to get back location text
  const getBackLocationText = (location: string | undefined) => {
    switch(location) {
      case '1': return 'upper';
      case '2': return 'middle';
      case '3': return 'lower';
      case '4': return 'entire';
      default: return '';
    }
  };

  // Helper function to get vehicle type text
  const getVehicleTypeText = (type: string | undefined) => {
    switch(type) {
      case '1': return 'car';
      case '2': return 'van';
      case '3': return 'bus';
      case '4': return 'other vehicle';
      default: return 'unspecified vehicle';
    }
  };

  // Helper function to get vehicle status text
  const getVehicleStatusText = (status: string | undefined) => {
    switch(status) {
      case '1': return 'stationary';
      case '2': return 'moving slowly';
      case '3': return 'moving moderately';
      case '4': return 'moving at speed';
      default: return 'in an unspecified motion state';
    }
  };

  // Helper function to get vehicle location text
  const getVehicleLocationText = (location: string | undefined) => {
    switch(location) {
      case '1': return 'on a main road';
      case '2': return 'on a minor road';
      case '3': return 'at a roundabout';
      case '4': return 'while parked';
      case '5': return 'at another location';
      default: return 'at an unspecified location';
    }
  };

  // Helper function to get impact location text
  const getImpactLocationText = (location: string | undefined) => {
    switch(location) {
      case '1': return 'rear';
      case '2': return 'front';
      case '3': return 'passenger side';
      case '4': return 'driver side';
      default: return 'unspecified area';
    }
  };

  // Helper function to get vehicle damage text
  const getVehicleDamageText = (damage: string | undefined) => {
    switch(damage) {
      case '1': return 'mild damage';
      case '2': return 'moderate damage';
      case '3': return 'was written off';
      default: return 'unspecified damage';
    }
  };

  // Helper function to get claimant position text
  const getClaimantPositionText = (position: string | undefined) => {
    switch(position) {
      case '1': return 'the driver';
      case '2': return 'a front passenger';
      case '3': return 'a back passenger';
      case '4': return 'in another position';
      default: return 'in an unspecified position';
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'unspecified date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return 'unspecified date';
    }
  };

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.title}>Summary of Injuries and Symptoms</Text>
      
      {/* Section 5.1 - Accident History */}
      <View style={dailyLifeStyles.section}>
        <Text style={dailyLifeStyles.subtitle}>5.1 Accident Information</Text>
        <Text style={dailyLifeStyles.text}>
          {accidentDate ? `The accident occurred on ${formatDate(accidentDate)}` : 'The date of the accident has not been specified'} 
          {accidentTime ? ` during the ${getTimeOfDay(accidentTime)}. ` : '. '}
          
          The claimant was in a {getVehicleTypeText(claimantVehicle)} that was {getVehicleStatusText(vehicleStatus)} {getVehicleLocationText(vehicleLocation)}. 
          The {getVehicleTypeText(claimantVehicle)} was hit in the {getImpactLocationText(impactLocation)} by a {getVehicleTypeText(otherVehicle)}. 
          The claimant's vehicle sustained {getVehicleDamageText(vehicleDamage)}. 
          The claimant was {getClaimantPositionText(claimantPosition)} at the time of the accident.
        </Text>
      </View>

      {/* Section 6 - Injuries and Symptoms */}
      <Text style={dailyLifeStyles.subtitle}>6. Injuries and Symptoms</Text>
      
      {/* Section 6.1 - Neck Pain */}
      {neckPain === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>6.1 Neck Pain</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant suffered from neck pain after the accident. 
            It started {neckPainStart === "1" ? "on the same day" : 
                       neckPainStart === "2" ? "on the next day" : 
                       "a few days later"}, 
            with initial severity rated as {getSeverityText(neckPainInitialSeverity)}. 
            The current severity is {getSeverityText(neckPainCurrentSeverity)}.
            {neckPainCurrentSeverity === "4" && neckPainResolveDays ? 
              ` The neck pain resolved in ${neckPainResolveDays} days.` : ''}
            {hadPriorNeckPain === "1" ? 
              ` The claimant had previous history of neck pain before the accident.${
                accidentNeckPainPercentage && priorNeckPainPercentage ? 
                ` ${accidentNeckPainPercentage}% of current pain is due to this accident and ${priorNeckPainPercentage}% is due to previous condition.` : ''
              }` : 
              ' The claimant did not have previous history of neck pain before the accident.'}
          </Text>
        </View>
      )}

      {/* Section 6.2 - Shoulder Pain */}
      {shoulderPain === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>6.2 Shoulder Pain</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant suffered from {getShoulderSideText(shoulderSide)} shoulder pain after the accident. 
            It started {shoulderPainStart === "1" ? "on the same day" : 
                      shoulderPainStart === "2" ? "on the next day" : 
                      "a few days later"}, 
            with initial severity rated as {getSeverityText(shoulderPainInitialSeverity)}. 
            The current severity is {getSeverityText(shoulderPainCurrentSeverity)}.
            {shoulderPainCurrentSeverity === "4" && shoulderPainResolveDays ? 
              ` The shoulder pain resolved in ${shoulderPainResolveDays} days.` : ''}
            {hadPriorShoulderPain === "1" ? 
              ' The claimant had previous history of shoulder pain before the accident.' : 
              ' The claimant did not have previous history of shoulder pain before the accident.'}
          </Text>
        </View>
      )}

      {/* Section 6.3 - Back Pain */}
      {backPain === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>6.3 Back Pain</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant suffered from {getBackLocationText(backLocation)} back pain after the accident. 
            It started {backPainStart === "1" ? "on the same day" : 
                      backPainStart === "2" ? "on the next day" : 
                      "a few days later"}, 
            with initial severity rated as {getSeverityText(backPainInitialSeverity)}. 
            The current severity is {getSeverityText(backPainCurrentSeverity)}.
            {backPainCurrentSeverity === "4" && backPainResolveDays ? 
              ` The back pain resolved in ${backPainResolveDays} days.` : ''}
          </Text>
        </View>
      )}

      {/* Section 6.4 - Headache */}
      {headache === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>6.4 Headache</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant suffered from headaches after the accident. 
            They started {headacheStart === "1" ? "on the same day" : 
                       headacheStart === "2" ? "on the next day" : 
                       "a few days later"}, 
            with initial severity rated as {getSeverityText(headacheInitialSeverity)}. 
            The current severity is {getSeverityText(headacheCurrentSeverity)}.
            {headacheCurrentSeverity === "4" && headacheResolveDays ? 
              ` The headaches resolved in ${headacheResolveDays} days.` : ''}
            {headachePastHistory ? ` Past history: ${headachePastHistory}.` : ''}
          </Text>
        </View>
      )}

      {/* Section 6.5 - Travel Anxiety */}
      {travelAnxiety === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>6.5 Travel Anxiety</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant developed travel anxiety after the accident.
            {travelAnxietySymptoms && travelAnxietySymptoms.length > 0 ? 
              ` Symptoms include: ${travelAnxietySymptoms.join(', ')}.` : ''}
            The initial severity was rated as {getSeverityText(anxietyInitialSeverity)}.
            The current severity is {getSeverityText(anxietyCurrentSeverity)}.
            {anxietyCurrentSeverity === "4" && anxietyResolveDays ? 
              ` The anxiety resolved in ${anxietyResolveDays} days.` : ''}
            {hasAnxietyHistory === "yes" ? 
              ' The claimant had previous history of anxiety before the accident.' : 
              ' The claimant did not have previous history of anxiety before the accident.'}
          </Text>
        </View>
      )}

      {/* Section 6.6 - Bruising */}
      {hasBruising === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>6.6 Bruising</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant experienced bruising as a result of the accident.
            {bruisingLocation ? ` The bruising was located at: ${bruisingLocation}.` : ''}
            The initial severity was rated as {getSeverityText(bruisingInitialSeverity)}.
            The current severity is {getSeverityText(bruisingCurrentSeverity)}.
            {bruisingCurrentSeverity === "4" && bruisingResolveDays ? 
              ` The bruising resolved in ${bruisingResolveDays} days.` : ''}
          </Text>
        </View>
      )}

      {/* Section 6.7 - Other Injuries */}
      {hasOtherInjury === '1' && (
        <View style={dailyLifeStyles.section}>
          <Text style={dailyLifeStyles.subtitle}>6.7 Other Injuries</Text>
          <Text style={dailyLifeStyles.text}>
            The claimant experienced {injuryName || 'other injuries'} as a result of the accident.
            {injuryDescription ? ` Details: ${injuryDescription}.` : ''}
            The initial severity was rated as {getSeverityText(injuryInitialSeverity)}.
            The current severity is {getSeverityText(injuryCurrentSeverity)}.
            {injuryCurrentSeverity === "4" && injuryResolveDays ? 
              ` These injuries resolved in ${injuryResolveDays} days.` : ''}
          </Text>
        </View>
      )}

      {/* Section 7 - Treatment */}
      <View style={dailyLifeStyles.section}>
        <Text style={dailyLifeStyles.subtitle}>7. Treatment</Text>
        <Text style={dailyLifeStyles.text}>
          {hasTreatment === '1' ? 
            `The claimant has received treatment for their injuries. 
            ${treatmentType && treatmentType.length > 0 ? `Types of treatment: ${treatmentType.join(', ')}. ` : ''}
            ${treatmentFrequency ? `Frequency: ${treatmentFrequency}. ` : ''}
            ${treatmentDuration ? `Duration: ${treatmentDuration}. ` : ''}
            ${ongoingTreatment === '1' ? 'The treatment is ongoing.' : 'The treatment has been completed.'}` : 
            'The claimant has not received any treatment for their injuries.'}
        </Text>
      </View>

      {/* Section 8 - Impact on Lifestyle */}
      <View style={dailyLifeStyles.section}>
        <Text style={dailyLifeStyles.subtitle}>8. Impact on Lifestyle</Text>
        
        {/* Work Impact */}
        <Text style={dailyLifeStyles.text}>
          {impactOnWork === '1' ? 
            `The accident has impacted the claimant's ability to work. 
            ${timeOffWork ? `Time off work: ${timeOffWork}. ` : ''}
            ${workRestrictions && workRestrictions.length > 0 ? `Work restrictions: ${workRestrictions.join(', ')}.` : ''}` : 
            'The accident has not impacted the claimant\'s ability to work.'}
        </Text>
        
        {/* Sleep Impact */}
        <Text style={dailyLifeStyles.text}>
          {impactOnSleep === '1' ? 
            `The accident has impacted the claimant's sleep. 
            ${sleepIssues && sleepIssues.length > 0 ? `Sleep issues: ${sleepIssues.join(', ')}.` : ''}` : 
            'The accident has not impacted the claimant\'s sleep.'}
        </Text>
        
        {/* Domestic Impact */}
        <Text style={dailyLifeStyles.text}>
          {impactOnDomestic === '1' ? 
            `The accident has impacted the claimant's ability to perform domestic activities. 
            ${domesticIssues && domesticIssues.length > 0 ? `Domestic challenges: ${domesticIssues.join(', ')}.` : ''}` : 
            'The accident has not impacted the claimant\'s ability to perform domestic activities.'}
        </Text>
        
        {/* Sports/Leisure Impact */}
        <Text style={dailyLifeStyles.text}>
          {impactOnSports === '1' ? 
            `The accident has impacted the claimant's ability to participate in sports and leisure activities. 
            ${sportsActivities ? `Affected activities: ${sportsActivities}. ` : ''}
            ${sportsDuration ? `Duration of impact: ${sportsDuration}.` : ''}` : 
            'The accident has not impacted the claimant\'s ability to participate in sports and leisure activities.'}
        </Text>
        
        {/* Social Life Impact */}
        <Text style={dailyLifeStyles.text}>
          {impactOnSocial === '1' ? 
            `The accident has impacted the claimant's social life. 
            ${socialDetails ? `Details: ${socialDetails}.` : ''}` : 
            'The accident has not impacted the claimant\'s social life.'}
        </Text>
      </View>

      {/* Section 9 - Past Medical History */}
      <View style={dailyLifeStyles.section}>
        <Text style={dailyLifeStyles.subtitle}>9. Past Medical History</Text>
        <Text style={dailyLifeStyles.text}>
          {previousAccident === '1' ? 
            `The claimant reports having been involved in a previous road traffic accident
            ${previousAccidentDate ? `on ${formatDate(previousAccidentDate)}` : ''}.
            ${previousAccidentRecovery === '1' ? 
              'They report having made a complete recovery from that accident. ' : 
              previousAccidentRecovery === '2' ? 
              'They report that they had not made a complete recovery from that accident. ' : ''}
            ${previousInjuriesWorse === '1' ? 
              'The claimant reports that the current accident has made their previous injuries worse. ' : 
              previousInjuriesWorse === '2' ? 
              'The claimant reports that the current accident has not made their previous injuries worse. ' : ''}` : 
            'The claimant reports no previous road traffic accidents. '}
          
          ${previousConditionWorse ? 
            `The claimant reports having previous medical conditions that have been made worse by this accident: ${previousConditionWorse}. ` : 
            'The claimant has not reported any pre-existing medical conditions that have been exacerbated by this accident. '}
          
          ${exceptionalInjuries === '1' && exceptionalInjuriesDetails ? 
            `The claimant reports having exceptionally severe physical or psychological injuries: ${exceptionalInjuriesDetails}. ` : 
            exceptionalInjuries === '1' ? 
            'The claimant reports having exceptionally severe physical or psychological injuries. ' : 
            'The claimant does not report any exceptionally severe physical or psychological injuries. '}
          
          ${additionalInformation === '1' && additionalInformationDetails ? 
            `Additional information provided by the claimant: ${additionalInformationDetails}.` : ''}
        </Text>
      </View>

      {/* Section 10 - Long Term Complications */}
      <View style={dailyLifeStyles.section}>
        <Text style={dailyLifeStyles.subtitle}>10. Long Term Complications</Text>
        <Text style={dailyLifeStyles.text}>
          In my professional opinion, it is unlikely that the claimant will develop long-term complications as a direct result of the index accident.
        </Text>
      </View>

      {/* Section 11 - Soft Tissue Injury Claim */}
      <View style={dailyLifeStyles.section}>
        <Text style={dailyLifeStyles.subtitle}>11. Soft Tissue Injury Claim</Text>
        <View style={dailyLifeStyles.bulletList}>
          <Text style={dailyLifeStyles.bulletItem}>• Please confirm whether the claimant was an occupant of a Motor vehicle: Yes</Text>
          <Text style={dailyLifeStyles.bulletItem}>(Exclude – Pedestrians, Motorcyclist and Cyclist)</Text>
          <Text style={dailyLifeStyles.bulletItem}>• Please confirm whether the claim satisfies as a Soft Tissue Injury: Yes</Text>
          <Text style={dailyLifeStyles.bulletItem}>• Is this the first report in relation to the client's injuries from the index accident: Yes</Text>
        </View>
      </View>

      {/* Section 12 - Case Declaration */}
      <View style={dailyLifeStyles.section}>
        <Text style={dailyLifeStyles.subtitle}>12. Case Declaration</Text>
        <View style={dailyLifeStyles.bulletList}>
          <Text style={dailyLifeStyles.bulletItem}>• I have not provided treatment for the claimant.</Text>
          <Text style={dailyLifeStyles.bulletItem}>• I am not associated with any person who has provided treatment.</Text>
          <Text style={dailyLifeStyles.bulletItem}>• I have not recommended a particular treatment provider.</Text>
        </View>
      </View>
    </View>
  );
};
