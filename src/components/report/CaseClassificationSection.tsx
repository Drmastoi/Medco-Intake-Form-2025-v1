import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
  },
});

export const CaseClassificationSection = () => (
  <View style={styles.section}>
    <Text style={styles.heading}>3. CASE CLASSIFICATION AND DECLARATION</Text>
    <Text style={styles.text}>Seatbelts: Was the claimant wearing a seat belt? Yes</Text>
    <Text style={styles.text}>Soft-tissue Injury Claim: Yes</Text>
    <Text style={styles.text}>Was the Claimant an occupant of a motor vehicle? Yes</Text>
    <Text style={styles.text}>Is the client's most significant injury a soft-tissue injury? Yes</Text>
    <Text style={styles.text}>Is this the first report in relation to the client's injuries from the index accident? Yes</Text>
    <Text style={styles.text}>{"\n"}I was able to obtain a good history. Claimant's injuries and recovery period were entirely consistent with the account of the accident. The treatment provided for the claimant has been appropriate. The problems reported in home life are consistent and reasonable. In my opinion, the time taken off work by the claimant is reasonable. Claimant is currently fit working.</Text>
  </View>
);