import { format, parseISO, isValid } from 'date-fns';


export const formatDate = (dateString?: string | Date | null): string | null => {
  if (!dateString) return null;
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return isValid(date) ? format(date, 'MMM dd, yyyy') : null;
  } catch {
    return null;
  }
};


export const formatDateTime = (dateString?: string | Date | null): string | null => {
  if (!dateString) return null;
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return isValid(date) ? format(date, 'MMM dd, yyyy h:mm a') : null;
  } catch {
    return null;
  }
};