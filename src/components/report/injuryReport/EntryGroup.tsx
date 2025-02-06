
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../reportStyles';

interface EntryGroupProps {
  label: string;
  value: string;
}

export const EntryGroup = ({ label, value }: EntryGroupProps) => (
  <View style={styles.compactGroup}>
    <Text style={styles.boldLabel}>{label}: </Text>
    <Text style={styles.normalText}>{value}</Text>
  </View>
);
