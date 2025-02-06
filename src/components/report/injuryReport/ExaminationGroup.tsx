
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../reportStyles';

interface ExaminationGroupProps {
  title: string;
  items: { label: string; value: string }[];
}

export const ExaminationGroup = ({ title, items }: ExaminationGroupProps) => (
  <View>
    <Text style={styles.boldLabel}>{title}</Text>
    <View style={styles.indentedGroup}>
      {items.map((item, index) => (
        <View key={index} style={styles.compactGroup}>
          <Text style={styles.boldLabel}>{item.label}: </Text>
          <Text style={styles.normalText}>{item.value}</Text>
        </View>
      ))}
    </View>
  </View>
);
