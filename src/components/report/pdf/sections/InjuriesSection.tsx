
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface InjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const InjuriesSection = ({ formData, styles }: InjuriesSectionProps) => {
  // Helper function to format injury duration
  const formatDuration = (startDate: string | undefined, resolveDate: string | undefined) => {
    if (!startDate || !resolveDate) return "Not specified";
    
    try {
      const start = new Date(startDate);
      const end = new Date(resolveDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return `${diffDays} days`;
    } catch (error) {
      return "Invalid date format";
    }
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
              <Text style={styles.fieldValue}>{formData.injuries.neckPain.startDate || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.neckPain.currentSeverity === 'Resolved' 
                  ? formData.injuries.neckPain.resolveDate || 'Not specified' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.neckPain.currentSeverity === 'Resolved' 
                  ? `${formData.injuries.neckPain.resolveDays || 'Not specified'} days` 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>{formData.injuries.neckPain.pastHistory || 'None'}</Text>
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
              <Text style={styles.fieldValue}>{formData.injuries.backPain.startDate || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.backPain.currentSeverity === 'Resolved' 
                  ? formData.injuries.backPain.resolveDate || 'Not specified' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.backPain.currentSeverity === 'Resolved' 
                  ? `${formData.injuries.backPain.resolveDays || 'Not specified'} days` 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>{formData.injuries.backPain.pastHistory || 'None'}</Text>
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
              <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.startDate || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.shoulderPain.currentSeverity === 'Resolved' 
                  ? formData.injuries.shoulderPain.resolveDate || 'Not specified' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.shoulderPain.currentSeverity === 'Resolved' 
                  ? `${formData.injuries.shoulderPain.resolveDays || 'Not specified'} days` 
                  : 'Ongoing'}
              </Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Past History</Text>
              <Text style={styles.fieldValue}>{formData.injuries.shoulderPain.pastHistory || 'None'}</Text>
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
              <Text style={styles.fieldValue}>{formData.injuries.headache.startDate || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.headache.currentSeverity === 'Resolved' 
                  ? formData.injuries.headache.resolveDate || 'Not specified' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.injuries.headache.currentSeverity === 'Resolved' 
                  ? `${formData.injuries.headache.resolveDays || 'Not specified'} days` 
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
              <Text style={styles.fieldValue}>{formData.travelAnxiety.startDate || 'Not specified'}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>End Date</Text>
              <Text style={styles.fieldValue}>
                {formData.travelAnxiety.currentSeverity === 'Resolved' 
                  ? formData.travelAnxiety.resolveDate || 'Not specified' 
                  : 'Ongoing'}
              </Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <Text style={styles.fieldValue}>
                {formData.travelAnxiety.currentSeverity === 'Resolved' 
                  ? `${formData.travelAnxiety.resolveDays || 'Not specified'} days` 
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
