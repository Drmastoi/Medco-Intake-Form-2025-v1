
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface InjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const InjuriesSection = ({ formData, styles }: InjuriesSectionProps) => {
  // Helper function to format injury duration
  const formatDuration = (resolveDays: string | undefined) => {
    if (!resolveDays) return "Not specified";
    return `${resolveDays} days`;
  };
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 8 - Injuries</Text>

      {/* Neck Pain */}
      {formData.injuries.neckPain.hasInjury && (
        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.1 Neck Pain</Text>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.neckPain.initialSeverity || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.neckPain.currentSeverity || 'Not specified'}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Start Date</Text>
              <Text style={styles.fieldValue}>{formData.injuries.neckPain.painStart || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.neckPain.currentSeverity === 'Resolved' 
                  ? 'Resolved' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.neckPain.currentSeverity === 'Resolved' 
                  ? formatDuration(formData.injuries.neckPain.resolveDays) 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>{formData.injuries.neckPain.hadPrior ? 'Yes' : 'None'}</Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Back Pain */}
      {formData.injuries.backPain.hasInjury && (
        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.2 Back Pain</Text>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.backPain.initialSeverity || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.backPain.currentSeverity || 'Not specified'}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Start Date</Text>
              <Text style={styles.fieldValue}>{formData.injuries.backPain.painStart || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.backPain.currentSeverity === 'Resolved' 
                  ? 'Resolved' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.backPain.currentSeverity === 'Resolved' 
                  ? formatDuration(formData.injuries.backPain.resolveDays) 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>None</Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Shoulder Pain */}
      {formData.injuries.shoulderPain.hasInjury && (
        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.3 Shoulder Pain</Text>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.initialSeverity || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.currentSeverity || 'Not specified'}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Start Date</Text>
              <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.painStart || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.shoulderPain.currentSeverity === 'Resolved' 
                  ? 'Resolved' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.shoulderPain.currentSeverity === 'Resolved' 
                  ? formatDuration(formData.injuries.shoulderPain.resolveDays) 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>None</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Affected Side</Text>
              <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.side || 'Not specified'}</Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Headache */}
      {formData.injuries.headache.hasInjury && (
        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.4 Headache</Text>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.headache.initialSeverity || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity</Text>
              <Text style={styles.fieldValue}>{formData.injuries.headache.currentSeverity || 'Not specified'}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Start Date</Text>
              <Text style={styles.fieldValue}>{formData.injuries.headache.start || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.headache.currentSeverity === 'Resolved' 
                  ? 'Resolved' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.headache.currentSeverity === 'Resolved' 
                  ? formatDuration(formData.injuries.headache.resolveDays) 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>{formData.injuries.headache.pastHistory || 'None'}</Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Travel Anxiety */}
      {formData.travelAnxiety?.hasAnxiety && (
        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.fieldLabel, { fontSize: 12 }]}>8.5 Travel Anxiety</Text>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity</Text>
              <Text style={styles.fieldValue}>{formData.travelAnxiety.initialSeverity || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity</Text>
              <Text style={styles.fieldValue}>{formData.travelAnxiety.currentSeverity || 'Not specified'}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Start Date</Text>
              <Text style={styles.fieldValue}>{formData.travelAnxiety.duration || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.travelAnxiety.currentSeverity === 'Resolved' 
                  ? 'Resolved' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.travelAnxiety.currentSeverity === 'Resolved' 
                  ? formatDuration(formData.travelAnxiety.resolveDays) 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>{formData.travelAnxiety.pastHistory || 'None'}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Symptoms</Text>
              <Text style={styles.fieldValue}>
                {formData.travelAnxiety.symptoms && formData.travelAnxiety.symptoms.length > 0
                  ? formData.travelAnxiety.symptoms.join(', ')
                  : 'Not specified'}
              </Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Concluding statement */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.fieldValue}>
          There were no other injuries / symptoms which were stated in the instructions other than those listed in the
          medical report suffered by the claimant as told to me during the examination after direct questioning.
        </Text>
      </View>
    </View>
  );
};
