
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';
import { spacing } from './spacing';
import { typography } from './typography';

export const headerFooterStyles = StyleSheet.create({
  header: {
    backgroundColor: colorScheme.headerBg,
    color: colorScheme.textInverted,
    padding: spacing.md,
    marginBottom: spacing.xl,
    textAlign: 'center',
    borderRadius: 3,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    textAlign: 'center',
    paddingTop: 10,
    borderTop: `1px solid ${colorScheme.borderLight}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: typography.fontSize.xs,
    color: colorScheme.textLight,
  },
});
