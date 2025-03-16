
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const textStyles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorScheme.textDark,
    marginBottom: 2,
  },
  subHeaderText: {
    fontSize: 12,
    color: colorScheme.textSecondary,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colorScheme.textDark,
    marginBottom: 5,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colorScheme.textDark,
    marginBottom: 3,
  },
  regularText: {
    fontSize: 10,
    color: colorScheme.textDark,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colorScheme.textDark,
  },
  smallText: {
    fontSize: 8,
    color: colorScheme.textSecondary,
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colorScheme.textDark,
    marginRight: 5,
  },
  valueText: {
    fontSize: 10,
    color: colorScheme.textDark,
  },
  footerText: {
    fontSize: 8,
    color: colorScheme.textSecondary,
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: colorScheme.textSecondary,
  },
});
