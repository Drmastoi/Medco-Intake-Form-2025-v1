
import { StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from './colorScheme';

export const headerFooterStyles = StyleSheet.create({
  header: {
    backgroundColor: colorScheme.headerBg,
    color: colorScheme.textInverted,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: colorScheme.borderColor,
    color: colorScheme.textSecondary,
  },
  footerContent: {
    padding: 10,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: colorScheme.textSecondary,
  },
  footerPageNumber: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colorScheme.textSecondary,
  }
});
