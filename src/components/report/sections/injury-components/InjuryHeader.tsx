
import { Text } from '@react-pdf/renderer';

interface InjuryHeaderProps {
  title: string;
  injuryType: string;
  location?: string;
  styles: any;
}

export const InjuryHeader = ({ title, injuryType, location, styles }: InjuryHeaderProps) => {
  return (
    <Text style={styles.injuryTypeHeader}>
      {title}
      {injuryType === 'Back' && location && (
        ` (${location === "1" ? "Upper" : 
             location === "2" ? "Middle" : 
             location === "3" ? "Lower" : "All over"})`
      )}
      {injuryType === 'Shoulder' && location && (
        ` (${location === "1" ? "Left" : 
             location === "2" ? "Right" : "Both"})`
      )}
    </Text>
  );
};
