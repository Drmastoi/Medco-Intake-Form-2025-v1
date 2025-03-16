
// Format the severity text for display
export const formatSeverity = (severity: string): string => {
  if (!severity) return "Not specified";
  
  switch (severity) {
    case "Mild":
    case "Moderate":
    case "Severe":
    case "Resolved":
      return severity;
    case "1":
      return "Mild";
    case "2":
      return "Moderate";
    case "3":
      return "Severe";
    case "4":
      return "Resolved";
    default:
      return severity;
  }
};

// Format injury severity for display (alias for backward compatibility)
export const formatInjurySeverity = formatSeverity;

// Format days to resolution
export const formatResolveDays = (days?: string): string => {
  if (!days || days === "Not Specified") return "Unknown";
  
  // Handle cases where days is just a number as string
  if (!isNaN(Number(days))) {
    const daysNum = Number(days);
    return daysNum === 1 ? "1 day" : `${daysNum} days`;
  }
  
  return days;
};

// Format the time of day text
export const formatTimeOfDay = (time?: string): string => {
  if (!time) return "Not specified";
  
  switch (time) {
    case "1":
      return "Morning";
    case "2":
      return "Afternoon";
    case "3":
      return "Evening";
    case "4":
      return "Night";
    default:
      return time;
  }
};

// Convert yes/no values
export const formatYesNo = (value?: string | boolean): string => {
  if (typeof value === 'boolean') {
    return value ? "Yes" : "No";
  }
  
  if (!value) return "No";
  
  if (value === "1" || value.toLowerCase() === "yes" || value.toLowerCase() === "true") {
    return "Yes";
  }
  
  return "No";
};
