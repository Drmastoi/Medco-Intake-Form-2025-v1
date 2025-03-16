
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const layoutStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9', // Use direct color instead of colorScheme.background
    padding: 40,
    paddingBottom: 60, // Extra space for footer
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colorScheme.textDark,
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    border: `1px solid ${colorScheme.borderColor}`,
    marginBottom: 15,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    marginRight: 10,
    flex: 1,
  },
  pageBreak: {
    height: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  // Add missing styles that were referenced in the PDF pages
  sectionContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 4,
    border: `1px solid ${colorScheme.borderColor}`,
    backgroundColor: 'white',
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    marginVertical: 10,
  }
});
