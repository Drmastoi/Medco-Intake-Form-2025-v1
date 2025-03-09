
import { StyleSheet } from '@react-pdf/renderer';

// Styles for Road Traffic Accident section
export const rtaStyles = StyleSheet.create({
  rtaTable: {
    width: '100%',
  },
  rtaRow: {
    flexDirection: 'row',
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 4,
  },
  rtaLabel: {
    width: '25%',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
  },
  rtaValue: {
    width: '75%',
    fontSize: 10,
    fontFamily: 'Helvetica',
    paddingRight: 4,
  },
});
