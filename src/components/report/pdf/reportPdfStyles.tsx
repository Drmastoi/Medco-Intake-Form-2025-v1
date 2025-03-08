
import { StyleSheet } from '@react-pdf/renderer';
import { styles as importedStyles } from '../reportStyles';

// Create local styles extending the imported styles
export const pdfStyles = StyleSheet.create({
  ...importedStyles,
  // Additional styles needed for PDF components
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  signatureSection: {
    marginTop: 20,
    borderTop: 1,
    paddingTop: 10,
  },
  signatureText: {
    fontSize: 10,
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    fontSize: 6,
    color: '#666666',
    fontFamily: 'Helvetica',
  },
  sectionHeader: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 8,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  fieldColumn: {
    flex: 1,
    marginRight: 10,
  },
  fieldLabel: {
    fontSize: 10,
    marginBottom: 3,
    fontFamily: 'Helvetica',
  },
  fieldValue: {
    fontSize: 10,
    padding: 5,
    border: '1px solid #CCCCCC',
    minHeight: 20,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  subsection: {
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid #000000',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid #CCCCCC',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  tableContainer: {
    border: '1px solid #000000',
    marginBottom: 15,
  },
  grayBackground: {
    backgroundColor: '#EEEEEE',
    padding: 8,
  },
});
