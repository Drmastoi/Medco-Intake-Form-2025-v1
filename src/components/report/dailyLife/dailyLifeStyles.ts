
import { StyleSheet } from '@react-pdf/renderer';

export const dailyLifeStyles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  highlight: {
    fontWeight: 'bold',
  },
  claimantReportSection: {
    marginTop: 10,
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  claimantSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555555',
    textDecoration: 'underline',
  },
  // Styles for InjurySectionDetail
  injuryTypeHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
  },
  injuryTable: {
    marginBottom: 10,
  },
  injuryRow: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 3,
  },
  injuryLabel: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 9,
  },
  injuryValue: {
    width: '70%',
    fontSize: 9,
  },
  injuriesSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
  }
});
