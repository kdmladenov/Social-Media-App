const getTimeDuration = (start: string | Date, end: string | Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const hourDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const minuteDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  return dayDiff >= 365 * 2
    ? `${(dayDiff / 365).toFixed(0)} years ago`
    : dayDiff >= 365
    ? `1 year ago`
    : dayDiff >= 30
    ? `${(dayDiff / 30).toFixed(0)} month${Math.floor(dayDiff) > 30 ? 's' : ''} ago`
    : dayDiff >= 1
    ? `${dayDiff.toFixed(0)} day${Math.floor(dayDiff) > 1 ? 's' : ''} ago`
    : hourDiff >= 1
    ? `${hourDiff.toFixed(0)} hour${Math.floor(hourDiff) > 1 ? 's' : ''} ago`
    : minuteDiff >= 1
    ? `${minuteDiff.toFixed(0)} minute${Math.floor(minuteDiff) > 1 ? 's' : ''} ago`
    : 'just now';
};

export default getTimeDuration;
