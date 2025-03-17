
/**
 * Formats a severity value to a readable string
 */
export function formatSeverity(severity: string | undefined): string {
  if (!severity) return "Not specified";
  
  // If severity is already a readable string, return it
  if (["Mild", "Moderate", "Severe", "Resolved", "Not specified"].includes(severity)) {
    return severity;
  }
  
  // Convert numeric severity to readable string
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
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
 * Safely returns a value or a default string if the value is undefined
 */
export function safeValue(value: string | undefined, defaultValue: string = "Not specified"): string {
  if (!value) return defaultValue;
  return value;
}
