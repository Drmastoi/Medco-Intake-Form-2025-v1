
import { Text, View } from '@react-pdf/renderer';
import { formatDate } from '../../../utils/dateUtils';
import { claimantReportStyles as styles } from '../pdf/styles/claimantReportStyles';

interface DeclarationSectionProps {
  formData: any;
  signature?: string;
  signatureDate?: string;
}

export const DeclarationSection = ({ formData, signature, signatureDate }: DeclarationSectionProps) => {
  return (
    <View>
      <Text style={styles.subtitle}>Declaration</Text>
      <Text style={styles.text}>
        I confirm that all information provided in this report is true and accurate to the best of my knowledge.
      </Text>
      <Text style={styles.text}>
        Report Date: {formData.dateOfReport ? formatDate(formData.dateOfReport) : formatDate(new Date().toISOString())}
      </Text>
      
      {/* Signature Section */}
      <View style={styles.signatureSection}>
        <Text style={styles.signatureText}>Claimant Signature:</Text>
        {signature ? (
          <Text style={styles.signatureText}>{signature}</Text>
        ) : (
          <View style={styles.signatureLine} />
        )}
        
        <Text style={styles.signatureText}>
          Date and Time: {signatureDate ? formatDate(signatureDate) + ' ' + new Date(signatureDate).toLocaleTimeString() : '_________________'}
        </Text>
        
        <Text style={styles.noteText}>
          By signing above, I confirm my agreement with the submission of this report.
        </Text>
      </View>
    </View>
  );
};
