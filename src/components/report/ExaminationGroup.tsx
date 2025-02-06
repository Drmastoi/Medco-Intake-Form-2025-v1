
import { Text, View } from '@react-pdf/renderer';
import { styles } from './reportStyles';

interface ExaminationGroupProps {
  title: string;
  items: { label: string; value: string }[];
}

export const ExaminationGroup = ({ title, items }: ExaminationGroupProps) => (
  <View style={{ marginBottom: 5 }}>
    <Text style={{ ...styles.boldLabel, fontSize: 9, marginBottom: 2 }}>{title}</Text>
    <View style={{ ...styles.indentedGroup, marginLeft: 8 }}>
      {items.map((item, index) => (
        <View key={index} style={{ ...styles.compactGroup, marginBottom: 1 }}>
          <Text style={{ ...styles.boldLabel, fontSize: 9 }}>{item.label}: </Text>
          <Text style={{ ...styles.normalText, fontSize: 9 }}>{item.value}</Text>
        </View>
      ))}
    </View>
  </View>
);
