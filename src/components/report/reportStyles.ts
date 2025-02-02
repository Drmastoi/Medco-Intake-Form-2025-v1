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
  // Adding the missing table-related styles
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
    alignItems: 'center',
    minHeight: 24,
    fontFamily: 'Helvetica',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  indexCell: {
    width: '5%',
    borderRightColor: '#000',
    borderRightWidth: 1,
    paddingLeft: 4,
  },
  cell: {
    width: '13%',
    borderRightColor: '#000',
    borderRightWidth: 1,
    paddingLeft: 4,
  },
  classificationCell: {
    width: '17%',
    borderRightColor: '#000',
    borderRightWidth: 1,
    paddingLeft: 4,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  }
});