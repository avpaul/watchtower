/**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} property Key of the object to sort.
 * @return {Integer} shows whether the String comes before, after or is equal to the compare String in sort order
 */
const arrayOfObjectsSorter = property => {
  let sortOrder = 1;
  let data = property;

  if (data[0] === '-') {
    sortOrder = -1;
    data = data.substr(1);
  }

  return (a, b) => {
    if (sortOrder === -1) {
      return b[data].localeCompare(a[data]);
    }
    return a[data].localeCompare(b[data]);
  };
};

export default arrayOfObjectsSorter;
