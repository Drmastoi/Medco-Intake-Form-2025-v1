
import { StyleSheet } from '@react-pdf/renderer';
import { layoutStyles } from './layoutStyles';
import { headerFooterStyles } from './headerFooterStyles';
import { textStyles } from './textStyles';
import { tableStyles } from './tableStyles';
import { badgeStyles } from './badgeStyles';
import { injuryStyles } from './injuryStyles';

// Combine all styles into one object for easy access
export const pdfStyles = StyleSheet.create({
  // Layout styles
  page: layoutStyles.page,
  section: layoutStyles.section,
  subsection: layoutStyles.subsection,
  twoColumns: layoutStyles.twoColumns,
  column: layoutStyles.column,
  divider: layoutStyles.divider,
  pageBreak: layoutStyles.pageBreak,
  
  // Header & Footer styles
  header: headerFooterStyles.header,
  footer: headerFooterStyles.footer,
  
  // Text styles
  sectionHeader: textStyles.sectionHeader,
  fieldRow: textStyles.fieldRow,
  fieldColumn: textStyles.fieldColumn,
  fieldLabel: textStyles.fieldLabel,
  fieldValue: textStyles.fieldValue,
  disclaimerText: textStyles.disclaimerText,
  summaryText: textStyles.summaryText,
  conclusionText: textStyles.conclusionText,
  highlightBox: textStyles.highlightBox,
  
  // Table styles
  tableContainer: tableStyles.tableContainer,
  tableHeader: tableStyles.tableHeader,
  tableHeaderCell: tableStyles.tableHeaderCell,
  tableRow: tableStyles.tableRow,
  tableRowAlt: tableStyles.tableRowAlt,
  tableCell: tableStyles.tableCell,
  
  // Badge styles
  badge: badgeStyles.badge,
  statusBadge: badgeStyles.statusBadge,
  statusMild: badgeStyles.statusMild,
  statusModerate: badgeStyles.statusModerate,
  statusSevere: badgeStyles.statusSevere,
  statusResolved: badgeStyles.statusResolved,
  
  // Injury styles
  injuryHeader: injuryStyles.injuryHeader,
  injuryTable: injuryStyles.injuryTable,
  injuryRow: injuryStyles.injuryRow,
  injuryLabel: injuryStyles.injuryLabel,
  injuryValue: injuryStyles.injuryValue,
  injuriesSectionTitle: injuryStyles.injuriesSectionTitle,
});
