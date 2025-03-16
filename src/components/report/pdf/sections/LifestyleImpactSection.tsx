
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 6,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 10,
  },
});

interface LifestyleImpactSectionProps {
  formData: Partial<FormSchema>;
}

const LifestyleImpactSection: React.FC<LifestyleImpactSectionProps> = ({ formData }) => {
  // Safely handle formData which might be undefined or incomplete
  const data = formData || {};
  
  return (
    <View style={styles.section} break>
      <Text style={styles.title}>Impact on Daily Life</Text>

      {/* Work Impact */}
      <Text style={styles.subtitle}>Work Capabilities</Text>
      {data.impactOnWork === "1" ? (
        <Text style={styles.paragraph}>
          The claimant's work capabilities were affected. {data.workImpactDate ? `This impact started on ${data.workImpactDate}.` : ''} {data.workRestrictions && data.workRestrictions.length > 0 ? `Restrictions included: ${data.workRestrictions.join(', ')}.` : ''}
        </Text>
      ) : (
        <Text style={styles.paragraph}>The claimant reported no impact on work capabilities.</Text>
      )}
      
      {data.timeOffWork && data.timeOffWork !== '' ? (
        <Text style={styles.text}>Time off work: {data.timeOffWork} days</Text>
      ) : null}

      {/* Domestic Activities */}
      <Text style={styles.subtitle}>Domestic Activities</Text>
      {data.impactOnDomestic === "1" ? (
        <Text style={styles.paragraph}>
          The claimant's domestic activities were affected. {data.domesticImpactDate ? `This impact started on ${data.domesticImpactDate}.` : ''} {data.domesticIssues && data.domesticIssues.length > 0 ? `Activities affected included: ${data.domesticIssues.join(', ')}.` : ''}
        </Text>
      ) : (
        <Text style={styles.paragraph}>The claimant reported no impact on domestic activities.</Text>
      )}

      {/* Sleep */}
      <Text style={styles.subtitle}>Sleep</Text>
      {data.impactOnSleep === "1" ? (
        <Text style={styles.paragraph}>
          The claimant's sleep was disrupted. {data.sleepImpactDate ? `This impact started on ${data.sleepImpactDate}.` : ''} {data.sleepIssues && data.sleepIssues.length > 0 ? `Sleep issues included: ${data.sleepIssues.join(', ')}.` : ''}
        </Text>
      ) : (
        <Text style={styles.paragraph}>The claimant reported no impact on sleep.</Text>
      )}

      {/* Social Life */}
      <Text style={styles.subtitle}>Social Life</Text>
      {data.impactOnSocial === "1" ? (
        <Text style={styles.paragraph}>
          The claimant's social life was affected. {data.socialImpactDate ? `This impact started on ${data.socialImpactDate}.` : ''} {data.socialDetails ? `Details: ${data.socialDetails}` : ''}
        </Text>
      ) : (
        <Text style={styles.paragraph}>The claimant reported no impact on social life.</Text>
      )}

      {/* Sports and Leisure */}
      {data.impactOnSports === "1" ? (
        <Text style={styles.paragraph}>
          The claimant's sports and leisure activities were affected. {data.sportsImpactDate ? `This impact started on ${data.sportsImpactDate}.` : ''} {data.sportsActivities ? `Activities affected: ${data.sportsActivities}` : ''} {data.sportsActivities && data.sportsDuration ? `. ` : ''} {data.sportsDuration ? `The claimant typically engaged in these activities ${data.sportsDuration} times per month before the accident.` : ''}
        </Text>
      ) : (
        <Text style={styles.paragraph}>The claimant reported no impact on sports and leisure activities.</Text>
      )}
    </View>
  );
};

export default LifestyleImpactSection;
