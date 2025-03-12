import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 150,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  value: {
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  reportFooter: {
    fontSize: 10,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  summaryBox: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#333333',
    fontFamily: 'Helvetica',
  },
});
