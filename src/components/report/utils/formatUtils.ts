
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
 * Format a date string to a readable format (UK format)
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
 * Format a number of days into a human-readable duration
 */
export function formatDuration(days: string | number | undefined): string {
  if (!days) return "Not specified";
  
  const numDays = typeof days === 'string' ? parseInt(days, 10) : days;
  
  if (isNaN(numDays)) return "Not specified";
  
  if (numDays <= 0) return "Less than a day";
  if (numDays === 1) return "1 day";
  if (numDays < 7) return `${numDays} days`;
  
  const weeks = Math.floor(numDays / 7);
  const remainingDays = numDays % 7;
  
  if (weeks === 1 && remainingDays === 0) return "1 week";
  if (weeks === 1) return `1 week and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
  if (remainingDays === 0) return `${weeks} weeks`;
  
  return `${weeks} weeks and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
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

/**
 * Returns the classification of an injury based on its type
 */
export function getInjuryClassification(injuryType: string): string {
  if (injuryType.includes('Neck') || injuryType.includes('Back') || injuryType.includes('Shoulder')) {
    return "Whiplash";
  } else if (injuryType.includes('Headache')) {
    return "Whiplash Associated";
  } else if (injuryType.includes('Anxiety')) {
    return "Psychological";
  } else {
    return "Non-whiplash";
  }
}

/**
 * Returns a safe value with a fallback if the value is undefined or empty
 */
export function safeValue(value: any, fallback: string = "Not specified"): string {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  return String(value);
}

/**
 * Format severity to a readable text
 */
export function formatSeverity(severity: string | undefined): string {
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
  }
}
