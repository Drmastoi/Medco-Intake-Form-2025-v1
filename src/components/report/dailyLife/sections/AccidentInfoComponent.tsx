
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';
import { formatDate } from '../../../../utils/dateUtils';

interface AccidentInfoProps {
  formData: Partial<FormSchema>;
}

export const AccidentInfoComponent = ({ formData }: AccidentInfoProps) => {
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
      case '1': return 'moving';
      case '2': return 'stationary';
      case '3': return 'parked';
      case '4': return 'in another state';
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

  // Check if we have any accident information at all
  const hasAccidentInfo = formData.accidentDate || 
                         formData.accidentTime || 
                         formData.claimantVehicle || 
                         formData.vehicleStatus || 
                         formData.vehicleLocation || 
                         formData.impactLocation || 
                         formData.vehicleDamage || 
                         formData.claimantPosition;

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>5.1 Accident Information</Text>
      {hasAccidentInfo ? (
        <Text style={dailyLifeStyles.text}>
          {formData.accidentDate ? `The accident occurred on ${formatDate(formData.accidentDate)}` : 'The date of the accident has not been specified'} 
          {formData.accidentTime ? ` during the ${getTimeOfDay(formData.accidentTime)}. ` : '. '}
          
          The claimant was in a {getVehicleTypeText(formData.claimantVehicle)} that was {getVehicleStatusText(formData.vehicleStatus)} {getVehicleLocationText(formData.vehicleLocation)}. 
          The {getVehicleTypeText(formData.claimantVehicle)} was hit in the {getImpactLocationText(formData.impactLocation)} by a {getVehicleTypeText(formData.otherVehicle)}. 
          The claimant's vehicle sustained {getVehicleDamageText(formData.vehicleDamage)}. 
          The claimant was {getClaimantPositionText(formData.claimantPosition)} at the time of the accident.
        </Text>
      ) : (
        <Text style={dailyLifeStyles.text}>No accident information has been provided.</Text>
      )}
    </View>
  );
};
