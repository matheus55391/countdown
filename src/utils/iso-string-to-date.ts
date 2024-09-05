export default function isoStringToDate(isoString: string): Date {
    const date = new Date(isoString);
  
    if (isNaN(date.getTime())) {
      throw new Error("Data inválida.");
    }
  
    return date;
  }