
import { format } from 'date-fns';

export const formatDate = (dateString: string) => {
  if (!dateString) return 'Not provided';
  
  try {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy'); // UK date format
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString || 'Not provided';
  }
};

export const formatDateTime = (dateString: string) => {
  if (!dateString) return 'Not provided';
  
  try {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm'); // UK date format with time
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return dateString || 'Not provided';
  }
};

export const calculateAge = (dateOfBirth: string) => {
  if (!dateOfBirth) return 'Not provided';
  
  try {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} Years`;
  } catch (error) {
    console.error('Error calculating age:', error);
    return 'Unknown';
  }
};

// New formatting functions to help with compact display
export const formatCompactDate = (dateString: string) => {
  if (!dateString) return 'Not provided';
  
  try {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yy'); // Even more compact UK date format
  } catch (error) {
    console.error('Error formatting compact date:', error);
    return dateString || 'Not provided';
  }
};
