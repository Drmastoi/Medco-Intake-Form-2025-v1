
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
    textAlign: 'left',
    marginBottom: 30,
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  subheader: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
    fontFamily: 'Helvetica-Bold',
    borderBottom: '1 solid #CCCCCC',
    paddingBottom: 3,
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
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
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
  sectionTitle: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 8,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  subsection: {
    marginBottom: 15,
    paddingLeft: 5,
  },
  infoTable: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  infoRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    width: '100%',
  },
  infoCell: {
    padding: 8,
    fontSize: 10,
    fontFamily: 'Helvetica',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#DDDDDD',
    lineHeight: 1.4,
  },
  rightCell: {
    padding: 8,
    fontSize: 10,
    fontFamily: 'Helvetica',
    flex: 1,
    borderRightWidth: 0,
    lineHeight: 1.4,
  },
  infoHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
  },
  reportIdentifier: {
    fontSize: 9,
    color: '#666666',
    marginTop: 20,
    marginBottom: 5,
  },
  pageIndicator: {
    fontSize: 9,
    textAlign: 'right',
  },
  cellContainer: {
    width: '50%',
  }
});
