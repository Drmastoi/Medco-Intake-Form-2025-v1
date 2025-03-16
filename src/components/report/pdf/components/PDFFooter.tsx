
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';

interface PDFFooterProps {
  pageNumber: number;
  claimantName: string;
  today: string;
}

const PDFFooter: React.FC<PDFFooterProps> = ({ pageNumber, claimantName, today }) => {
  return (
    <View fixed style={pdfStyles.footer}>
      <Text>
        Medical Report - {claimantName} - Page {pageNumber} - Generated on {today}
      </Text>
    </View>
  );
};

export default PDFFooter;
