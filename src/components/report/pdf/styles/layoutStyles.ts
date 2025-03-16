
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';
import { spacing } from './spacing';
import { typography } from './typography';

export const layoutStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colorScheme.pageBg,
    padding: spacing.pageMargin,
    paddingBottom: spacing.pageMargin * 3, // Add padding at the bottom for the footer
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.base,
    color: colorScheme.textPrimary,
  },
  section: {
    margin: spacing.md,
    padding: spacing.contentPadding,
    backgroundColor: colorScheme.sectionBg,
    borderRadius: 3,
    border: `1px solid ${colorScheme.borderLight}`,
    marginBottom: spacing.sectionGap,
  },
  subsection: {
    marginBottom: spacing.xl,
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderLight,
    marginVertical: spacing.md,
  },
  pageBreak: {
    height: 0,
    pageBreakAfter: 'always',
  },
});
