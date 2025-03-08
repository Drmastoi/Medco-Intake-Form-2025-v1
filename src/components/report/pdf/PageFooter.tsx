
import { Text, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/dateUtils';

const styles = StyleSheet.create({
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    fontSize: 6,
    color: '#666666',
    fontFamily: 'Helvetica',
  },
});

export const PageFooter = ({ name, formData }: { name: string; formData: any }) => (
  <>
    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
    <Text style={styles.footer} fixed>
      {name || 'Anonymous'} report dated {formData.dateOfReport ? formatDate(formData.dateOfReport) : formatDate(new Date().toISOString())} | Medical Report | CID {Math.floor(Math.random() * 1000000)}
    </Text>
  </>
);
