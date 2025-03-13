
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 15,
  },
  subsection: {
    marginBottom: 10,
    paddingLeft: 5,
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  subheader: {
    fontSize: 12,
    marginBottom: 6,
    marginTop: 8,
    fontFamily: 'Helvetica-Bold',
    borderBottom: '1 solid #CCCCCC',
    paddingBottom: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 150,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'left',
  },
  value: {
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
  },
  reportFooter: {
    fontSize: 9,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  summaryBox: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 0,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.3,
    color: '#333333',
    fontFamily: 'Helvetica',
  },
  sectionTitle: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 6,
    marginBottom: 0,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  contentSection: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    marginBottom: 15,
  },
  infoTable: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  cellContainer: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  infoHeader: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    padding: 4,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    textAlign: 'left',
  },
  infoCell: {
    padding: 4,
    paddingTop: 3,
    fontSize: 9,
    fontFamily: 'Helvetica',
    lineHeight: 1.2,
  },
  rightCell: {
    padding: 4,
    paddingTop: 3,
    fontSize: 9,
    fontFamily: 'Helvetica',
    lineHeight: 1.2,
  },
  reportIdentifier: {
    fontSize: 8,
    color: '#666666',
    marginTop: 15,
    marginBottom: 5,
  },
  pageIndicator: {
    fontSize: 8,
    textAlign: 'right',
  },
  compactSubsection: {
    marginBottom: 8,
    paddingLeft: 3,
  },
  compactRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  compactLabel: {
    width: 120,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'left',
  },
  compactValue: {
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  compactSectionTitle: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 4,
    marginBottom: 0,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  
  // Accident details section styles
  accidentSubtitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    marginTop: 4
  },
  accidentGrayBox: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    marginBottom: 10,
  },
  accidentSectionHeader: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  accidentTable: {
    marginBottom: 10,
  },
  accidentRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    backgroundColor: '#f5f5f5',
    marginBottom: 1,
  },
  accidentLabel: {
    width: '30%',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
  },
  accidentValue: {
    width: '70%',
    fontSize: 9,
    fontFamily: 'Helvetica',
    paddingLeft: 2,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
  },
  accidentCell: {
    fontSize: 9,
    padding: 4,
    fontFamily: 'Helvetica',
  },
  
  // Injury table styles
  injuryTable: {
    marginTop: 0,
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    minHeight: 22,
    backgroundColor: '#f5f5f5',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    minHeight: 22,
  },
  tableHeaderCell1: {
    width: '6%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tableHeaderCell2: {
    width: '17%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tableHeaderCell3: {
    width: '15%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tableHeaderCell4: {
    width: '22%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tableHeaderCell5: {
    width: '18%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tableHeaderCell6: {
    width: '22%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tableCell1: {
    width: '6%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  tableCell2: {
    width: '17%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  tableCell3: {
    width: '15%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  tableCell4: {
    width: '22%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  tableCell5: {
    width: '18%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  tableCell6: {
    width: '22%',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  tableHeaderText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  tableCellText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
});
