export const formatDate = (date: Date): string => {
  const now: Date = new Date();
  const timeDiff: number = now.getTime() - date.getTime();
  const oneDayInMillis: number = 24 * 60 * 60 * 1000;

  if (timeDiff < oneDayInMillis) {
    const hours: string = date.getHours().toString().padStart(2, "0");
    const minutes: string = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  if (timeDiff < 2 * oneDayInMillis) {
    return "yesterday";
  }

  const day: string = date.getDate().toString();
  const month: string = (date.getMonth() + 1).toString();
  const year: string = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
};
