
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { colorScheme } from '../styles/colorScheme';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.pageMargin,
    right: spacing.pageMargin,
    textAlign: 'center',
    paddingTop: spacing.md,
    borderTop: `1px solid ${colorScheme.borderLight}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: typography.fontSize.xs,
    color: colorScheme.textLight,
  },
  pageNumber: {
    fontSize: typography.fontSize.xs,
    color: colorScheme.textSecondary,
  },
  confidential: {
    fontSize: typography.fontSize.xs,
    fontStyle: 'italic',
    color: colorScheme.textLight,
  },
  logo: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colorScheme.primary,
  },
});

interface PDFFooterProps {
  pageNumber: number;
  claimantName: string;
  today: string;
}

const PDFFooter = ({ pageNumber, claimantName, today }: PDFFooterProps) => (
  <View style={styles.footer} fixed>
    <View>
      <Text style={styles.confidential}>CONFIDENTIAL</Text>
    </View>
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.pageNumber}>Page {pageNumber}</Text>
      <Text>{claimantName} | {today}</Text>
    </View>
    <View>
      <Text style={styles.logo}>MedLegal Report</Text>
    </View>
  </View>
);

export default PDFFooter;
