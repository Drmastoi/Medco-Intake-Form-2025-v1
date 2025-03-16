
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'center',
    paddingTop: 10,
    borderTop: '1px solid #ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#555',
  },
  pageNumber: {
    fontSize: 8,
    color: '#555',
  },
});

interface PDFFooterProps {
  pageNumber: number;
  claimantName: string;
  today: string;
}

const PDFFooter = ({ pageNumber, claimantName, today }: PDFFooterProps) => (
  <View style={styles.footer} fixed>
    <Text>{claimantName}</Text>
    <Text style={styles.pageNumber}>Page {pageNumber}</Text>
    <Text>{today}</Text>
  </View>
);

export default PDFFooter;
