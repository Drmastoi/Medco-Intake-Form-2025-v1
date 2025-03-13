
import { StyleSheet } from '@react-pdf/renderer';

// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    backgroundColor: '#000000',
    color: 'white',
    fontSize: 10,
    padding: 5,
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  contentSection: {
    backgroundColor: '#f5f5f5',
    padding: 5,
    marginBottom: 5,
    borderRadius: 2, // Explicitly set border radius to a number
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    fontSize: 10,
    marginRight: 5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    width: '35%',
  },
  value: {
    fontSize: 10,
    flex: 1,
  },
  summaryText: {
    fontSize: 10,
    textAlign: 'justify',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
  },
  reportIdentifier: {
    fontSize: 8,
    color: 'grey',
    marginTop: 10,
    textAlign: 'center',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: 'grey',
    borderTop: '1px solid #ccc',
    paddingTop: 5,
  },
  injuryRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingVertical: 3,
  },
  injuryLabel: {
    fontSize: 10,
    width: '30%',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  injuryDetails: {
    fontSize: 10,
    width: '70%',
  },
  injuryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  injurySection: {
    marginBottom: 10,
  },
  summaryTable: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 3,
  },
  summaryColumn: {
    fontSize: 9,
    padding: 3,
  },
  summaryHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 3,
    fontFamily: 'Helvetica-Bold',
  },
  declarationText: {
    fontSize: 10,
    marginTop: 20,
    textAlign: 'justify',
    lineHeight: 1.4,
  },
  signatureSection: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    width: '60%',
  },
  signatureText: {
    fontSize: 10,
    marginTop: 5,
  },
  clinicalSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  clinicalSubsection: {
    marginTop: 5,
  }
});
