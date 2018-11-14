import mergeWith from 'lodash.mergewith';

export const convertHistory = obj => {
  const keys = Object.keys(obj)
    .sort((a, b) => Number(a.split(' ')[1]) - Number(b.split(' ')[1]))
    .slice(-12);
  return keys.map((key, index) => ({
    name: `Week ${index + 1}`,
    'On Track': obj[key].onTrack,
    'Off Track': obj[key].offTrack,
    PIP: obj[key].onPip
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
