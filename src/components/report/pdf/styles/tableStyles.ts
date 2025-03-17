
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';
import { spacing } from './spacing';
import { typography } from './typography';

export const tableStyles = StyleSheet.create({
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
});
