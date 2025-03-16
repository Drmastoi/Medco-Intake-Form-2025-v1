
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
  }
});
