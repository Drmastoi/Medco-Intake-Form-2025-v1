
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

export const InjuriesSection = ({ formData, styles }: { formData: ReportData, styles: any }) => {
  // Helper function to get pain severity text
  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "1": return "Mild";
      case "2": return "Moderate";
      case "3": return "Severe";
      default: return "Not specified";
    }
  };

  // Helper function to get pain timing text
  const getTimingText = (timing: string) => {
    switch (timing) {
      case "1": return "Same day";
      case "2": return "Next day";
      case "3": return "2-3 days later";
      case "4": return "Over a week later";
      default: return "Not specified";
    }
  };

  // Neck Pain Section
  const renderNeckPain = () => {
    if (formData.injuries.neckPain !== "1") return null;
    
    return (
      <View style={styles.subsection}>
        <Text style={styles.sectionHeader}>8.1 Neck Pain (Cervical Spine)</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Onset:</Text>
            <Text style={styles.fieldValue}>
              {getTimingText(formData.injuries.neckPainStart)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Initial Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.neckPainInitialSeverity)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Current Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.neckPainCurrentSeverity)}
            </Text>
          </View>
        </View>
        
        {formData.injuries.neckPainResolveDays ? (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Resolved after approximately {formData.injuries.neckPainResolveDays} days post-accident
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Not yet resolved at the time of examination
              </Text>
            </View>
          </View>
        )}
        
        {formData.injuries.hadPriorNeckPain === "1" && (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Pre-existing Condition:</Text>
              <Text style={styles.fieldValue}>
                Patient reports history of neck pain prior to the accident
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.fieldRow}>
          <View style={{flex: 1}}>
            <Text style={styles.fieldLabel}>Additional Information:</Text>
            <Text style={styles.fieldValue}>
              {formData.injuries.additionalInfo || "None provided"}
            </Text>
          </View>
        </View>
        
        <View style={styles.summaryText}>
          <Text>
            The claimant developed {getSeverityText(formData.injuries.neckPainInitialSeverity).toLowerCase()} neck pain {getTimingText(formData.injuries.neckPainStart).toLowerCase()} following the accident.
            {formData.injuries.neckPainResolveDays 
              ? ` The symptoms resolved after approximately ${formData.injuries.neckPainResolveDays} days.` 
              : ` The symptoms persist at ${getSeverityText(formData.injuries.neckPainCurrentSeverity).toLowerCase()} intensity at the time of examination.`}
            {formData.injuries.hadPriorNeckPain === "1" 
              ? ` The claimant reports a prior history of neck pain, which may have been exacerbated by this incident.`
              : ``}
          </Text>
        </View>
      </View>
    );
  };
  
  // Shoulder Pain Section
  const renderShoulderPain = () => {
    if (formData.injuries.shoulderPain !== "1") return null;
    
    // Get shoulder side text
    const getShoulderSideText = (side: string) => {
      switch (side) {
        case "1": return "Left shoulder";
        case "2": return "Right shoulder";
        case "3": return "Both shoulders";
        default: return "Shoulder (side not specified)";
      }
    };
    
    return (
      <View style={styles.subsection}>
        <Text style={styles.sectionHeader}>8.2 Shoulder Pain</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Location:</Text>
            <Text style={styles.fieldValue}>
              {getShoulderSideText(formData.injuries.shoulderSide)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Onset:</Text>
            <Text style={styles.fieldValue}>
              {getTimingText(formData.injuries.shoulderPainStart)}
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Initial Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.shoulderPainInitialSeverity)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Current Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.shoulderPainCurrentSeverity)}
            </Text>
          </View>
        </View>
        
        {formData.injuries.shoulderPainResolveDays ? (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Resolved after approximately {formData.injuries.shoulderPainResolveDays} days post-accident
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Not yet resolved at the time of examination
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.summaryText}>
          <Text>
            The claimant developed {getSeverityText(formData.injuries.shoulderPainInitialSeverity).toLowerCase()} pain in the {getShoulderSideText(formData.injuries.shoulderSide).toLowerCase()} {getTimingText(formData.injuries.shoulderPainStart).toLowerCase()} after the accident.
            {formData.injuries.shoulderPainResolveDays 
              ? ` These symptoms resolved after approximately ${formData.injuries.shoulderPainResolveDays} days.` 
              : ` The symptoms persist at ${getSeverityText(formData.injuries.shoulderPainCurrentSeverity).toLowerCase()} intensity at the time of examination.`}
          </Text>
        </View>
      </View>
    );
  };
  
  // Back Pain Section
  const renderBackPain = () => {
    if (formData.injuries.backPain !== "1") return null;
    
    // Get back location text
    const getBackLocationText = (location: string) => {
      switch (location) {
        case "1": return "Upper back (thoracic)";
        case "2": return "Lower back (lumbar)";
        case "3": return "Both upper and lower back";
        default: return "Back (location not specified)";
      }
    };
    
    return (
      <View style={styles.subsection}>
        <Text style={styles.sectionHeader}>8.3 Back Pain</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Location:</Text>
            <Text style={styles.fieldValue}>
              {getBackLocationText(formData.injuries.backLocation)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Onset:</Text>
            <Text style={styles.fieldValue}>
              {getTimingText(formData.injuries.backPainStart)}
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Initial Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.backPainInitialSeverity)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Current Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.backPainCurrentSeverity)}
            </Text>
          </View>
        </View>
        
        {formData.injuries.backPainResolveDays ? (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Resolved after approximately {formData.injuries.backPainResolveDays} days post-accident
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Not yet resolved at the time of examination
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.summaryText}>
          <Text>
            The claimant developed {getSeverityText(formData.injuries.backPainInitialSeverity).toLowerCase()} pain in the {getBackLocationText(formData.injuries.backLocation).toLowerCase()} {getTimingText(formData.injuries.backPainStart).toLowerCase()} after the accident.
            {formData.injuries.backPainResolveDays 
              ? ` These symptoms resolved after approximately ${formData.injuries.backPainResolveDays} days.` 
              : ` The symptoms persist at ${getSeverityText(formData.injuries.backPainCurrentSeverity).toLowerCase()} intensity at the time of examination.`}
          </Text>
        </View>
      </View>
    );
  };
  
  // Headache Section
  const renderHeadache = () => {
    if (formData.injuries.headache !== "1") return null;
    
    return (
      <View style={styles.subsection}>
        <Text style={styles.sectionHeader}>8.4 Headache</Text>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Onset:</Text>
            <Text style={styles.fieldValue}>
              {getTimingText(formData.injuries.headacheStart)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Initial Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.headacheInitialSeverity)}
            </Text>
          </View>
          
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Current Severity:</Text>
            <Text style={styles.fieldValue}>
              {getSeverityText(formData.injuries.headacheCurrentSeverity)}
            </Text>
          </View>
        </View>
        
        {formData.injuries.headacheResolveDays ? (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Resolved after approximately {formData.injuries.headacheResolveDays} days post-accident
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Resolution:</Text>
              <Text style={styles.fieldValue}>
                Not yet resolved at the time of examination
              </Text>
            </View>
          </View>
        )}
        
        {formData.injuries.headachePastHistory && (
          <View style={styles.fieldRow}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldLabel}>Previous History:</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.headachePastHistory}
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.summaryText}>
          <Text>
            The claimant developed {getSeverityText(formData.injuries.headacheInitialSeverity).toLowerCase()} headaches {getTimingText(formData.injuries.headacheStart).toLowerCase()} after the accident.
            {formData.injuries.headacheResolveDays 
              ? ` These symptoms resolved after approximately ${formData.injuries.headacheResolveDays} days.` 
              : ` The symptoms persist at ${getSeverityText(formData.injuries.headacheCurrentSeverity).toLowerCase()} intensity at the time of examination.`}
            {formData.injuries.headachePastHistory 
              ? ` There is a relevant history of headaches prior to this incident: ${formData.injuries.headachePastHistory}.`
              : ``}
          </Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>8. Injuries and Symptoms</Text>
      
      {renderNeckPain()}
      {renderShoulderPain()}
      {renderBackPain()}
      {renderHeadache()}
    </View>
  );
};
