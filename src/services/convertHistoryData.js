import mergeWith from 'lodash.mergewith';

export const convertHistory = obj => {
  let keys = Object.keys(obj)
    .sort((a, b) => Number(a.split(' ')[1]) - Number(b.split(' ')[1]))
    .slice(-12);
  const newObj = { ...obj };
  if (keys.length < 12) {
    const noOfKeysToAdd = 12 - keys.length;
    const newArray = Array(noOfKeysToAdd)
      .fill()
      .map((value, key) => `addedKey${key + 1}`);

    newArray.forEach(elem => {
      newObj[elem] = {};
    });
    keys = [...newArray, ...keys];
  }
  return keys.map((key, index) => ({
    name: `Week ${index + 1}`,
    'On Track': newObj[key].onTrack || 0,
    'Off Track': newObj[key].offTrack || 0,
    PIP: newObj[key].onPip || 0
  }));
};

const customizer = (objValue, srcValue, key) => {
  if (key === 'onPip' || key === 'onTrack' || key === 'offTrack') {
    const objAddend = objValue || 0;
    const srcAddend = srcValue || 0;
    return objAddend + srcAddend;
  }
  return undefined;
};
export const mergeHistory = (d0a, d0b) => mergeWith({}, d0a, d0b, customizer);
