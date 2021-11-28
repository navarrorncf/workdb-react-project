export const sortAlphabetically = (array, key, ascending = true) => {
  return ascending
    ? array.sort((a, b) => a[key].localeCompare(b[key]))
    : array.sort((a, b) => b[key].localeCompare(a[key]));
};

export const sortNumerically = (array, key, ascending = true) => {
  return ascending
    ? array.sort((a, b) => a[key] - b[key])
    : array.sort((a, b) => b[key] - a[key]);
};

const invertDateString = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return [year, month, day].join('/');
};

export const sortChronologically = (array, key, ascending = true) => {
  return ascending
    ? array.sort((a, b) =>
        invertDateString(a[key]).localeCompare(invertDateString(b[key]))
      )
    : array.sort((a, b) =>
        invertDateString(b[key]).localeCompare(invertDateString(a[key]))
      );
};
