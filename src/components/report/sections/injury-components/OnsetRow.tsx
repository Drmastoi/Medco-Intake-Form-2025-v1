
import { Text, View } from '@react-pdf/renderer';
import { colorScheme } from '../../pdf/styles/colorScheme';

interface OnsetRowProps {
  painStart: string | undefined;
  styles: any;
}

export const OnsetRow = ({ painStart, styles }: OnsetRowProps) => {
  const getOnsetDescription = (start: string | undefined): string => {
    switch (start) {
      case "1": return "immediately after";
      case "2": return "the day after";
      case "3": return "a few days after";
      case "4": return "within 1 week of";
      default: return "sometime after";
    }
  };
  
  const getOnsetSignificance = (start: string | undefined): string => {
    switch (start) {
      case "1": 
        return "Immediate onset is consistent with an acute injury caused by the accident.";
      case "2":
      case "3": 
        return "Delayed onset can be related to inflammation that develops in the hours/days following trauma.";
      case "4": 
        return "Later onset may indicate a secondary effect of compensatory movements or stress.";
      default: 
        return "";
    }
  };

  const onsetDescription = getOnsetDescription(painStart);
  const significance = getOnsetSignificance(painStart);

  return (
    <View style={styles.injuryRow}>
      <Text style={styles.injuryLabel}>Onset</Text>
      <View style={{ width: '70%' }}>
        <Text style={styles.injuryValue}>
          The Claimant recalls the symptoms beginning {onsetDescription} the accident/incident.
        </Text>
        {significance && (
          <View style={{ 
            backgroundColor: colorScheme.altSectionBg, 
            padding: 5,
            marginTop: 3,
            borderRadius: 2
          }}>
            <Text style={{ 
              fontSize: 8, 
              fontStyle: 'italic',
              color: colorScheme.textSecondary 
            }}>
              {significance}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
