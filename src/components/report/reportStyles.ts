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
  }
});