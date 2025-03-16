
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../styles/colorScheme';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

interface StatusBadgeProps {
  status: string;
  small?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, small = false }) => {
  // Determine badge color based on status
  const getBackgroundColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'mild':
        return colorScheme.info;
      case 'moderate':
        return colorScheme.warning;
      case 'severe':
        return colorScheme.error;
      case 'resolved':
        return colorScheme.success;
      default:
        return colorScheme.textLight;
    }
  };

  const styles = {
    badge: {
      backgroundColor: getBackgroundColor(status),
      color: colorScheme.textInverted,
      padding: small ? spacing.xs / 2 : spacing.xs,
      paddingHorizontal: small ? spacing.sm / 2 : spacing.sm,
      borderRadius: 10,
      fontSize: small ? typography.fontSize.xs - 1 : typography.fontSize.xs,
      alignSelf: 'flex-start' as 'flex-start', // Explicit type casting
      marginLeft: spacing.sm,
    },
  };

  return (
    <View style={styles.badge}>
      <Text>{status}</Text>
    </View>
  );
};

export default StatusBadge;
