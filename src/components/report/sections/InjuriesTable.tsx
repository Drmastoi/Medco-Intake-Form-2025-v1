
import { Text, View } from '@react-pdf/renderer';

interface InjuriesTableProps {
  children: React.ReactNode;
  styles: any;
}

export const InjuriesTable = ({ children, styles }: InjuriesTableProps) => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Injuries</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Classification</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Prognosis</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Treatment</Text>
      </View>
      {children}
    </View>
  );
};
