const getTimeDuration = (start: string | Date, end: string | Date = new Date()) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const hourDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const minuteDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  return dayDiff >= 365
    ? `${Math.floor(dayDiff / 365)}y`
    : dayDiff >= 30
    ? `${Math.floor(dayDiff / 30)}mon`
    : dayDiff >= 7
    ? `${Math.floor(dayDiff/7)}w`
    : dayDiff >= 1
    ? `${Math.floor(dayDiff)}d`
    : hourDiff >= 1
    ? `${Math.floor(hourDiff)}h`
    : minuteDiff >= 1
    ? `${Math.floor(minuteDiff)}m`
    : 'now';
};

export default getTimeDuration;
