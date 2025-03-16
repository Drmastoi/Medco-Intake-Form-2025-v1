
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { tableStyles } from '../styles/tableStyles';
import { formatCheckboxList } from '../utils/formatUtils';
import { colorScheme } from '../styles/colorScheme';

interface TreatmentSectionProps {
  treatment: {
    hasTreatment: boolean;
    type?: string[];
    frequency?: string;
    duration?: string;
    ongoing?: boolean;
    sceneOfAccidentTreatment?: string;
    sceneOfAccidentTreatmentTypes?: string[];
    wentToAE?: string;
    hospitalName?: string;
    hospitalTreatment?: string[];
    wentToWalkInGP?: string;
    daysBeforeGPVisit?: string;
    currentTreatment?: string;
    physiotherapySessions?: string;
  };
}

const TreatmentSection: React.FC<TreatmentSectionProps> = ({ treatment }) => {
  return (
    <View style={[layoutStyles.section, { backgroundColor: colorScheme.sectionBg }]}>
      <Text style={textStyles.sectionTitle}>Treatment Information</Text>

      {!treatment.hasTreatment ? (
        <Text style={textStyles.normalText}>The claimant did not receive any medical treatment for injuries sustained in the accident.</Text>
      ) : (
        <View>
          <View style={tableStyles.tableContainer}>
            <View style={tableStyles.tableHeader}>
              <Text style={[textStyles.boldText, { flex: 1 }]}>Treatment Type</Text>
              <Text style={[textStyles.boldText, { flex: 1 }]}>Details</Text>
            </View>

            {treatment.sceneOfAccidentTreatment === "1" && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>At scene of accident</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>
                  {formatCheckboxList(treatment.sceneOfAccidentTreatmentTypes) || "Not specified"}
                </Text>
              </View>
            )}

            {treatment.wentToAE === "1" && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Hospital treatment</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>
                  {treatment.hospitalName || "Not specified"} - 
                  {formatCheckboxList(treatment.hospitalTreatment) || "Not specified"}
                </Text>
              </View>
            )}

            {treatment.wentToWalkInGP === "1" && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>GP/Walk-in center</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>
                  {treatment.daysBeforeGPVisit ? `${treatment.daysBeforeGPVisit} days after accident` : "Not specified"}
                </Text>
              </View>
            )}

            {treatment.currentTreatment && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Current treatment</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>{treatment.currentTreatment}</Text>
              </View>
            )}

            {treatment.physiotherapySessions && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Physiotherapy</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>
                  {treatment.physiotherapySessions} sessions
                </Text>
              </View>
            )}

            {treatment.type && treatment.type.length > 0 && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Treatment types</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>
                  {formatCheckboxList(treatment.type)}
                </Text>
              </View>
            )}

            {treatment.frequency && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Frequency</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>{treatment.frequency}</Text>
              </View>
            )}

            {treatment.duration && (
              <View style={tableStyles.tableRow}>
                <Text style={[textStyles.normalText, { flex: 1 }]}>Duration</Text>
                <Text style={[textStyles.normalText, { flex: 1 }]}>{treatment.duration}</Text>
              </View>
            )}

            <View style={tableStyles.tableRow}>
              <Text style={[textStyles.normalText, { flex: 1 }]}>Ongoing treatment</Text>
              <Text style={[textStyles.normalText, { flex: 1 }]}>
                {treatment.ongoing ? "Yes, treatment is ongoing" : "No ongoing treatment"}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default TreatmentSection;
