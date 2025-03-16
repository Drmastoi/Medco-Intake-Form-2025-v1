
import { Text, View } from '@react-pdf/renderer';

interface ConcludingStatementProps {
  styles: any;
}

export const ConcludingStatement = ({ styles }: ConcludingStatementProps) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.fieldValue}>
        There were no other injuries / symptoms which were stated in the instructions other than those listed in the
        medical report suffered by the claimant as told to me during the examination after direct questioning.
      </Text>
    </View>
  );
};
