
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
