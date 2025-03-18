
import React from 'react';
import { Text, View } from '@react-pdf/renderer';

export interface PDFFooterProps {
  claimantName: string;
  pageLabel?: string;
  currentDate?: string;
  pageNumber?: number;
  today?: string;
}

const PDFFooter: React.FC<PDFFooterProps> = ({ 
  claimantName, 
  pageLabel, 
  currentDate, 
  pageNumber,
  today
}) => {
  // Use either pageLabel or pageNumber to show page information
  const pageText = pageLabel || (pageNumber ? `Page ${pageNumber}` : '');
  // Use either currentDate or today
  const dateText = currentDate || today || new Date().toLocaleDateString();

  const footerStyles = {
    container: {
      position: 'absolute' as const,
      bottom: 30,
      left: 40,
      right: 40,
      textAlign: 'center' as const,
      borderTop: '1px solid #aaaaaa',
      paddingTop: 5,
      fontSize: 8,
      color: '#555555',
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
    },
    text: {
      fontSize: 8,
    }
  };

  return (
    <View style={footerStyles.container} fixed>
      <Text style={footerStyles.text}>
        {claimantName} - Medical Report
      </Text>
      <Text style={footerStyles.text}>
        {pageText}
      </Text>
      <Text style={footerStyles.text}>
        {dateText}
      </Text>
    </View>
  );
};

export default PDFFooter;
