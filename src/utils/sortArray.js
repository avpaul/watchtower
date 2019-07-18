/**
 * Function to access nested objects.
 */
export const accessProperty = (data, keys) => {
  if (keys.length === 1) return data[keys[0]];

  const sortValue = keys.reduce((result, value, index) => {
    if (index === 1) {
      return data[result][value];
    }
    return result[value];
  });

  return sortValue;
};

/**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} property Key of the object to sort.
 * @return {Integer} shows whether the String comes before, after or is equal to the compare String in sort order
 */
const arrayOfObjectsSorter = property => {
  let sortOrder = 1;
  const properties = property.split('.');

  if (properties[0][0] === '-') {
    sortOrder = -1;
    properties[0] = properties[0].substr(1);
  }

  return (a, b) => {
    if (sortOrder === -1) {
      return accessProperty(b, properties).localeCompare(
        accessProperty(a, properties)
      );
    }
    return accessProperty(a, properties).localeCompare(
      accessProperty(b, properties)
    );
  };
};

export default arrayOfObjectsSorter;
