
/**
 * Converts numeric severity values to text representations
 */
export function getSeverityText(severity: string): string {
  switch(severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    default: return "Unknown";
  }
}

/**
 * Converts numeric time of day values to text representations
 */
export function getTimeOfDayText(time: string): string {
  switch(time) {
    case "1": return "Morning";
    case "2": return "Afternoon";
    case "3": return "Evening";
    case "4": return "Night";
    default: return "Unknown";
  }
}

/**
 * Converts "1"/"2" values to boolean
 * "1" = Yes/True, "2" = No/False
 */
export function getYesNo(value: string): boolean {
  return value === "1";
}

/**
 * Formats a checkbox list into a readable string
 */
export function formatCheckboxList(items: string[] | undefined): string {
  if (!items || items.length === 0) return "None";
  return items.join(", ");
}

// Helper function to format injury duration
export const formatDuration = (resolveDays: string | undefined) => {
  if (!resolveDays) return "Not specified";
  return `${resolveDays} days`;
};
