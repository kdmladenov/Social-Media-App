const filterQueryHandler = (filter: string | string[]) => {
  const queryMap: { [key: string]: string[] } = {};
  const filterLength = Array.isArray(filter) ? filter.length : 1;

  for (let i = 0; i < filterLength; i++) {
    const currQuery = Array.isArray(filter) ? filter[i] : filter;
    const currQueryKey = currQuery.split(' ')[0];
    if (!queryMap[currQueryKey]) queryMap[currQueryKey] = [];
    queryMap[currQueryKey].push(currQuery);
  }
  const resultString = Object.values(queryMap)
    .map((queryGroup) => (queryGroup.length > 1 ? `(${queryGroup.join(' OR ')})` : queryGroup[0]))
    .join(' AND ');

  return resultString;
};

export default filterQueryHandler;
