
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { textStyles } from '../styles/textStyles';
import { headerFooterStyles } from '../styles/headerFooterStyles';

export interface PDFFooterProps {
  pageNumber: number;
  claimantName: string;
  date?: string;
  reportType?: "claimant" | "expert";
  totalPages?: number;
}

const PDFFooter = ({ 
  pageNumber, 
  claimantName, 
  date, 
  reportType = "expert",
  totalPages
}: PDFFooterProps) => {
  const formattedDate = date || new Date().toISOString().split('T')[0];
  const pageInfo = totalPages ? `Page ${pageNumber} of ${totalPages}` : `Page ${pageNumber}`;
  const reportTypeText = reportType === "expert" ? "Expert Report" : "Claimant Report";
  
  return (
    <View style={headerFooterStyles.footer} fixed>
      <View style={headerFooterStyles.footerContent}>
        <Text style={headerFooterStyles.footerText}>
          {claimantName} | {formattedDate}
        </Text>
        <Text style={headerFooterStyles.footerText}>
          {reportTypeText}
        </Text>
        <Text style={headerFooterStyles.footerPageNumber}>
          {pageInfo}
        </Text>
      </View>
    </View>
  );
};

export default PDFFooter;
