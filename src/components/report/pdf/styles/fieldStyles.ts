
import { StyleSheet } from '@react-pdf/renderer';

// Styles for form fields, inputs and field layout
export const fieldStyles = StyleSheet.create({
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fieldColumn: {
    flex: 1,
    marginRight: 4,
  },
  fieldLabel: {
    fontSize: 9,
    marginBottom: 2,
    fontFamily: 'Helvetica',
    color: '#555555',
  },
  fieldValue: {
    fontSize: 10,
    padding: 4,
    border: '1px solid #CCCCCC',
    minHeight: 18,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  subsection: {
    marginTop: 5,
    marginBottom: 10,
  },
});
