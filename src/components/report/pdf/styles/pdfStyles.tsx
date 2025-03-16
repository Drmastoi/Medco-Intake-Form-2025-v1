
import { StyleSheet } from '@react-pdf/renderer';

// Create styles that will be shared across all PDF components
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
    padding: 20,
    paddingBottom: 60, // Add padding at the bottom for the footer
  },
  header: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    border: '1px solid #ddd',
  },
  sectionHeader: {
    borderBottom: '2px solid #000',
    paddingBottom: 5,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  subsection: {
    marginBottom: 15,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fieldColumn: {
    flex: 1,
    marginRight: 10,
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 10,
  },
  disclaimerText: {
    fontSize: 8,
    marginTop: 10,
    fontStyle: 'italic',
  },
  pageBreak: {
    height: 0,
    pageBreakAfter: 'always',
  },
  summaryText: {
    fontSize: 9,
    marginTop: 10,
    fontStyle: 'italic',
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 3,
  },
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  tableCell: {
    fontSize: 9,
    textAlign: 'left',
  },
});
