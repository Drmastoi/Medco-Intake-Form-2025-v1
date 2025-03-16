
/**
 * Format a number of days into a human-readable duration
 */
export function formatDuration(days: string | number | undefined): string {
  // Handle undefined or empty string
  if (days === undefined || days === '' || days === null) {
    return "Not specified";
  }
  
  // Parse the number of days, handling string inputs
  let numDays: number;
  
  if (typeof days === 'string') {
    // Try to parse the string as a number
    try {
      numDays = parseInt(days.trim(), 10);
    } catch (error) {
      console.error("Error parsing days:", error);
      return "Not specified";
    }
  } else if (typeof days === 'number') {
    numDays = days;
  } else {
    // Handle unexpected input types
    return "Not specified";
  }
  
  // Handle invalid numbers
  if (isNaN(numDays) || !isFinite(numDays)) {
    return "Not specified";
  }
  
  // Format the duration
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
 * Format a severity level to a human-readable string
 */
export function formatSeverity(severity: string | undefined): string {
  if (!severity) return "Not specified";
  
  switch (severity.toLowerCase()) {
    case 'mild':
    case '1':
      return "Mild";
    case 'moderate':
    case '2':
      return "Moderate";
    case 'severe':
    case '3':
      return "Severe";
    case 'resolved':
    case '4':
      return "Resolved";
    default:
      return severity;
  }
}

/**
 * Safely get a value with a fallback
 */
export function safeValue(value: any, fallback: string = "Not specified"): string {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  return String(value);
}
