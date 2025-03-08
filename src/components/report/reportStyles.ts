
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  compactGroup: {
    flexDirection: 'row',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  indentedGroup: {
    marginLeft: 12,
    marginTop: 4,
  },
  boldLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    marginRight: 4,
  },
  normalText: {
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  mainTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    marginBottom: 8,
    color: '#333333',
  },
  sectionGap: {
    marginTop: 8,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableTitle: {
    margin: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableRow: { 
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    alignItems: 'stretch',
    minHeight: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
  },
  indexCell: {
    width: '4%',
    borderRightColor: '#000',
    borderRightWidth: 1,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 4,
    paddingBottom: 4,
  },
  cell: {
    width: '12%',
    borderRightColor: '#000',
    borderRightWidth: 1,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 4,
    paddingBottom: 4,
    display: 'flex',
    flexWrap: 'wrap',
  },
  classificationCell: {
    width: '24%',
    borderRightColor: '#000',
    borderRightWidth: 1,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 4,
    paddingBottom: 4,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  // New styles for the formal medical report
  blackHeader: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 6,
    marginBottom: 8,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottom: '1px solid #CCCCCC',
  },
  labelCell: {
    width: '30%',
    padding: 4,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  valueCell: {
    width: '70%',
    padding: 4,
    fontSize: 10,
    fontFamily: 'Helvetica',
    borderLeft: '1px solid #CCCCCC',
  },
  grayBackground: {
    backgroundColor: '#F2F2F2',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    marginTop: 10,
  }
});
