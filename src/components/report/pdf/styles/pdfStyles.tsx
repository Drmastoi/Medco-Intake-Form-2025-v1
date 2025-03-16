
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';
import { typography } from './typography';
import { spacing } from './spacing';

// Create styles that will be shared across all PDF components
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colorScheme.pageBg,
    padding: spacing.pageMargin,
    paddingBottom: spacing.pageMargin * 3, // Add padding at the bottom for the footer
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.base,
    color: colorScheme.textPrimary,
  },
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
  section: {
    margin: spacing.md,
    padding: spacing.contentPadding,
    backgroundColor: colorScheme.sectionBg,
    borderRadius: 3,
    border: `1px solid ${colorScheme.borderLight}`,
    marginBottom: spacing.sectionGap,
  },
  sectionHeader: {
    borderBottom: `2px solid ${colorScheme.primary}`,
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colorScheme.primary,
  },
  subsection: {
    marginBottom: spacing.xl,
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
  pageBreak: {
    height: 0,
    pageBreakAfter: 'always',
  },
  summaryText: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.md,
    fontStyle: 'italic',
    backgroundColor: colorScheme.altSectionBg,
    padding: spacing.sm,
    borderRadius: 3,
  },
  tableContainer: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colorScheme.tableBorder,
    borderStyle: 'solid',
    borderRadius: 2,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.tableBorder,
    backgroundColor: colorScheme.tableHeaderBg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tableHeaderCell: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'left',
    color: colorScheme.textSecondary,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tableRowAlt: {
    backgroundColor: colorScheme.tableRowBgAlt,
  },
  tableCell: {
    fontSize: typography.fontSize.sm,
    textAlign: 'left',
  },
  // New styles for improved layout
  highlightBox: {
    backgroundColor: colorScheme.altSectionBg,
    padding: spacing.md,
    borderRadius: 3,
    marginBottom: spacing.md,
    borderLeft: `4px solid ${colorScheme.accent}`,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderLight,
    marginVertical: spacing.md,
  },
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
  // This will create a two-column layout
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  // Improved footer
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
  // Status indicators
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
