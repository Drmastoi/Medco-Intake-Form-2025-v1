import { format } from 'date-fns';

/**
 * Returns a readable text for time of day
 */
export function getTimeOfDayText(time: string | undefined): string {
  switch (time) {
    case "1": return "Morning";
    case "2": return "Afternoon";
    case "3": return "Evening";
    case "4": return "Night";
    default: return "Not specified";
  }
}

/**
 * Returns a readable text for severity
 */
export function getSeverityText(severity: string | undefined): string {
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
  }
}

/**
 * Returns a readable text for yes/no
 */
export function getYesNo(value: boolean | undefined): string {
  return value ? "Yes" : "No";
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "Not specified";
  try {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Format a list of checkbox items with an optional "other" value 
 * in a grammatically correct way
 */
export const formatCheckboxList = (items: string[] | undefined): string => {
  if (!items || items.length === 0) return "";
  
  // Filter out any empty strings or undefined values
  const filteredItems = items.filter(Boolean);
  
  if (filteredItems.length === 0) return "";
  if (filteredItems.length === 1) return filteredItems[0];
  
  const lastItem = filteredItems.pop();
  return `${filteredItems.join(', ')} and ${lastItem}`;
};
