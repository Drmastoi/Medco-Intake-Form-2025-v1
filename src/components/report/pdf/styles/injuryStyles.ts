
import { StyleSheet } from '@react-pdf/renderer';

// Styles for injuries section
export const injuryStyles = StyleSheet.create({
  injuriesSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  injuryTypeHeader: {
    backgroundColor: '#E5E5E5',
    padding: 5,
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  injuryTable: {
    width: '100%',
    marginBottom: 15,
  },
  injuryRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 4,
  },
  injuryLabel: {
    width: '30%',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    paddingVertical: 2,
  },
  injuryValue: {
    width: '70%',
    fontSize: 10,
    fontFamily: 'Helvetica',
    paddingVertical: 2,
  },
});
