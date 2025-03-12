
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { dailyLifeStyles } from '../dailyLifeStyles';

export const SoftTissueComponent = () => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>11. Soft Tissue Injury Claim</Text>
      <View style={dailyLifeStyles.bulletList}>
        <Text style={dailyLifeStyles.bulletItem}>• Please confirm whether the claimant was an occupant of a Motor vehicle: Yes</Text>
        <Text style={dailyLifeStyles.bulletItem}>(Exclude – Pedestrians, Motorcyclist and Cyclist)</Text>
        <Text style={dailyLifeStyles.bulletItem}>• Please confirm whether the claim satisfies as a Soft Tissue Injury: Yes</Text>
        <Text style={dailyLifeStyles.bulletItem}>• Is this the first report in relation to the client's injuries from the index accident: Yes</Text>
      </View>
    </View>
  );
};
