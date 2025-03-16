
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const injuryStyles = StyleSheet.create({
  injurySection: {
    marginBottom: 15,
    border: `1px solid ${colorScheme.borderColor}`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  injuryHeader: {
    backgroundColor: colorScheme.primary,
    color: colorScheme.textLight,
    padding: 8,
    marginBottom: 5,
    borderRadius: 4,
    fontSize: 11,
  },
  injuryTable: {
    marginBottom: 10,
  },
  injuryRow: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.borderColor,
    paddingBottom: 2,
  },
  injuryLabel: {
    width: '35%',
    fontSize: 9,
    fontWeight: 'bold',
    paddingRight: 5,
    color: colorScheme.textSecondary,
  },
  injuryValue: {
    width: '65%',
    fontSize: 9,
  },
  severityContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 8,
  },
  severityBox: {
    width: 15,
    height: 15,
    margin: 2,
    borderWidth: 1,
    borderColor: colorScheme.borderColor,
    backgroundColor: '#f3f4f6', // Use direct color instead of colorScheme.altBg
  },
  severityBoxActive: {
    width: 15,
    height: 15,
    margin: 2,
    borderWidth: 1,
    borderColor: colorScheme.primary,
    backgroundColor: colorScheme.primary,
  },
  injuryContainer: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: colorScheme.borderColor,
    borderRadius: 4,
  },
  injuryContent: {
    padding: 8,
  },
  injurySectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colorScheme.textDark,
  },
  injuryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colorScheme.textLight,
  }
});
