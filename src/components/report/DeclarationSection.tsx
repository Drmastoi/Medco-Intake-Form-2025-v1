
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  signature: {
    marginTop: 20,
    fontFamily: 'Helvetica',
  }
});

export const DeclarationSection = () => (
  <View style={styles.section}>
    <Text style={styles.heading}>G.3 Statement of Truth</Text>
    <Text style={styles.text}>
      I understand that my overriding duty is to the court, both in preparing reports and in giving oral evidence. I
      have complied and will continue to comply with that duty.
    </Text>
    <Text style={styles.text}>
      I am aware of the requirements of Part 35 and practice direction 35, the protocol for instructing experts to
      give evidence in civil claims and the practice direction on pre-action conduct.
    </Text>
    <Text style={styles.text}>
      I have set out in my report that I understand from those instructing me to be the questions in respect of
      which my opinions as an expert are required.
    </Text>
    <Text style={styles.text}>
      I have done my best, in preparing this report, to be accurate and complete. I have mentioned all matters,
      which I regard as relevant to the opinions I have expressed. All of the matters on which I have expressed
      an opinion lie within my field of expertise.
    </Text>
    <Text style={styles.text}>
      I have drawn to the attention of the court all matters, of which I am aware, which might adversely affect my
      opinion. Wherever I have no personal knowledge, I have indicated the source if factual information.
    </Text>
    <Text style={styles.text}>
      I have not included anything in this report, which has been suggested to me by anyone, including the
      lawyers instructing me, without forming my own independent view of the matter.
    </Text>
    <Text style={styles.text}>
      Where, in my view, there is a range of reasonable opinion, I have indicated the extent of that range in the
      report.
    </Text>
    <Text style={styles.text}>
      At the time of signing the report I consider it to be complete and accurate. I will notify those instructing me
      if, for any reason, I subsequently consider that the report requires any correction or qualification.
    </Text>
    <Text style={styles.text}>
      I understand that this report will be evidence that I will give under oath, subject to any correction or
      qualification I may make before swearing to its veracity.
    </Text>
    <Text style={styles.text}>
      I have included in this report a summary of my instructions.
    </Text>
    <Text style={styles.text}>
      I have not entered into any agreement where the amount of payment of my fee is in any way dependant
      on the outcome of the case
    </Text>
    <Text style={styles.text}>
      I confirm that I have made clear which facts and matters referred to in this report are within my own
      knowledge and which are not. Those that are within my own knowledge I confirm to be true. The opinions I
      have expressed represent my true and complete professional opinions on the matters to which they refer.
    </Text>
    <Text style={styles.text}>
      I understand that proceedings for contempt of court may be brought against anyone who makes, or
      causes to be made, a false statement in a document verified by a statement of truth without an honest
      belief in its truth.
    </Text>

    <View style={styles.signature}>
      <Text style={styles.text}>Signature: _______________________</Text>
      <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
    </View>
  </View>
);
