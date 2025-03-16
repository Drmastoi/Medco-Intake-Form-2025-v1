
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const tableStyles = StyleSheet.create({
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colorScheme.borderColor,
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    backgroundColor: '#f3f4f6', // Use direct color instead of colorScheme.altBg
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    minHeight: 20,
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f9fafb', // Light background for alternate rows
    minHeight: 20,
  },
  tableCol1: {
    width: '30%',
    paddingRight: 5,
  },
  tableCol2: {
    width: '70%',
  },
  tableCell: {
    fontSize: 9,
    textAlign: 'left',
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
  }
});
