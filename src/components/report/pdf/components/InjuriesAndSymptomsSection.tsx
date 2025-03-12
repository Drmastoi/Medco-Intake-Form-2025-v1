
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

interface InjuriesData {
  neckPain: {
    hasInjury: boolean;
    painStart: string;
    initialSeverity: string;
    currentSeverity: string;
    resolveDays?: string;
    additionalInfo?: string;
    hadPrior?: boolean;
  };
  shoulderPain: {
    hasInjury: boolean;
    side: string;
    painStart: string;
    initialSeverity: string;
    currentSeverity: string;
  };
  backPain: {
    hasInjury: boolean;
    location: string;
    painStart: string;
    initialSeverity: string;
    currentSeverity: string;
  };
  headache: {
    hasInjury: boolean;
    start: string;
    initialSeverity: string;
    currentSeverity: string;
  };
}

export const InjuriesAndSymptomsSection = ({ data }: { data?: InjuriesData }) => {
  // Function to get the pain start text
  const getPainStartText = (painStart: string): string => {
    switch(painStart) {
      case "immediately": return "immediately after the accident";
      case "hours": return "within hours of the accident";
      case "day": return "the day after the accident";
      case "days": return "a few days after the accident";
      case "1": return "same day";
      case "2": return "next day";
      case "3": return "few days later";
      default: return "after the accident";
    }
  };
  
  // Function to get severity text
  const getSeverityText = (severity: string): string => {
    switch(severity) {
      case "1": return "mild";
      case "2": return "moderate";
      case "3": return "severe";
      case "4": return "resolved";
      case "Mild": return "mild";
      case "Moderate": return "moderate";
      case "Severe": return "severe";
      default: return "unknown";
    }
  };

  const getSeverityTextForExamination = (severity: string): string => {
    const severityText = getSeverityText(severity);
    if (severityText === "mild") return "mild";
    if (severityText === "moderate") return "moderate";
    if (severityText === "severe") return "severe";
    return "mild"; // default fallback
  };
  
  // Function to get prognosis based on current severity
  const getPrognosisText = (severity: string): string => {
    const severityText = getSeverityText(severity);
    if (severityText === "mild") return "3 months";
    if (severityText === "moderate") return "6 months";
    if (severityText === "severe") return "9 months";
    if (severityText === "resolved") return "already resolved";
    return "3-6 months"; // default fallback
  };
  
  // Function to check if prognosis is 8 months or more
  const isProlongedPrognosis = (severity: string): boolean => {
    const severityText = getSeverityText(severity);
    return severityText === "severe"; // 9 months is >= 8 months
  };

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
          <>
            <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
              Claimant suffered from neck pain after the accident. It started {getPainStartText(data.neckPain.painStart)}, 
              initial severity was {getSeverityText(data.neckPain.initialSeverity)}, 
              current severity is {getSeverityText(data.neckPain.currentSeverity)}.
              {data.neckPain.resolveDays && data.neckPain.currentSeverity === "4" ? ` Pain resolved after ${data.neckPain.resolveDays} days.` : ""}
              {data.neckPain.hadPrior ? " Claimant had previous history of neck pain before the accident." : " Claimant did not have previous history of neck pain before the accident."}
              {data.neckPain.additionalInfo ? ` ${data.neckPain.additionalInfo}` : ""}
            </Text>
            <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
              <Text style={{fontWeight: 'bold'}}>Examination: </Text>
              Neck examination is showing {getSeverityTextForExamination(data.neckPain.currentSeverity)} restriction of movement and tenderness. No neurological symptoms observed.
            </Text>
            <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
              <Text style={{fontWeight: 'bold'}}>Prognosis: </Text>
              {getPrognosisText(data.neckPain.currentSeverity)}
              {isProlongedPrognosis(data.neckPain.currentSeverity) ? 
                ". Prolonged prognosis is due to severity of symptoms" : ""}
            </Text>
            <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
              <Text style={{fontWeight: 'bold'}}>Treatment: </Text>
              Pain killers and Physiotherapy. The required number of sessions to be determined by the Physiotherapist.
            </Text>
          </>
        ) : (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            Claimant did not suffer from neck pain after the accident.
          </Text>
        )}
      </View>
      
      {/* 8.2 Shoulder Pain */}
      <View style={styles.subsection}>
        <Text style={{...styles.compactLabel, fontSize: 11, marginBottom: 5}}>
          8.2 Shoulder Pain
        </Text>
        {data?.shoulderPain?.hasInjury ? (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            The claimant reported {data.shoulderPain.side === "right" ? "right" : 
            data.shoulderPain.side === "left" ? "left" : "bilateral"} shoulder pain that started 
            {" " + getPainStartText(data.shoulderPain.painStart)}.
            Initial severity was {getSeverityText(data.shoulderPain.initialSeverity)} and current severity is 
            {" " + getSeverityText(data.shoulderPain.currentSeverity)}.
          </Text>
        ) : (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            Claimant did not suffer from shoulder pain after the accident.
          </Text>
        )}
      </View>
      
      {/* 8.3 Back Pain */}
      <View style={styles.subsection}>
        <Text style={{...styles.compactLabel, fontSize: 11, marginBottom: 5}}>
          8.3 Back Pain
        </Text>
        {data?.backPain?.hasInjury ? (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            The claimant reported {data.backPain.location === "upper" ? "upper back" : 
            data.backPain.location === "mid" ? "mid back" : "lower back"} pain that started 
            {" " + getPainStartText(data.backPain.painStart)}.
            Initial severity was {getSeverityText(data.backPain.initialSeverity)} and current severity is 
            {" " + getSeverityText(data.backPain.currentSeverity)}.
          </Text>
        ) : (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            Claimant did not suffer from back pain after the accident.
          </Text>
        )}
      </View>
      
      {/* 8.4 Headache */}
      <View style={styles.subsection}>
        <Text style={{...styles.compactLabel, fontSize: 11, marginBottom: 5}}>
          8.4 Headache
        </Text>
        {data?.headache?.hasInjury ? (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            The claimant reported headaches that started
            {" " + getPainStartText(data.headache.start)}.
            Initial severity was {getSeverityText(data.headache.initialSeverity)} and current severity is 
            {" " + getSeverityText(data.headache.currentSeverity)}.
          </Text>
        ) : (
          <Text style={{fontSize: 9, lineHeight: 1.4, marginBottom: 8}}>
            Claimant did not suffer from headaches after the accident.
          </Text>
        )}
      </View>
    </View>
  );
};
