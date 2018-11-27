import mergeWith from 'lodash.mergewith';

/**
 * function to convert the history object
 * @function {@param}
 */
export const convertHistory = (obj, offset = 0) => {
  const keys = Object.keys(obj)
    .sort((a, b) => Number(a.split(' ')[1]) - Number(b.split(' ')[1]))
    .slice(-16);
  const keyLength = keys.length;
  let offsetKeys = [];
  let padKeys = [];
  if (keyLength < 16) {
    offsetKeys = Array(offset)
      .fill()
      .map((value, key) => ({ name: `Week ${key + 1}` }));
    const noOfKeysToAdd = Math.max(16 - offset - keyLength, 0);
    padKeys = Array(noOfKeysToAdd)
      .fill()
      .map((value, key) => ({
        name: `Week ${keyLength + key + offset + 1}`
      }));
  }
  const realData = keys.map((key, index) => ({
    name: `Week ${index + offset + 1}`,
    'On Track': obj[key].onTrack,
    'Off Track': obj[key].offTrack,
    PIP: obj[key].onPip
  }));

  return [...offsetKeys, ...realData, ...padKeys];
};

const customizer = (objValue, srcValue, key) => {
  if (key === 'PIP' || key === 'On Track' || key === 'Off Track') {
    const objAddend = objValue || 0;
    const srcAddend = srcValue || 0;
    return objAddend + srcAddend;
  }
  return undefined;
};

/**
 * function to export merge history
 * @function {@param}
 */
export const mergeHistory = (d0a, d0b) => mergeWith({}, d0a, d0b, customizer);

/**
 * function to merge D0 status arrays
 * @function {@param}
 */
export const mergeD0StatusArrays = ([arr1, arr2]) => {
  const outputArray = [];
  for (let i = 0; i < arr1.length; i += 1) {
    outputArray[i] = mergeHistory(arr1[i], arr2[i]);
  }
  return outputArray;
};

/**
 * function to align D) status objects
 * @function {@param}
 */
export const alignD0StatusObjects = (firstObject, secondObject) => {
  const firstObjectLength = Object.keys(firstObject).length;
  const secondObjectLength = Object.keys(secondObject).length;
  if (firstObjectLength >= 16 && secondObjectLength >= 16) {
    return [firstObject, secondObject].map(elem => convertHistory(elem));
  }
  const firstIsLarger = firstObjectLength > secondObjectLength;
  const offset =
    Math.min(Math.max(firstObjectLength, secondObjectLength), 16) -
    Math.min(firstObjectLength, secondObjectLength);
  const result = firstIsLarger
    ? [convertHistory(firstObject), convertHistory(secondObject, offset)]
    : [convertHistory(firstObject, offset), convertHistory(secondObject)];
  return result;
};
