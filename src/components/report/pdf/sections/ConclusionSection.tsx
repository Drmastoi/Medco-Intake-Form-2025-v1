
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface ConclusionSectionProps {
  styles: any;
  formData?: ReportData;
}

export const ConclusionSection = ({ styles, formData }: ConclusionSectionProps) => {
  // Get today's date
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 16 - Conclusion and Declaration</Text>
      
      {/* Case Classification Content */}
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.fieldLabel}>16.1 Case Classification</Text>
        <Text style={styles.fieldValue}>Seatbelts: Was the claimant wearing a seat belt? Yes</Text>
        <Text style={styles.fieldValue}>Soft-tissue Injury Claim: Yes</Text>
        <Text style={styles.fieldValue}>Was the Claimant an occupant of a motor vehicle? Yes</Text>
        <Text style={styles.fieldValue}>Is the client's most significant injury a soft-tissue injury? Yes</Text>
        <Text style={styles.fieldValue}>Is this the first report in relation to the client's injuries from the index accident? Yes</Text>
        <Text style={styles.fieldValue}>{"\n"}I was able to obtain a good history. Claimant's injuries and recovery period were entirely consistent with the account of the accident. The treatment provided for the claimant has been appropriate. The problems reported in home life are consistent and reasonable. In my opinion, the time taken off work by the claimant is reasonable. Claimant is currently fit for working.</Text>
      </View>
      
      {/* Declaration Content */}
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>16.2 Expert Declaration</Text>
        <Text style={styles.fieldValue}>
          I confirm that I have made clear which facts and matters referred to in this report are within my own 
          knowledge and which are not. Those that are within my own knowledge I confirm to be true. The 
          opinions I have expressed represent my true and complete professional opinions on the matters to 
          which they refer.
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldValue}>
          I understand that proceedings for contempt of court may be brought against anyone who makes, or 
          causes to be made, a false statement in a document verified by a statement of truth without an 
          honest belief in its truth.
        </Text>
      </View>
      
      <View style={{ marginBottom: 10, marginTop: 20 }}>
        <Text style={styles.fieldValue}>
          I confirm that this report has been prepared in accordance with the guidance set out in the 
          Pre-Action Protocol for Low Value Personal Injury Claims and the Civil Procedure Rules.
        </Text>
      </View>
      
      <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '60%' }}>
          <Text style={styles.fieldLabel}>Signature:</Text>
          <Text style={styles.fieldValue}>Dr Awais Iqbal</Text>
        </View>
        <View style={{ width: '30%' }}>
          <Text style={styles.fieldLabel}>Date:</Text>
          <Text style={styles.fieldValue}>{today}</Text>
        </View>
      </View>
    </View>
  );
};
