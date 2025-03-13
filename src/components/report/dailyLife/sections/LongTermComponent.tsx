
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { dailyLifeStyles } from '../dailyLifeStyles';

export const LongTermComponent = () => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>11. Long Term Complications</Text>
      <Text style={dailyLifeStyles.text}>
        In my professional opinion, it is unlikely that the claimant will develop long-term complications as a direct result of the index accident.
      </Text>
    </View>
  );
};
