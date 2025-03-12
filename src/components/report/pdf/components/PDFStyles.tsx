
import { StyleSheet } from '@react-pdf/renderer';

// Define styles for reuse across PDF components
export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#222222',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 8,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 12,
  },
  subheader: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    fontSize: 11,
    borderBottom: '1 solid #CCCCCC',
    paddingBottom: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: 170,
  },
  value: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    borderTop: '1 solid #CCCCCC',
    paddingTop: 5,
  },
});
