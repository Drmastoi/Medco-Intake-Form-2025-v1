
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';
import { getPainSeverity, isLongTermPrognosis } from './dailyLifeUtils';

interface InjurySummaryProps {
  formData: any;
}

export const InjurySummarySection = ({ formData }: InjurySummaryProps) => (
  <View style={styles.paragraph}>
    <Text style={styles.sectionTitle}>Major Injuries Reported:</Text>
    {formData.neckPain === "1" && (
      <View>
        <Text style={styles.bulletPoint}>• Neck Pain</Text>
        <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.neckPainInitialSeverity)}</Text>
        <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.neckPainCurrentSeverity)}</Text>
        {formData.neckPainCurrentSeverity === "4" && (
          <Text style={styles.bulletPoint}>  - Resolved after: {formData.neckPainResolveDays} days</Text>
        )}
        {isLongTermPrognosis(formData.neckPainCurrentSeverity) && (
          <Text style={styles.explanationText}>The claimant's prolonged prognosis is attributable to the absence of physiotherapy and the extent of their injuries.</Text>
        )}
      </View>
    )}
    {formData.shoulderPain === "1" && (
      <View>
        <Text style={styles.bulletPoint}>• Shoulder Pain</Text>
        <Text style={styles.bulletPoint}>  - Side Affected: {
          formData.shoulderSide === "1" ? "Left" :
          formData.shoulderSide === "2" ? "Right" :
          formData.shoulderSide === "3" ? "Both" : "Not specified"
        }</Text>
        <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.shoulderPainInitialSeverity)}</Text>
        <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.shoulderPainCurrentSeverity)}</Text>
        {formData.shoulderPainCurrentSeverity === "4" && (
          <Text style={styles.bulletPoint}>  - Resolved after: {formData.shoulderPainResolveDays} days</Text>
        )}
        {isLongTermPrognosis(formData.shoulderPainCurrentSeverity) && (
          <Text style={styles.explanationText}>The claimant's prolonged prognosis is attributable to the absence of physiotherapy and the extent of their injuries.</Text>
        )}
      </View>
    )}
    {formData.backPain === "1" && (
      <View>
        <Text style={styles.bulletPoint}>• Back Pain</Text>
        <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.backPainInitialSeverity)}</Text>
        <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.backPainCurrentSeverity)}</Text>
        {formData.backPainCurrentSeverity === "4" && (
          <Text style={styles.bulletPoint}>  - Resolved after: {formData.backPainResolveDays} days</Text>
        )}
        {isLongTermPrognosis(formData.backPainCurrentSeverity) && (
          <Text style={styles.explanationText}>The claimant's prolonged prognosis is attributable to the absence of physiotherapy and the extent of their injuries.</Text>
        )}
      </View>
    )}
    {formData.headache === "1" && (
      <View>
        <Text style={styles.bulletPoint}>• Headaches</Text>
        <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.headacheInitialSeverity)}</Text>
        <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.headacheCurrentSeverity)}</Text>
        {formData.headacheCurrentSeverity === "4" && (
          <Text style={styles.bulletPoint}>  - Resolved after: {formData.headacheResolveDays} days</Text>
        )}
        {isLongTermPrognosis(formData.headacheCurrentSeverity) && (
          <Text style={styles.explanationText}>The claimant's prolonged prognosis is attributable to the absence of physiotherapy and the extent of their injuries.</Text>
        )}
      </View>
    )}
  </View>
);
