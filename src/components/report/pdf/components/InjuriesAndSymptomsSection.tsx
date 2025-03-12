
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { InjuriesData } from '@/types/reportTypes';

export const InjuriesAndSymptomsSection = ({ data }: { data?: InjuriesData }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>8. Injuries and Symptoms</Text>
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          The claimant has expressed the following symptoms since the accident. These have been examined and assessed based on their stated history and clinical examination.
        </Text>
      </View>
      
      <Text style={{...styles.subheader, marginTop: 10, fontSize: 12}}>
        Whiplash Injuries
      </Text>
      
      {/* 8.1 Neck Pain */}
      <View style={styles.subsection}>
        <Text style={{...styles.compactLabel, fontSize: 11, marginBottom: 5}}>
          8.1 Neck Pain
        </Text>
        {data?.neckPain?.hasInjury ? (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            The claimant reported neck pain that started {data.neckPain.painStart === "immediately" ? "immediately after the accident" : 
            data.neckPain.painStart === "hours" ? "within hours of the accident" : 
            data.neckPain.painStart === "day" ? "the day after the accident" : 
            data.neckPain.painStart === "days" ? "a few days after the accident" : "after the accident"}.
            Initial severity was {data.neckPain.initialSeverity === "1" ? "mild" : 
            data.neckPain.initialSeverity === "2" ? "moderate" : 
            data.neckPain.initialSeverity === "3" ? "severe" : "very severe"} and current severity is 
            {data.neckPain.currentSeverity === "1" ? " mild" : 
            data.neckPain.currentSeverity === "2" ? " moderate" : 
            data.neckPain.currentSeverity === "3" ? " severe" : " very severe"}.
            {data.neckPain.resolveDays && data.neckPain.currentSeverity === "4" ? ` Pain resolved after ${data.neckPain.resolveDays} days.` : ""}
            {data.neckPain.hadPrior ? " The claimant reported having neck pain before this accident." : " The claimant did not have previous history of neck pain before the accident."}
            {data.neckPain.additionalInfo ? ` ${data.neckPain.additionalInfo}` : ""}
          </Text>
        ) : (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            Claimant did not suffer from neck pain after the accident.
          </Text>
        )}
      </View>
      
      {/* 8.2 Shoulder Pain */}
      {data?.shoulderPain?.hasInjury && (
        <View style={styles.subsection}>
          <Text style={{...styles.compactLabel, fontSize: 11, marginBottom: 5}}>
            8.2 Shoulder Pain
          </Text>
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            The claimant reported {data.shoulderPain.side === "right" ? "right" : 
            data.shoulderPain.side === "left" ? "left" : "bilateral"} shoulder pain that started 
            {data.shoulderPain.painStart === "immediately" ? " immediately after the accident" : 
            data.shoulderPain.painStart === "hours" ? " within hours of the accident" : 
            data.shoulderPain.painStart === "day" ? " the day after the accident" : 
            data.shoulderPain.painStart === "days" ? " a few days after the accident" : " after the accident"}.
            Initial severity was {data.shoulderPain.initialSeverity === "1" ? "mild" : 
            data.shoulderPain.initialSeverity === "2" ? "moderate" : 
            data.shoulderPain.initialSeverity === "3" ? "severe" : "very severe"} and current severity is 
            {data.shoulderPain.currentSeverity === "1" ? " mild" : 
            data.shoulderPain.currentSeverity === "2" ? " moderate" : 
            data.shoulderPain.currentSeverity === "3" ? " severe" : " very severe"}.
          </Text>
        </View>
      )}
      
      {/* 8.3 Back Pain */}
      {data?.backPain?.hasInjury && (
        <View style={styles.subsection}>
          <Text style={{...styles.compactLabel, fontSize: 11, marginBottom: 5}}>
            8.3 Back Pain
          </Text>
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            The claimant reported {data.backPain.location === "upper" ? "upper back" : 
            data.backPain.location === "mid" ? "mid back" : "lower back"} pain that started 
            {data.backPain.painStart === "immediately" ? " immediately after the accident" : 
            data.backPain.painStart === "hours" ? " within hours of the accident" : 
            data.backPain.painStart === "day" ? " the day after the accident" : 
            data.backPain.painStart === "days" ? " a few days after the accident" : " after the accident"}.
            Initial severity was {data.backPain.initialSeverity === "1" ? "mild" : 
            data.backPain.initialSeverity === "2" ? "moderate" : 
            data.backPain.initialSeverity === "3" ? "severe" : "very severe"} and current severity is 
            {data.backPain.currentSeverity === "1" ? " mild" : 
            data.backPain.currentSeverity === "2" ? " moderate" : 
            data.backPain.currentSeverity === "3" ? " severe" : " very severe"}.
          </Text>
        </View>
      )}
      
      {/* If no whiplash injuries were reported */}
      {(!data?.neckPain?.hasInjury && !data?.shoulderPain?.hasInjury && !data?.backPain?.hasInjury) && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            No whiplash injuries were reported by the claimant.
          </Text>
        </View>
      )}
    </View>
  );
};
