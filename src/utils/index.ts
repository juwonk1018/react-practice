// General date utilities
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Add days to a date string
export function addDate(dateString: string, days: number): Date {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date;
}

// Calculate difference in days between two dates
export function diffDate(date1: Date, date2: Date): number {
  return Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
}

// General number formatting utilities
export function toLocaleString(num: number): string {
  return num.toLocaleString();
}
