
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
