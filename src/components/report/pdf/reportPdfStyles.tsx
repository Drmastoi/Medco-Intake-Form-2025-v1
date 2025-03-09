
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
  reportHeader: {
    marginBottom: 14,
    borderBottom: '1.5px solid #444444',
    paddingBottom: 8,
  },
  reportTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  reportSubtitle: {
    fontSize: 10,
    textAlign: 'center',
    color: '#444444',
    marginBottom: 4,
  },
  singleColumnContent: {
    flexDirection: 'column',
    flexGrow: 1,
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
    marginBottom: 6,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
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
  grayBackground: {
    backgroundColor: '#F5F5F5',
    padding: 8,
  },
});
