
import { StyleSheet } from '@react-pdf/renderer';

// Styles for tables in the report
export const tableStyles = StyleSheet.create({
  tableHeader: {
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid #000000',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 4,
    borderBottom: '1px solid #CCCCCC',
    minHeight: 28,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    fontFamily: 'Helvetica',
    paddingHorizontal: 2,
  },
  tableContainer: {
    border: '1px solid #000000',
    marginBottom: 15,
  },
});
