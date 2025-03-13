
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { getSeverityText } from '@/utils/formatUtils';

interface InjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const InjuriesSection = ({ formData, styles }: InjuriesSectionProps) => {
  const { injuries } = formData;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 6 - Injuries</Text>
      
      {/* Neck Pain Section */}
      {injuries.neckPain.hasInjury && (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Neck Pain:</Text>
              <Text style={styles.fieldValue}>Present</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Pain Started:</Text>
              <Text style={styles.fieldValue}>
                {injuries.neckPain.painStart === "1" ? "Same day as accident" : 
                 injuries.neckPain.painStart === "2" ? "Day after accident" : 
                 injuries.neckPain.painStart === "3" ? "Few days after accident" : 
                 injuries.neckPain.painStart}
              </Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.neckPain.initialSeverity}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.neckPain.currentSeverity}</Text>
            </View>
          </View>
          {injuries.neckPain.currentSeverity === "Resolved" && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{injuries.neckPain.resolveDays || "Not specified"} days</Text>
              </View>
            </View>
          )}
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Prior History:</Text>
              <Text style={styles.fieldValue}>{injuries.neckPain.hadPrior ? "Yes" : "No"}</Text>
            </View>
          </View>
          {injuries.neckPain.additionalInfo && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Additional Information:</Text>
                <Text style={styles.fieldValue}>{injuries.neckPain.additionalInfo}</Text>
              </View>
            </View>
          )}
        </>
      )}
      
      {/* Shoulder Pain Section */}
      {injuries.shoulderPain.hasInjury && (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Shoulder Pain:</Text>
              <Text style={styles.fieldValue}>Present</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Affected Side:</Text>
              <Text style={styles.fieldValue}>
                {injuries.shoulderPain.side === "right" ? "Right shoulder" : 
                 injuries.shoulderPain.side === "left" ? "Left shoulder" : 
                 injuries.shoulderPain.side === "both" ? "Both shoulders" : 
                 injuries.shoulderPain.side}
              </Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Pain Started:</Text>
              <Text style={styles.fieldValue}>
                {injuries.shoulderPain.painStart === "1" ? "Same day as accident" : 
                 injuries.shoulderPain.painStart === "2" ? "Day after accident" : 
                 injuries.shoulderPain.painStart === "3" ? "Few days after accident" : 
                 injuries.shoulderPain.painStart}
              </Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.shoulderPain.initialSeverity}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.shoulderPain.currentSeverity}</Text>
            </View>
          </View>
          {injuries.shoulderPain.currentSeverity === "Resolved" && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{injuries.shoulderPain.resolveDays || "Not specified"} days</Text>
              </View>
            </View>
          )}
        </>
      )}
      
      {/* Back Pain Section */}
      {injuries.backPain.hasInjury && (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Back Pain:</Text>
              <Text style={styles.fieldValue}>Present</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Back Location:</Text>
              <Text style={styles.fieldValue}>
                {injuries.backPain.location === "1" ? "Upper back" : 
                 injuries.backPain.location === "2" ? "Mid back" : 
                 injuries.backPain.location === "3" ? "Lower back" : 
                 injuries.backPain.location}
              </Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Pain Started:</Text>
              <Text style={styles.fieldValue}>
                {injuries.backPain.painStart === "1" ? "Same day as accident" : 
                 injuries.backPain.painStart === "2" ? "Day after accident" : 
                 injuries.backPain.painStart === "3" ? "Few days after accident" : 
                 injuries.backPain.painStart}
              </Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.backPain.initialSeverity}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.backPain.currentSeverity}</Text>
            </View>
          </View>
          {injuries.backPain.currentSeverity === "Resolved" && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{injuries.backPain.resolveDays || "Not specified"} days</Text>
              </View>
            </View>
          )}
        </>
      )}
      
      {/* Headache Section */}
      {injuries.headache.hasInjury && (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Headache:</Text>
              <Text style={styles.fieldValue}>Present</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Started:</Text>
              <Text style={styles.fieldValue}>
                {injuries.headache.start === "1" ? "Same day as accident" : 
                 injuries.headache.start === "2" ? "Day after accident" : 
                 injuries.headache.start === "3" ? "Few days after accident" : 
                 injuries.headache.start}
              </Text>
            </View>
          </View>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.headache.initialSeverity}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{injuries.headache.currentSeverity}</Text>
            </View>
          </View>
          {injuries.headache.currentSeverity === "Resolved" && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{injuries.headache.resolveDays || "Not specified"} days</Text>
              </View>
            </View>
          )}
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History:</Text>
              <Text style={styles.fieldValue}>{injuries.headache.pastHistory || "None"}</Text>
            </View>
          </View>
        </>
      )}
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        Claimant reported 
        {injuries.neckPain.hasInjury ? " neck pain" : ""}
        {injuries.shoulderPain.hasInjury ? (injuries.neckPain.hasInjury ? ", " : " ") + "shoulder pain" : ""}
        {injuries.backPain.hasInjury ? 
          (injuries.neckPain.hasInjury || injuries.shoulderPain.hasInjury ? ", " : " ") + "back pain" : ""}
        {injuries.headache.hasInjury ? 
          (injuries.neckPain.hasInjury || injuries.shoulderPain.hasInjury || injuries.backPain.hasInjury ? 
           ", and headaches" : " headaches") : ""}
        {(!injuries.neckPain.hasInjury && !injuries.shoulderPain.hasInjury && 
          !injuries.backPain.hasInjury && !injuries.headache.hasInjury) ? 
          "no physical injuries" : ""}
        {" following the accident. "}
        {(injuries.neckPain.currentSeverity === "Resolved" || 
          injuries.shoulderPain.currentSeverity === "Resolved" ||
          injuries.backPain.currentSeverity === "Resolved" || 
          injuries.headache.currentSeverity === "Resolved") ? 
          "Some injuries have resolved completely. " : ""}
        {(injuries.neckPain.currentSeverity !== "Resolved" && injuries.neckPain.hasInjury) || 
         (injuries.shoulderPain.currentSeverity !== "Resolved" && injuries.shoulderPain.hasInjury) ||
         (injuries.backPain.currentSeverity !== "Resolved" && injuries.backPain.hasInjury) || 
         (injuries.headache.currentSeverity !== "Resolved" && injuries.headache.hasInjury) ? 
          "Some injuries are still present. " : ""}
      </Text>
    </View>
  );
};
