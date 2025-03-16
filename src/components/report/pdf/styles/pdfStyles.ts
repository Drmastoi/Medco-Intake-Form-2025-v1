
import { layoutStyles } from './layoutStyles';
import { textStyles } from './textStyles';
import { tableStyles } from './tableStyles';
import { injuryStyles } from './injuryStyles';

// Combine all styles into one object for easier access
export const pdfStyles = {
  // Layout styles
  ...layoutStyles,
  
  // Section styles
  section: layoutStyles.section,
  subsection: layoutStyles.sectionContainer,
  twoColumns: layoutStyles.twoColumns,
  content: layoutStyles.content,
  divider: layoutStyles.divider,
  
  // Text styles
  ...textStyles,
  
  // Form field styles
  sectionHeader: textStyles.sectionTitle,
  fieldRow: layoutStyles.row,
  fieldColumn: layoutStyles.column,
  fieldLabel: textStyles.fieldLabel,
  fieldValue: textStyles.fieldValue,
  disclaimerText: textStyles.disclaimerText,
  summaryText: textStyles.summaryText,
  conclusionText: textStyles.conclusionText,
  highlightBox: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  
  // Table styles
  ...tableStyles,
  tableRowAlt: tableStyles.tableRowAlt,
  
  // Injury styles
  ...injuryStyles,
  injuryLabel: injuryStyles.injuryLabel,
  injuryValue: injuryStyles.injuryValue,
  injuriesSectionTitle: injuryStyles.injurySectionTitle,
};
