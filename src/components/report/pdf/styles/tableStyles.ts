
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const tableStyles = StyleSheet.create({
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colorScheme.borderColor,
    borderStyle: 'solid',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    backgroundColor: colorScheme.altBg,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: 10,
    color: colorScheme.textDark,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tableCell: {
    fontSize: 9,
    color: colorScheme.textDark,
  },
  tableCol1: {
    width: '30%',
  },
  tableCol2: {
    width: '70%',
  },
  tableCol3: {
    width: '33%',
  },
  tableCol4: {
    width: '25%',
  },
  tableCol5: {
    width: '20%',
  },
  tableLastRow: {
    borderBottomWidth: 0,
  },
});
