const getDate = (date: string | Date, additionalDays = 0, isPrefix = true, isWeekDay = true) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() + additionalDays);

  const endDate = new Date();

  const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return dayDiff >= 2 || dayDiff <= 0
    ? `${isPrefix ? 'at' : ''} ${
        isWeekDay ? `${weekDays[startDate.getDay()]},` : ''
      } ${startDate.getDate()} ${months[startDate.getMonth()]}`
    : dayDiff >= 1
    ? `Yesterday`
    : `Today`;
};

export default getDate;
