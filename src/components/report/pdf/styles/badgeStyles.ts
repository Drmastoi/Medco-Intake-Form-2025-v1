
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';
import { spacing } from './spacing';
import { typography } from './typography';

export const badgeStyles = StyleSheet.create({
  badge: {
    backgroundColor: colorScheme.accent,
    color: colorScheme.textInverted,
    padding: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 10,
    fontSize: typography.fontSize.xs,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  statusBadge: {
    padding: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 10,
    fontSize: typography.fontSize.xs,
    alignSelf: 'flex-start',
    marginLeft: spacing.sm,
  },
  statusMild: {
    backgroundColor: colorScheme.info,
    color: colorScheme.textInverted,
  },
  statusModerate: {
    backgroundColor: colorScheme.warning,
    color: colorScheme.textInverted,
  },
  statusSevere: {
    backgroundColor: colorScheme.error,
    color: colorScheme.textInverted,
  },
  statusResolved: {
    backgroundColor: colorScheme.success,
    color: colorScheme.textInverted,
  },
});
