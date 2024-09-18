// utils/query-utils.ts

// Function to extract class name from a query
export function extractClassNameFromQuery(query: string): string | null {
    const classNames = ["Ethics", "Philosophy", "Underwater Basket Weaving"]; // Add your class names here
    for (let className of classNames) {
      if (query.toLowerCase().includes(className.toLowerCase())) {
        return className;
      }
    }
    return null;
  }
  
  // Function to extract days from a query
  export function extractDaysFromQuery(query: string): string | null {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    for (let day of daysOfWeek) {
      if (query.toLowerCase().includes(day.toLowerCase())) {
        return day;
      }
    }
    return null;
  }
  