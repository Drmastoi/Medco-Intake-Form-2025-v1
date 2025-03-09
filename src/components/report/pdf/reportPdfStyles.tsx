
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
    position: 'relative',
  },
  header: {
    marginBottom: 15,
    borderBottom: '1px solid #CCCCCC',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  subheader: {
    fontSize: 10,
    textAlign: 'center',
    color: '#555555',
    marginBottom: 5,
  },
  twoColumnLayout: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
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
  disclaimerText: {
    fontSize: 8,
    marginTop: 3,
    lineHeight: 1.3,
    color: '#444444',
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
    padding: 6,
    marginBottom: 8,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  fieldColumn: {
    flex: 1,
    marginRight: 5,
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
    backgroundColor: '#F5F5F5',
    padding: 8,
  },
});
