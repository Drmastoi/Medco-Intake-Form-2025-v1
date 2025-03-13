
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { dailyLifeStyles } from '../dailyLifeStyles';

export const CaseDeclarationComponent = () => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>13. Case Declaration</Text>
      <View style={dailyLifeStyles.bulletList}>
        <Text style={dailyLifeStyles.bulletItem}>• I have not provided treatment for the claimant.</Text>
        <Text style={dailyLifeStyles.bulletItem}>• I am not associated with any person who has provided treatment.</Text>
        <Text style={dailyLifeStyles.bulletItem}>• I have not recommended a particular treatment provider.</Text>
      </View>
    </View>
  );
};
