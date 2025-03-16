
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';
import { spacing } from './spacing';
import { typography } from './typography';

export const textStyles = StyleSheet.create({
  sectionHeader: {
    borderBottom: `2px solid ${colorScheme.primary}`,
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colorScheme.primary,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: spacing.rowGap,
  },
  fieldColumn: {
    flex: 1,
    marginRight: spacing.columnGap,
  },
  fieldLabel: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
    color: colorScheme.textSecondary,
  },
  fieldValue: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  disclaimerText: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.md,
    fontStyle: 'italic',
    color: colorScheme.textSecondary,
  },
  summaryText: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.md,
    fontStyle: 'italic',
    backgroundColor: colorScheme.altSectionBg,
    padding: spacing.sm,
    borderRadius: 3,
  },
  conclusionText: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.md,
    fontStyle: 'italic',
    color: colorScheme.textSecondary,
  },
  highlightBox: {
    backgroundColor: colorScheme.altSectionBg,
    padding: spacing.md,
    borderRadius: 3,
    marginBottom: spacing.md,
    borderLeft: `4px solid ${colorScheme.accent}`,
  },
});
