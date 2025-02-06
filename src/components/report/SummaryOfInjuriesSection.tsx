
import { Text, View } from '@react-pdf/renderer';
import { styles } from './reportStyles';
import { InjuriesTable } from './InjuriesTable';
import { prepareWhiplashInjuries, prepareNonWhiplashInjuries } from '../../utils/injuryUtils';

export const SummaryOfInjuriesSection = ({ formData }: { formData: any }) => {
  const whiplashInjuries = prepareWhiplashInjuries(formData);
  const nonWhiplashInjuries = prepareNonWhiplashInjuries(formData);

  return (
    <View style={styles.section}>
      <View style={styles.table}>
        <Text style={styles.tableTitle}>SUMMARY OF INJURIES:</Text>
        
        <InjuriesTable 
          title="Whiplash Injuries:"
          injuries={whiplashInjuries}
          classification={() => "Whiplash"}
        />

        {nonWhiplashInjuries.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <InjuriesTable 
              title="Non-Whiplash Injuries:"
              injuries={nonWhiplashInjuries}
              classification={(injury) => injury.injury === "Headache" ? "WAD" : "Psychological"}
            />
          </View>
        )}
      </View>
    </View>
  );
};
