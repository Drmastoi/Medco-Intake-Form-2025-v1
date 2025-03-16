/**
 * Utility functions for formatting data in PDF reports
 */

/**
 * Formats a list of checkbox values into a comma-separated string
 * with proper grammatical joining (using "and" for the last item)
 */
export const formatCheckboxList = (items: string[] | undefined): string => {
  if (!items || items.length === 0) {
    return "";
  }

  // Filter out empty strings
  const filteredItems = items.filter(item => item && item.trim() !== "");
  
  if (filteredItems.length === 0) {
    return "";
  }
  
  if (filteredItems.length === 1) {
    return filteredItems[0];
  }
  
  // Format as "item1, item2, and item3"
  const lastItem = filteredItems.pop();
  return `${filteredItems.join(", ")} and ${lastItem}`;
};

/**
 * Formats a date string into a readable format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString || dateString === "Not specified") {
    return "Not specified";
  }
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

/**
 * Formats severity levels for consistent display
 */
export const formatSeverity = (severity: string | undefined): string => {
  if (!severity) return "Not specified";
  
  // If already a text description, return as is
  if (typeof severity === 'string' && 
     (severity.toLowerCase() === 'mild' || 
      severity.toLowerCase() === 'moderate' || 
      severity.toLowerCase() === 'severe' ||
      severity.toLowerCase() === 'resolved' ||
      severity.toLowerCase() === 'not specified')) {
    return severity;
  }
  
  // Otherwise convert from numeric code
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
  }
};

/**
 * Formats resolve days to a human readable string
 */
export const formatResolveDays = (days: string | undefined): string => {
  if (!days || days === "Not specified") return "Not specified";
  
  // If already contains text, return as is
  if (typeof days === 'string' && !(/^\d+$/.test(days))) {
    return days;
  }
  
  const daysNum = parseInt(days, 10);
  if (isNaN(daysNum)) return "Not specified";
  
  if (daysNum === 0) return "Same day";
  if (daysNum === 1) return "1 day";
  if (daysNum < 7) return `${daysNum} days`;
  
  const weeks = Math.floor(daysNum / 7);
  const remainingDays = daysNum % 7;
  
  if (weeks === 1) {
    return remainingDays > 0 ? `1 week and ${remainingDays} days` : "1 week";
  } else {
    return remainingDays > 0 ? `${weeks} weeks and ${remainingDays} days` : `${weeks} weeks`;
  }
};
