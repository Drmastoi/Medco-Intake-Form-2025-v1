
// Helper function to format injury duration
export const formatDuration = (resolveDays: string | undefined) => {
  if (!resolveDays) return "Not specified";
  return `${resolveDays} days`;
};
