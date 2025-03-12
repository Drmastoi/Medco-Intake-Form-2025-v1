
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

/**
 * Displays the page footer with page numbers
 */
export const PageFooter: React.FC = () => {
  return (
    <>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} fixed />
    </>
  );
};

/**
 * Displays the report footer text
 */
export const ReportFooter: React.FC = () => {
  return (
    <Text style={styles.footerText}>
      This report was generated based on the information provided in the Personal Injury Assessment Questionnaire.
    </Text>
  );
};
