
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 25, // Reduced padding
    fontSize: 10, // Smaller base font size
    fontFamily: 'Helvetica',
    lineHeight: 1.3, // Tighter line height
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: colorScheme.primary,
    padding: 8, // Reduced padding
    marginBottom: 15, // Reduced margin
    borderRadius: 3
  },
  section: {
    marginBottom: 12 // Reduced margin
  },
  subsection: {
    marginBottom: 8, // Reduced margin
    borderBottom: `1px solid ${colorScheme.borderColor}`,
    paddingBottom: 8 // Reduced padding
  },
  sectionHeader: {
    fontSize: 12, // Reduced font size
    fontWeight: 'bold',
    marginBottom: 8, // Reduced margin
    color: colorScheme.primary,
    fontFamily: 'Helvetica-Bold'
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 4 // Reduced margin
  },
  fieldColumn: {
    width: '50%',
    paddingRight: 5
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 9, // Reduced font size
    marginBottom: 1, // Reduced margin
    fontFamily: 'Helvetica-Bold'
  },
  fieldValue: {
    fontSize: 9, // Reduced font size
    marginBottom: 4 // Reduced margin
  },
  footer: {
    position: 'absolute',
    bottom: 20, // Moved up
    left: 25,
    right: 25,
    fontSize: 8, // Smaller font
    textAlign: 'center',
    color: colorScheme.textLight,
    borderTop: `1px solid ${colorScheme.borderColor}`,
    paddingTop: 4 // Reduced padding
  },
  inlineLabel: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold'
  },
  // Add missing styles for the two-column layout
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8 // Reduced margin
  },
  column: {
    width: '48%'
  },
  // Add additional styles for status badges
  statusBadge: {
    padding: 2, // Reduced padding
    paddingHorizontal: 6, // Reduced padding
    borderRadius: 8, // Smaller radius
    fontSize: 7, // Smaller font
    alignSelf: 'flex-start',
    marginLeft: 4 // Reduced margin
  },
  statusMild: {
    backgroundColor: colorScheme.info,
    color: colorScheme.textInverted
  },
  statusModerate: {
    backgroundColor: colorScheme.warning,
    color: colorScheme.textInverted
  },
  statusSevere: {
    backgroundColor: colorScheme.error,
    color: colorScheme.textInverted
  },
  statusResolved: {
    backgroundColor: colorScheme.success,
    color: colorScheme.textInverted
  },
  // New compact styles
  compactTable: {
    borderSpacing: 0,
    width: '100%',
    marginBottom: 8
  },
  compactRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    paddingVertical: 3 // Reduced padding
  },
  compactCell: {
    fontSize: 9,
    padding: 3 // Reduced padding
  },
  compactHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: colorScheme.tableHeaderBg,
    padding: 4 // Reduced padding
  }
});
