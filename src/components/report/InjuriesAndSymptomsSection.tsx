import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
});

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.heading}>Injuries/Symptoms and Present Position Reported by Claimant</Text>

    {/* Neck Pain */}
    {formData.neckPain === "1" && (
      <View>
        <Text style={styles.subheading}>Neck Pain</Text>
        <Text style={styles.text}>
          The claimant developed neck pain {
            formData.neckPainStart === "1" ? "on the same day" :
            formData.neckPainStart === "2" ? "the next day" :
            formData.neckPainStart === "3" ? "a few days later" : ""
          }. The initial severity was {
            formData.neckPainInitialSeverity === "1" ? "mild" :
            formData.neckPainInitialSeverity === "2" ? "moderate" :
            formData.neckPainInitialSeverity === "3" ? "severe" : "not specified"
          }. Currently, the pain is {
            formData.neckPainCurrentSeverity === "1" ? "mild" :
            formData.neckPainCurrentSeverity === "2" ? "moderate" :
            formData.neckPainCurrentSeverity === "3" ? "severe" :
            formData.neckPainCurrentSeverity === "4" ? "resolved" : "not specified"
          }.
          {formData.neckPainResolveDays && ` The pain resolved after ${formData.neckPainResolveDays} days.`}
        </Text>
      </View>
    )}

    {/* Shoulder Pain */}
    {formData.shoulderPain === "1" && (
      <View>
        <Text style={styles.subheading}>Shoulder Pain</Text>
        <Text style={styles.text}>
          The claimant experienced pain in the {
            formData.shoulderSide === "1" ? "left" :
            formData.shoulderSide === "2" ? "right" :
            formData.shoulderSide === "3" ? "both shoulders" : "shoulder"
          }. The initial severity was {
            formData.shoulderPainInitialSeverity === "1" ? "mild" :
            formData.shoulderPainInitialSeverity === "2" ? "moderate" :
            formData.shoulderPainInitialSeverity === "3" ? "severe" : "not specified"
          }. Currently, the pain is {
            formData.shoulderPainCurrentSeverity === "1" ? "mild" :
            formData.shoulderPainCurrentSeverity === "2" ? "moderate" :
            formData.shoulderPainCurrentSeverity === "3" ? "severe" :
            formData.shoulderPainCurrentSeverity === "4" ? "resolved" : "not specified"
          }.
          {formData.shoulderPainResolveDays && ` The pain resolved after ${formData.shoulderPainResolveDays} days.`}
        </Text>
      </View>
    )}

    {/* Back Pain */}
    {formData.backPain === "1" && (
      <View>
        <Text style={styles.subheading}>Back Pain</Text>
        <Text style={styles.text}>
          The claimant experienced pain in the {
            formData.backLocation === "1" ? "upper back" :
            formData.backLocation === "2" ? "middle back" :
            formData.backLocation === "3" ? "lower back" :
            formData.backLocation === "4" ? "entire back" : "back"
          }. The initial severity was {
            formData.backPainInitialSeverity === "1" ? "mild" :
            formData.backPainInitialSeverity === "2" ? "moderate" :
            formData.backPainInitialSeverity === "3" ? "severe" : "not specified"
          }. Currently, the pain is {
            formData.backPainCurrentSeverity === "1" ? "mild" :
            formData.backPainCurrentSeverity === "2" ? "moderate" :
            formData.backPainCurrentSeverity === "3" ? "severe" :
            formData.backPainCurrentSeverity === "4" ? "resolved" : "not specified"
          }.
          {formData.backPainResolveDays && ` The pain resolved after ${formData.backPainResolveDays} days.`}
        </Text>
      </View>
    )}

    {/* Bruising and Scarring */}
    {formData.hasBruising === "1" && (
      <View>
        <Text style={styles.subheading}>Bruising and Scarring</Text>
        <Text style={styles.text}>
          The claimant noticed bruising/scarring {
            formData.bruisingNoticed === "1" ? "on the same day" :
            formData.bruisingNoticed === "2" ? "the next day" :
            formData.bruisingNoticed === "3" ? "a few days later" : ""
          } at {formData.bruisingLocation || "unspecified location"}. 
          {formData.hasVisibleScar === "1" && " There is visible scarring present."}
        </Text>
      </View>
    )}
  </View>
);