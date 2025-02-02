import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  tableTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  subTitle: {
    fontSize: 10,
    color: '#0066cc',
    marginBottom: 8,
    fontFamily: 'Helvetica',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
    minHeight: 25,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
    fontFamily: 'Helvetica-Bold',
  },
  indexCell: {
    width: '5%',
    padding: 4,
    fontSize: 9,
    borderRight: 1,
    borderColor: '#000',
    fontFamily: 'Helvetica',
  },
  cell: {
    flex: 1,
    padding: 4,
    fontSize: 9,
    borderRight: 1,
    borderColor: '#000',
    fontFamily: 'Helvetica',
  },
  classificationCell: {
    width: '15%',
    padding: 4,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
});