
/**
 * Utility functions for formatting text in the report components
 */

/**
 * Formats a list of items into a readable string
 */
export const formatCheckboxList = (items: string[] = [], otherText?: string) => {
  if (!items.length && !otherText) return '';
  
  const mainItems = items.filter(item => item !== 'other');
  let formattedText = '';
  
  if (mainItems.length) {
    if (mainItems.length === 1) {
      formattedText = mainItems[0];
    } else if (mainItems.length === 2) {
      formattedText = `${mainItems[0]} and ${mainItems[1]}`;
    } else {
      const lastItem = mainItems.pop();
      formattedText = `${mainItems.join(', ')}, and ${lastItem}`;
    }
  }
  
  if (otherText) {
    formattedText = formattedText ? `${formattedText}, and ${otherText}` : otherText;
  }
  
  return formattedText;
};
