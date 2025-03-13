
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const DeclarationSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 12 - Declaration and Statement of Truth</Text>
      
      <View style={styles.contentSection}>
        <Text style={styles.summaryText}>
          I, Dr. Sam Smith, confirm that I understand my duty to the court and have complied with that duty. I declare that I have made clear which facts and matters referred to in this report are within my own knowledge and which are not. Those that are within my own knowledge I confirm to be true.
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 8}}>
          The opinions I have expressed represent my true and complete professional opinions on the matters to which they refer. I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.
        </Text>
        
        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%'}}>
            <Text style={{fontSize: 9, fontFamily: 'Helvetica-Bold'}}>Signed:</Text>
            <Text style={{fontSize: 9, marginTop: 15}}>Dr. Sam Smith</Text>
          </View>
          <View style={{width: '45%'}}>
            <Text style={{fontSize: 9, fontFamily: 'Helvetica-Bold'}}>Date:</Text>
            <Text style={{fontSize: 9, marginTop: 3}}>
              {new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
