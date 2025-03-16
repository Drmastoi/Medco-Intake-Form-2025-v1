
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { textStyles } from '../styles/textStyles';
import { headerFooterStyles } from '../styles/headerFooterStyles';

export interface PDFFooterProps {
  pageNumber: number;
  claimantName: string;
  date?: string;
}

const PDFFooter = ({ pageNumber, claimantName, date }: PDFFooterProps) => {
  const formattedDate = date || new Date().toISOString().split('T')[0];
  
  return (
    <View style={headerFooterStyles.footer} fixed>
      <View style={headerFooterStyles.footerContent}>
        <Text style={textStyles.footerText}>
          {claimantName} | {formattedDate} | Page {pageNumber}
        </Text>
      </View>
    </View>
  );
};

export default PDFFooter;
