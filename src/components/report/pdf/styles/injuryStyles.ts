
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const injuryStyles = StyleSheet.create({
  injurySection: {
    marginBottom: 15,
    border: `1px solid ${colorScheme.borderColor}`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  injuryHeader: {
    backgroundColor: colorScheme.primary,
    color: 'white',
    padding: 5,
    marginBottom: 5,
    borderRadius: 3,
    fontSize: 11,
  },
  injuryHeaderText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  injuryTable: {
    marginBottom: 10,
  },
  injuryRow: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    paddingBottom: 3, 
  },
  injuryCol1: {
    width: '30%',
    paddingRight: 10,
  },
  injuryCol2: {
    width: '70%',
  },
  injuryContent: {
    padding: 8,
  },
  prognosisSection: {
    marginTop: 10,
    padding: 5,
    backgroundColor: colorScheme.altBg,
    borderRadius: 3,
  },
  prognosisTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 3,
  },
  severityContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  severityBox: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 3,
    height: 15,
    borderWidth: 1,
    borderColor: colorScheme.borderColor,
  },
  severityBoxActive: {
    backgroundColor: colorScheme.accent,
  }
});
