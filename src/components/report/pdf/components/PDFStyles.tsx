
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Helvetica-Bold',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '30%',
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  value: {
    width: '70%',
    fontSize: 10,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  summaryBox: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  summaryText: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  reportIdentifier: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    fontSize: 8,
    color: '#666',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 10,
  },
  footerLine: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    borderBottom: '1px solid #ccc',
  },
  footerText: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    fontSize: 8,
    color: '#666',
  },
  // Accident table styles
  accidentTable: {
    marginTop: 8,
  },
  accidentRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  accidentCell: {
    marginRight: 10,
    marginBottom: 8,
  },
  accidentLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  accidentValue: {
    fontSize: 10,
  },
  accidentSubtitle: {
    fontSize: 12,
    marginBottom: 8,
    fontStyle: 'italic',
  },
});
