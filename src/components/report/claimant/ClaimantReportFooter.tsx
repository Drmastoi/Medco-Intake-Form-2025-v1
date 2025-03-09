
import { Text } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/dateUtils';
import { claimantReportStyles as styles } from '../pdf/styles/claimantReportStyles';

interface ClaimantReportFooterProps {
  formData: any;
}

export const ClaimantReportFooter = ({ formData }: ClaimantReportFooterProps) => {
  return (
    <>
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
      <Text style={styles.footer} fixed>
        {formData.fullName || 'Anonymous'} - Summary Report
      </Text>
    </>
  );
};
