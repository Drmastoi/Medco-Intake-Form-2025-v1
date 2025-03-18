
import React from 'react';
import { Text, View } from '@react-pdf/renderer';

interface MedicalHistoryComponentProps {
  formData: any; // Using any to avoid TypeScript errors temporarily
}

const MedicalHistoryComponent: React.FC<MedicalHistoryComponentProps> = ({ formData }) => {
  // Safely check if properties exist before accessing them
  const hasExceptionalInjuries = formData?.exceptionalInjuries === "1";
  const exceptionalInjuriesDetails = formData?.exceptionalInjuriesDetails || '';
  const anxietyPastHistory = formData?.anxietyPastHistory || '';
  const headachePastHistory = formData?.headachePastHistory || '';

  // Using inline styles since we can't properly import the styles
  const styles = {
    section: {
      marginBottom: 10,
      padding: 10,
    },
    subtitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
      textTransform: 'uppercase' as const, // Fix TypeScript error with textTransform
    },
    subheading: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    text: {
      fontSize: 10,
      marginBottom: 5,
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>PAST MEDICAL HISTORY</Text>

      {/* Previous Medical Issues */}
      <Text style={styles.subheading}>Previous Medical Issues:</Text>
      <Text style={styles.text}>
        {hasExceptionalInjuries ? 'The claimant has reported previous medical issues.' : 'The claimant has not reported any previous medical issues.'}
      </Text>
      {hasExceptionalInjuries && exceptionalInjuriesDetails && (
        <Text style={styles.text}>{exceptionalInjuriesDetails}</Text>
      )}

      {/* Previous Headache Issues */}
      {headachePastHistory && (
        <>
          <Text style={styles.subheading}>Previous Headache Issues:</Text>
          <Text style={styles.text}>{headachePastHistory}</Text>
        </>
      )}

      {/* Previous Anxiety Issues */}
      {anxietyPastHistory && (
        <>
          <Text style={styles.subheading}>Previous Anxiety Issues:</Text>
          <Text style={styles.text}>{anxietyPastHistory}</Text>
        </>
      )}

      {/* Final Assessment */}
      <Text style={{...styles.subheading, marginTop: 10}}>Medical History Assessment:</Text>
      <Text style={styles.text}>
        The claimant's medical history has been taken into account when assessing the impact of the current injuries.
      </Text>
    </View>
  );
};

export default MedicalHistoryComponent;
