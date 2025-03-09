
import { Text, View } from '@react-pdf/renderer';
import { hasExceptionalCircumstances } from '../utils/injuryClassification';

interface ExceptionalCircumstancesTableProps {
  formData: any;
  styles: any;
}

export const ExceptionalCircumstancesTable = ({ formData, styles }: ExceptionalCircumstancesTableProps) => {
  const isExceptional = hasExceptionalCircumstances(formData);
  
  return (
    <View style={{ marginTop: 15, marginBottom: 10 }}>
      <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 8 }}>Exceptional Circumstances</Text>
      
      <View style={[styles.tableContainer, { marginTop: 5 }]}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Injuries Claimed:</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{isExceptional ? "Yes" : "No"}</Text>
        </View>
        
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Injuries Awarded:</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{isExceptional ? "Yes" : "No"}</Text>
        </View>
        
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Circumstances Claimed:</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{isExceptional ? "Yes" : "No"}</Text>
        </View>
        
        {isExceptional && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>Exceptional Injuries / Circumstances:</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Pain and restrictions due to the accident</Text>
          </View>
        )}
      </View>
    </View>
  );
};
