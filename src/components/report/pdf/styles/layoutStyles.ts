
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const layoutStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colorScheme.background,
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
});
