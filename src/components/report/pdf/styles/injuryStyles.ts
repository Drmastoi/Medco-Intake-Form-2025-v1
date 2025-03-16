
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';
import { spacing } from './spacing';
import { typography } from './typography';

export const injuryStyles = StyleSheet.create({
  injuryHeader: {
    backgroundColor: colorScheme.primary,
    color: colorScheme.textInverted,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: 3,
    fontSize: typography.fontSize.md,
  },
  injuryTable: {
    marginBottom: spacing.xl,
  },
  injuryRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderLight,
    paddingBottom: spacing.sm,
  },
  injuryLabel: {
    width: '30%',
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
    color: colorScheme.textSecondary,
  },
  injuryValue: {
    width: '70%',
    fontSize: typography.fontSize.sm,
  },
  injuriesSectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    color: colorScheme.primary,
  },
});
