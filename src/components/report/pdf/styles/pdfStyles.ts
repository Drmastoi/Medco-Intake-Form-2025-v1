
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: colorScheme.primary,
    padding: 10,
    marginBottom: 20,
    borderRadius: 3
  },
  section: {
    marginBottom: 15
  },
  subsection: {
    marginBottom: 10,
    borderBottom: `1px solid ${colorScheme.borderColor}`,
    paddingBottom: 10
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colorScheme.primary,
    fontFamily: 'Helvetica-Bold'
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  fieldColumn: {
    width: '50%',
    paddingRight: 5
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 2,
    fontFamily: 'Helvetica-Bold'
  },
  fieldValue: {
    fontSize: 11,
    marginBottom: 5
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: colorScheme.textLight,
    borderTop: `1px solid ${colorScheme.borderColor}`,
    paddingTop: 5
  },
  inlineLabel: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold'
  }
});
