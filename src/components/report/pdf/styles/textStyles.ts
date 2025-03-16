
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const textStyles = StyleSheet.create({
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colorScheme.textDark,
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 12,
    color: colorScheme.textSecondary,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colorScheme.textDark,
    marginBottom: 8,
  },
  regularText: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  normalText: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  smallText: {
    fontSize: 8,
    color: colorScheme.textSecondary,
    marginBottom: 2,
  },
  footerText: {
    fontSize: 8,
    color: colorScheme.textSecondary,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: colorScheme.textSecondary,
  },
  // Add missing text styles
  fieldLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colorScheme.textSecondary,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 10,
    color: colorScheme.textDark,
    marginBottom: 5,
  },
  disclaimerText: {
    fontSize: 8,
    color: colorScheme.textSecondary,
    fontStyle: 'italic',
    marginTop: 5,
  },
  summaryText: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.5,
  },
  conclusionText: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  }
});
