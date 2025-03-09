
import { StyleSheet } from '@react-pdf/renderer';
import { styles as importedStyles } from '../../reportStyles';

// Base styles that are common across different sections
export const baseStyles = StyleSheet.create({
  ...importedStyles,
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
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
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
  grayBackground: {
    backgroundColor: '#F5F5F5',
    padding: 8,
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
  disclaimerText: {
    fontSize: 8,
    marginTop: 3,
    lineHeight: 1.3,
    color: '#444444',
    fontFamily: 'Helvetica',
  },
});
