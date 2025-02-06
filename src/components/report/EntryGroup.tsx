
import { Text, View } from '@react-pdf/renderer';
import { styles } from './reportStyles';

interface EntryGroupProps {
  label: string;
  value: string;
}

export const EntryGroup = ({ label, value }: EntryGroupProps) => (
  <View style={{ ...styles.compactGroup, marginBottom: 2 }}>
    <Text style={{ ...styles.boldLabel, fontSize: 9 }}>{label}: </Text>
    <Text style={{ ...styles.normalText, fontSize: 9 }}>{value}</Text>
  </View>
);
