
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
        <Text style={styles.tableTitle}>SUMMARY OF INJURIES AND IMPACTS:</Text>
        
        <InjuriesTable 
          title="Whiplash Related Injuries:"
          injuries={whiplashInjuries}
          classification={(injury) => {
            if (injury.injury.includes("Neck") || injury.injury.includes("Back") || injury.injury.includes("Shoulder")) {
              return "Whiplash";
            } else if (injury.injury.includes("Headache")) {
              return "Whiplash Associated";
            } else {
              return "Non-whiplash";
            }
          }}
        />

        {nonWhiplashInjuries.length > 0 && (
          <View style={{ marginTop: 15 }}>
            <InjuriesTable 
              title="Other Injuries and Impacts:"
              injuries={nonWhiplashInjuries}
              classification={(injury) => {
                if (injury.injury.includes("Anxiety")) {
                  return "Psychological";
                } else if (injury.injury.includes("Headache")) {
                  return "Whiplash Associated";
                } else {
                  return "Non-whiplash";
                }
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
